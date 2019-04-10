jq(document).ready(function() {
	jq('.owl-carousel').owlCarousel({
		items:1,
		autoplay:true,
		loop:true
	});
	goServiceStyle();
	//doFaqRows();
});


function doFaqRows() {
	
	jq.ajax({
		url: "/main/faqList_prc",
		type: "get",
		dataType: "json",
		data : {
		},
		success: function (res, status, xhr) {
			
			if (res.returnCode == 0) {
				jq("#faq_html").html(res.data.faqHtml);
				jq("#count").html(res.data.count);
			}
			
			else {
				alert("success msg1: " + res.returnMsg);
			}
		},
		error: function (xhr, status, error) {
			alert("error msg1: " + error);
		},
		complete: function (xhr, status) {
			doQnaRows();
		}
	});
} 

function doQnaRows() {
	
	jq.ajax({
		url: "/main/qnaList_prc",
		type: "get",
		dataType: "json",
		data : {
		},
		success: function (res, status, xhr) {
			
			if (res.returnCode == 0) {
				jq("#qna_html").html(res.data.qnaHtml);
				jq("#count").html(res.data.count);
			}
			else {
				alert("success msg2: " + res.returnMsg);
			}
		},
		error: function (xhr, status, error) {
			alert("error msg2: " + error);
		},
		complete: function (xhr, status) {
		}
	});
} 


function doQnaDetailRows(serviceQnAIdx) {
	location.href = '/service/qna/qnaDetail?serviceQnAIdx='+serviceQnAIdx+'&page=1';
}

function doFaqListRows(serviceFAQCategoryIdx) {
	location.href = '/service/faq/serviceFaq?serviceFAQCategoryIdx='+serviceFAQCategoryIdx+'&page=1';
}
