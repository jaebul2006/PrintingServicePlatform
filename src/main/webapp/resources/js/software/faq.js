jq(document).ready(function () {
	//jq(".mobile_main_menu_service").addClass("menu_active");
	//jq(".sub_service_menu_4").addClass("num3").addClass("ov");
	jq(".gnb-service").removeClass("active");
	jq(".gnb-software").addClass("active");
	jq(".sub_software_menu_4").addClass("active").addClass("ov");
	goSoftwareStyle();
	doCategoryRows();
});


/**
 * 메소드명: doCategoryRows
 * 작성자: 김영탁
 * 설 명: 리스트 조회 Process
 *
 * @param int page 선택된 페이지 번호
 * 
 * 최초작성일: 2017.10.10
 * 최종수정일: 2017.10.10
 * ---
 * Date              Auth        Desc
 */
function doCategoryRows() {
	var softwareFAQCategoryIdx = '';
	// url: 요청이 전송되는 URL (프로세스명은 뒤에 꼭 _prc 가 붙여져야 함)
	//       Ex) /폴더명/Controllers 폴더 안 php 파일명(컨트롤러명)/실행할 메소드명(프로세스)
	var length = 1 ;
	jq.ajax({
		url: "/software/faq/categoryFaq_prc",
		type: "get",
		dataType: "json",
		data : {
		},
		success: function (res, status, xhr) {
			// 프레임워크 에러코드가 0 (성공)인 경우
			if (res.returnCode == 0) {
				jq("#category_list").html(res.data.categoryHtml);
				if (res.data.category[0].length > 0) {
					softwareFAQCategoryIdx = res.data.category[0][0].SoftwareFAQCategoryIdx;
					length = res.data.category[0].length;
				}
			} 
			// 프레임워크 에러코드가 E이거나 I 인 경우
			else {
				// 알림메시지 표시
				alert(res.returnMsg);
			}
		},
		error: function (xhr, status, error) {
			alert(error);
		},
		complete: function (xhr, status) {
			// 카테고리 클릭 이벤트
			jq(".category").click(function() {
				jq(".category").parent().removeClass('active');
				jq(this).parent().addClass('active');
			});
			var percent = 100/length;
			jq(".category").parent().css('width',percent+'%');
			if (softwareFAQCategoryIdx != '') {
				categoryClick(softwareFAQCategoryIdx, '1');
			}
		}
	});
} // end of function doCategoryRows

/**
 * 메소드명: categoryClick
 * 작성자: 김영탁
 * 설 명: 리스트 조회 Process
 *
 * @param int page 선택된 페이지 번호
 * 
 * 최초작성일: 2017.10.10
 * 최종수정일: 2017.10.10
 * ---
 * Date              Auth        Desc
 */
function categoryClick(softwareFAQCategoryIdx, page) {

	// url: 요청이 전송되는 URL (프로세스명은 뒤에 꼭 _prc 가 붙여져야 함)
	//       Ex) /폴더명/Controllers 폴더 안 php 파일명(컨트롤러명)/실행할 메소드명(프로세스)
	jq.ajax({
		url: "/software/faq/faqList_prc",
		type: "get",
		dataType: "json",
		data : {
			softwareFAQCategoryIdx: softwareFAQCategoryIdx,
			page: page
		},
		success: function (res, status, xhr) {
			// 프레임워크 에러코드가 0 (성공)인 경우
			if (res.returnCode == 0) {
				jq("#faq_list").html(res.data.faqHtml);
				jq("#pagination_html").html(res.data.paginationHtml);
				
			} 
			// 프레임워크 에러코드가 E이거나 I 인 경우
			else {
				// 알림메시지 표시
				alert(res.returnMsg);
			}
		},
		error: function (xhr, status, error) {
			alert(error);
		},
		complete: function (xhr, status) {
			jq( '.panel-content' ).hide();

			// Preparing the DOM

			// -- Update the markup of accordion container 
			jq( '.accordion' ).attr({
				role: 'tablist',
				multiselectable: 'true'
			 });

			// -- Adding ID, aria-labelled-by, role and aria-labelledby attributes to panel content
			jq( '.panel-content' ).attr( 'id', function( IDcount ) { 
				return 'panel-' + IDcount; 
			});
			jq( '.panel-content' ).attr( 'aria-labelledby', function( IDcount ) { 
				return 'control-panel-' + IDcount; 
			});
			jq( '.panel-content' ).attr( 'aria-hidden' , 'true' );
			// ---- Only for accordion, add role tabpanel
			jq( '.accordion .panel-content' ).attr( 'role' , 'tabpanel' );

			// -- Wrapping panel title content with a <a href="">
			jq( '.panel-title' ).each(function(i){

				// ---- Need to identify the target, easy it's the immediate brother
				target = jq(this).next( '.panel-content' )[0].id;

				// ---- Creating the link with aria and link it to the panel content
				link = jq( '<a>', {
					'href': '#' + target,
					'aria-expanded': 'false',
					'aria-controls': target,
					'id' : 'control-' + target
				});

				// ---- Output the link
				jq(this).wrapInner(link);  

			});

			// Optional : include an icon. Better in JS because without JS it have non-sense.
			jq( '.panel-title a' ).append('<span class="icon">+</span>');

			// Now we can play with it
			jq( '.panel-title a' ).click(function() {

				if (jq(this).attr( 'aria-expanded' ) == 'false'){ //If aria expanded is false then it's not opened and we want it opened !

					// -- Only for accordion effect (2 options) : comment or uncomment the one you want

					// ---- Option 1 : close only opened panel in the same accordion
					//      search through the current Accordion container for opened panel and close it, remove class and change aria expanded value
					jq(this).parents( '.accordion' ).find( '[aria-expanded=true]' ).attr( 'aria-expanded' , false ).removeClass( 'active' ).parent().next( '.panel-content' ).slideUp(200).attr( 'aria-hidden' , 'true');

					// Option 2 : close all opened panels in all accordion container
					//jq('.accordion .panel-title > a').attr('aria-expanded', false).removeClass('active').parent().next('.panel-content').slideUp(200);

					// Finally we open the panel, set class active for styling purpos on a and aria-expanded to "true"
					jq(this).attr( 'aria-expanded' , true ).addClass( 'active' ).parent().next( '.panel-content' ).slideDown(200).attr( 'aria-hidden' , 'false');

				} else { // The current panel is opened and we want to close it

					jq(this).attr( 'aria-expanded' , false ).removeClass( 'active' ).parent().next( '.panel-content' ).slideUp(200).attr( 'aria-hidden' , 'true');;

				}
				// No Boing Boing
				return false;
			});

		}
	});
} // end of function categoryClick
//# sourceURL=software_faq.js