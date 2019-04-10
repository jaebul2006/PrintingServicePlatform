jq(document).ready(function () {
	jq(".gnb-software").addClass("active");
	jq(".sub_software_menu_2").addClass("active").addClass("ov");
	goSoftwareStyle();
	if (jq("#division").val() == 'afo') {
		jq("#h4_who").css('display','none');
		jq("#div_who").css('display','none');
		jq("#h4_etc").css('display','none');
		jq("#div_etc").css('display','none');
		jq("#content-slider").lightSlider({
			loop:true,
			keyPress:true
		});
		jq('#image-gallery_1').lightSlider({
			gallery:true,
			item:1,
			thumbItem:5,
			slideMargin: 0,
			gallery:true,
			speed:500,
			auto:true,
			loop:true,
			onSliderLoad: function() {
				jq('#image-gallery_1').removeClass('cS-hidden');
			}  
		});
	} else if (jq("#division").val() == 'who') {
		jq("#h4_afo").css('display','none');
		jq("#div_afo").css('display','none');
		jq("#h4_etc").css('display','none');
		jq("#div_etc").css('display','none');
		jq("#content-slider").lightSlider({
			loop:true,
			keyPress:true
		});
		jq('#image-gallery_2').lightSlider({
			gallery:true,
			item:1,
			thumbItem:5,
			slideMargin: 0,
			gallery:true,
			speed:500,
			auto:true,
			loop:true,
			onSliderLoad: function() {
				jq('#image-gallery_2').removeClass('cS-hidden');
			}  
		});
	} else if (jq("#division").val() == 'etc') {
		jq("#h4_afo").css('display','none');
		jq("#div_afo").css('display','none');
		jq("#h4_who").css('display','none');
		jq("#div_who").css('display','none');
		jq("#content-slider").lightSlider({
			loop:true,
			keyPress:true
		});
		jq('#image-gallery_3').lightSlider({
			gallery:true,
			item:1,
			thumbItem:5,
			slideMargin: 0,
			gallery:true,
			speed:500,
			auto:true,
			loop:true,
			onSliderLoad: function() {
				jq('#image-gallery_3').removeClass('cS-hidden');
			}  
		});
	}
});

//# sourceURL=intro.js