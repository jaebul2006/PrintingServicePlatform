/*  */

jq(document).ready(function() {
    js_fixed(); //js_fixed
    js_search(); //js_search
    input_auto_val_setting(); //input_auto_val_setting
    gnb(); //gnb
    floatingTop(); //floatingTop

    jq(window).resize(function() {
        js_fixed(); //js_fixed
    });

    //getServiceApplyCount(); 주석처리함 2019.02.13 장동호
});


//js_fixed
function js_fixed() {
    var fixed_obj = jq("#header-wrap");
    fixed_obj.logo = fixed_obj.find(".logo");
    fixed_obj.gnb = fixed_obj.find("#gnb");
    fixed_obj.nav = fixed_obj.find("#nav");
    fixed_obj.sc = fixed_obj.find(".totalsearch");

    jq(window).scroll(function() {
        if (fixed_obj.gnb.attr("class") == "web") {
            var winTop = jq(this).scrollTop();
            if (winTop >= 36) {
                fixed_obj.addClass("fixed");
                fixed_obj.logo.stop().animate({"top": 45 + "px", "width": 95 + "px", "height": 42 + "px"}, 100);
                //fixed_obj.gnb.stop().animate({"height":65+"px"},100);
                fixed_obj.sc.stop().animate({"top": 51 + "px"}, 100);
            } else {
                fixed_obj.removeClass("fixed");
                fixed_obj.logo.stop().animate({"top": 52 + "px", "width": 117 + "px", "height": 52 + "px"}, 100);
                //fixed_obj.gnb.stop().animate({"height":85+"px"},100);
                fixed_obj.sc.stop().animate({"top": 66 + "px"}, 100);
            }
        }
    });
}

//js_search
function js_search() {
    var search_obj = jq(".totalsearch");
    search_obj.box = search_obj.find("div");
    search_obj.box.input = search_obj.box.find(">input");
    search_obj.btn = search_obj.find(">.btn");
    var move = "";

    //default
    js_search_def(search_obj);
    jq(window).resize(function() {
        //js_search_def (search_obj);
    });

    //click
    search_obj.btn.click(function() {
        if (search_obj.box.is(":animated")) return false;
        if (!jq(this).hasClass("active")) {
            js_search_move(search_obj, "open");
        } else {
            js_search_move(search_obj, "close");
        }
        return false;
    });

    //mouseleave
    //search_obj.mouseleave(function(){
    jq("#header-wrap").mouseleave(function() {
        if (jq(".mob_btn").is(":hidden")) {
            if (search_obj.btn.hasClass("active")) {
                js_search_move(search_obj, "close");
            }
        }
    });
}

function js_search_move(search_obj, move) {
    if (move == "open") {
        search_obj.btn.addClass("active").find(">span").text("검색닫기");
        if (jq(".mob_btn").is(":hidden")) {
            //jq("#nav").fadeOut(100);
            search_obj.box.stop().animate({"width": 306 + "px"}, 500, "easeInOutExpo", function() {
                search_obj.box.input.fadeIn(300);
            });
        } else {
            search_obj.box.fadeIn(300);
        }
    } else if (move == "close") {
        search_obj.btn.removeClass("active").find(">span").text("검색열기");
        if (jq(".mob_btn").is(":hidden")) {
            search_obj.box.input.fadeOut(0);
            search_obj.box.stop().animate({"width": 33 + "px"}, 500, "easeInOutExpo", function() {
                //jq("#nav").fadeIn(100);
            });
        } else {
            search_obj.box.fadeOut(300);
        }
    }
}

function js_search_def(search_obj) {
    search_obj.btn.removeClass("active").find(">span").text("검색열기");
    if (!jq(".mob_btn").is(":hidden")) {
        search_obj.box.hide();
    } else {
        search_obj.box.show();
    }
}

//input_auto_val_setting
function input_auto_val_setting() {
    var inputs = jq(".input_val");
    for (var i = 0; i < inputs.size(); i++) {
        if (!inputs.eq(i).val()) {
            inputs.titles = inputs.eq(i).attr("title");
            inputs.eq(i).val(inputs.titles);
        }
    }
    inputs.siblings("input[type=image], input[type=submit], input[type=button]").click(function() {
        var obj = jq(this).siblings("input[type=text]");
        var v = obj.val();
        var t = obj.attr("title");

        if (v == t) {
            obj.val("");
        }
    });
    inputs.on("focus", function() {
        var t = jq(this).attr("title");
        var v = jq(this).val();

        if (t == v || v == "") {
            jq(this).val("");
        }
    });
    inputs.on("blur", function() {
        var t = jq(this).attr("title");
        var v = jq(this).val();

        if (v == "") {
            jq(this).val(t);
        }
    });
}

//gnb
function gnb() {
    var res = "";
    var param = jq("#gnb");
    param.nav = param.find(">.al_box> #nav");
    param.nav.ul = param.nav.find(">ul");
    param.nav.ul.li = param.nav.ul.find(">li");
    param.nav.ul.li.a = param.nav.ul.li.find(">a");
    param.nav.ul.li.ul = param.nav.ul.li.find(">ul");
    param.nav.ul.li.ul.li = param.nav.ul.li.ul.find(">li");
    param.nav.ul.li.ul.li.a = param.nav.ul.li.ul.li.find(">a");
    param.nav.ul.li.ul.li.ul = param.nav.ul.li.ul.li.find(">ul");
    param.nav.ul.li.ul.li.ul.li = param.nav.ul.li.ul.li.ul.find(">li");
    param.nav.ul.li.ul.li.ul.li.a = param.nav.ul.li.ul.li.ul.li.find(">a");
    param.blind = param.find(">#blind");
    param.times = "";
    param.blind.hei = "227";
    param.blind_mob = param.siblings("#blind_mob");

    //default
    param.nav.ul.li.a.each(function(e) {
        jq(this).addClass("num" + (e + 1));
    });
    param.nav.ul.li.ul.css({"height": 0});
    param.nav.ul.li.ul.find(">li:first-child").css({"padding-top": 20 + "px"});
    if (!jq(".mob_btn").is(":hidden")) res = "mob";
    else res = "web";
    param.attr("class", res);
    def(param);
    jq(window).resize(function() {
        if (!jq(".mob_btn").is(":hidden")) res2 = "mob";
        else res2 = "web";
        param.attr("class", res2);
        if (res != res2) {
            def(param);
            res = res2;
        }
    });

    //web
    param.nav.ul.li.a.mouseover(function() {
        clearTimeout(param.times);
        if (param.attr("class") == "web") {
            param.nav.ul.li.a.removeClass("ov").siblings("ul").removeClass("ov");
            jq(this).addClass("ov").siblings("ul").addClass("ov");
            if (jq(this).siblings("ul").size() != 0) {
                param.blind.show().stop().animate({"height": param.blind.hei + "px"}, 500, "easeOutCubic");
                param.nav.ul.li.ul.show().stop().animate({"height": param.blind.hei + "px"}, 500, "easeOutCubic");
            }
        }
    });

    param.nav.ul.li.a.mouseout(function() {
        if (param.attr("class") == "web") {
            param.times = setTimeout(function() {
                def(param);
            }, 1000);
        }
    });
    param.nav.ul.li.ul.mouseenter(function() {
        if (param.attr("class") == "web") {
            clearTimeout(param.times);
        }
    });

    param.nav.ul.mouseleave(function() {
        if (param.attr("class") == "web") {
            def(param);
        }
    });
    param.nav.ul.li.ul.li.a.mouseover(function() {
        if (param.attr("class") == "web") {
            param.nav.ul.li.a.removeClass("ov").siblings("ul").removeClass("ov");
            jq(this).parent().parent().siblings("a").addClass("ov");
            jq(this).parent().parent().addClass("ov");
        }
    });
    param.nav.ul.li.a.focus(function() {
        if (param.attr("class") == "web") {
            jq(this).mouseover();
        }
    });
    param.nav.ul.li.eq(4).find(">ul>li").last().find(">a").blur(function() {
        if (param.attr("class") == "web") {
            param.nav.ul.li.a.mouseout();
        }
    });

    //mobile
    function mob_close() {
        jq(".mob_btn").removeClass("ov");
        jq("#wrap>*").animate({"left": 0}, 300, "easeOutCubic");
        param.stop().animate({"left": -220 + "px"}, 300, "easeOutCubic", function() {
            jq(this).hide().css({"height": "auto"});
        });
        param.blind_mob.stop().animate({"left": 0, "opacity": 0}, 300, "easeOutCubic", function() {
            jq(this).hide();
        });
    }

    jq(".mob_btn").click(function() {
        if (param.blind.is(":animated")) return false;
        if (!jq(".mob_btn").hasClass("ov")) {
            jq(this).addClass("ov");
            jq("#wrap > *").stop().animate({"left": 220 + "px"}, 300, "easeOutCubic");
            param.show().css({"height": jq(document).height() + "px"});
            param.blind_mob.show().stop().animate({"left": 220, "opacity": 0.6}, 300, "easeOutCubic");
        } else {
            mob_close();
        }
        return false;
    });
    param.blind_mob.click(function() {
        mob_close();
        return false;
    });

    param.nav.ul.li.a.click(function() {
        if (param.attr("class") == "mob") {
            param.nav.ul.li.ul.css({"height": "auto"});
            param.nav.ul.li.a.not(this).removeClass("ov").next().slideUp();
            jq(this).toggleClass("ov").next().slideToggle();
            return false;
        } else if (param.attr("class") == "web") {
            return true;
        }
    });
    param.nav.ul.li.ul.li.a.click(function() {
        if (param.attr("class") == "mob") {
            if (jq(this).next().size() != 0) {
                param.nav.ul.li.ul.li.a.not(this).removeClass("ov").next().slideUp();
                jq(this).toggleClass("ov").next().slideToggle();
                return false;
            }
        } else if (param.attr("class") == "web") {
            return true;
        }
    });
    param.nav.ul.li.ul.li.ul.li.a.click(function() {
        if (param.attr("class") == "mob") {
            if (jq(this).next().size() != 0) {
                param.nav.ul.li.ul.li.ul.li.a.not(this).removeClass("ov").next().slideUp();
                jq(this).toggleClass("ov").next().slideToggle();
                return false;
            }
        } else if (param.attr("class") == "web") {
            return true;
        }
    });

}

function def(param) {
    if (param.attr("class") == "web") {
        param.nav.ul.li.a.removeClass("ov").siblings("ul").removeClass("ov");
        param.blind.css({"opacity": 0.9}).stop().animate({"height": 0}, 500, "easeOutCubic", function() {
            jq(this).hide();
        });
        param.nav.ul.li.ul.stop().animate({"height": 0}, 500, "easeOutCubic", function() {
            jq(this).hide();
        });
    } else if (param.attr("class") == "mob") {
        jq(".mob_btn").removeClass("ov");
        jq("#wrap > *").css({"left": 0});
        param.hide().css({"height": "auto"});
        param.blind_mob.hide().css({"opacity": 0, "left": 0});
        param.nav.ul.li.a.removeClass("ov").next().slideUp();
        param.nav.ul.li.ul.removeAttr("style");
        param.nav.ul.li.ul.li.a.removeClass("ov").next().slideUp();
        param.nav.ul.li.ul.li.ul.li.a.removeClass("ov").next().slideUp();
    }
}

//floatingTop
function floatingTop() {
    jq(window).scroll(function() {
        var winTop = jq(this).scrollTop();
        var headerTop = jq("#header-wrap").height();

        if (winTop > headerTop) {
            jq(".floating_top").fadeIn(300, "easeOutCubic");
        } else if (winTop <= headerTop) {
            jq(".floating_top").fadeOut(300, "easeOutCubic");
        }
    });
    jq(".floating_top a").click(function() {
        jq("body,html").stop().animate({"scrollTop": "0"}, 600, "easeOutCubic");
        return false;
    });
}

//pop-layer
function layer_open(el) {

    var temp = jq('#' + el);		//레이어의 id를 temp변수에 저장
    var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수

    if (bg) {
        jq('.layer').fadeIn();
    } else {
        temp.fadeIn();	//bg 클래스가 없으면 일반레이어로 실행한다.
    }

    // 화면의 중앙에 레이어를 띄운다.
    if (temp.outerHeight() < jq(document).height()) temp.css('margin-top', '-' + temp.outerHeight() / 2 + 'px');
    else temp.css('top', '0px');
    if (temp.outerWidth() < jq(document).width()) temp.css('margin-left', '-' + temp.outerWidth() / 2 + 'px');
    else temp.css('left', '0px');

    temp.find('a.cbtn').click(function(e) {
        if (bg) {
            jq('.layer').fadeOut();
        } else {
            temp.fadeOut();		//'닫기'버튼을 클릭하면 레이어가 사라진다.
        }
        e.preventDefault();
    });

    jq('.layer .bg').click(function(e) {
        jq('.layer').fadeOut();
        e.preventDefault();
    });

}

// quick menu

jq(document).ready(function() {
    /* quick menu */
    //jq("#quickMenu").animate({"top": jq(document).scrollTop() + 225 + "px"}, 500); // 빼도 된다.
    jq(window).scroll(function() {
        jq("#quickMenu").stop();
        jq("#quickMenu").animate({"top": jq(document).scrollTop() + 225 + "px"}, 10);
    });
});

//top scrollup
jq(document).ready(function() {

    jq(window).scroll(function() {
        if (jq(this).scrollTop() > 100) {
            jq('.scrollup').fadeIn();
        } else {
            jq('.scrollup').fadeOut();
        }
    });

    jq('.scrollup').click(function() {
        jq("html, body").animate({scrollTop: 0}, 600);
        return false;
    });

});


//faq
jq(document).ready(function() {
    // Hiding the panel content. If JS is inactive, content will be displayed
    jq('.panel-content').hide();

    // Preparing the DOM

    // -- Update the markup of accordion container
    jq('.accordion').attr({
        role: 'tablist',
        multiselectable: 'true'
    });

    // -- Adding ID, aria-labelled-by, role and aria-labelledby attributes to panel content
    jq('.panel-content').attr('id', function(IDcount) {
        return 'panel-' + IDcount;
    });
    jq('.panel-content').attr('aria-labelledby', function(IDcount) {
        return 'control-panel-' + IDcount;
    });
    jq('.panel-content').attr('aria-hidden', 'true');
    // ---- Only for accordion, add role tabpanel
    jq('.accordion .panel-content').attr('role', 'tabpanel');

    // -- Wrapping panel title content with a <a href="">
    jq('.panel-title').each(function(i) {

        // ---- Need to identify the target, easy it's the immediate brother
        jqtarget = jq(this).next('.panel-content')[0].id;

        // ---- Creating the link with aria and link it to the panel content
        jqlink = jq('<a>', {
            'href': '#' + jqtarget,
            'aria-expanded': 'false',
            'aria-controls': jqtarget,
            'id': 'control-' + jqtarget
        });

        // ---- Output the link
        jq(this).wrapInner(jqlink);

    });

    // Optional : include an icon. Better in JS because without JS it have non-sense.
    jq('.panel-title a').append('<span class="icon">+</span>');

    // Now we can play with it
    jq('.panel-title a').click(function() {

        if (jq(this).attr('aria-expanded') == 'false') { //If aria expanded is false then it's not opened and we want it opened !

            // -- Only for accordion effect (2 options) : comment or uncomment the one you want

            // ---- Option 1 : close only opened panel in the same accordion
            //      search through the current Accordion container for opened panel and close it, remove class and change aria expanded value
            jq(this).parents('.accordion').find('[aria-expanded=true]').attr('aria-expanded', false).removeClass('active').parent().next('.panel-content').slideUp(200).attr('aria-hidden', 'true');

            // Option 2 : close all opened panels in all accordion container
            //jq('.accordion .panel-title > a').attr('aria-expanded', false).removeClass('active').parent().next('.panel-content').slideUp(200);

            // Finally we open the panel, set class active for styling purpos on a and aria-expanded to "true"
            jq(this).attr('aria-expanded', true).addClass('active').parent().next('.panel-content').slideDown(200).attr('aria-hidden', 'false');

        } else { // The current panel is opened and we want to close it

            jq(this).attr('aria-expanded', false).removeClass('active').parent().next('.panel-content').slideUp(200).attr('aria-hidden', 'true');
            ;

        }
        // No Boing Boing
        return false;
    });

});

function getServiceApplyCount() {
	/*
	*/
    jq.ajax({
        url: '/common/getServiceApplyCount_prc',
        type: 'get',
        dataType: 'json',
        success: function(res, status, xhr) {
            if (res) {
                if (res.returnCode == 0) {
                    var html = '';
                    if (res.data) {
                        var d = res.data;
                        if (jq("#common_login_type").val() == 'sp') html = " <span onclick=\"location.href='/service/receipt/';\" class='label-num' style='cursor:pointer;margin-left:5px;margin-bottom:3px;' >" + d.count + "</span>";
                        jq(".login_user_text").append(html);
                    }
                }
            }
        }
    });
}

//service로 가는 링크
function goService() {
    location.href = '/service/service';
    goServiceStyle();
}

//service 스타일
function goServiceStyle() {
    jq('#service_div').css('display', 'block');
    jq('#software_div').css('display', 'none');
    jq('#service_quick_div').css('display', 'block');
    jq('#software_quick_div').css('display', 'none');
    jq('#service_quick_ul').css('display', 'block');
    jq('#software_quick_ul').css('display', 'none');
    jq('.gnb-software.active').removeClass('active');
    jq('.gnb-service').addClass('active');
}

//software로 가는 링크
function goSoftware() {
    location.href = '/software/introduction';
    goSoftwareStyle();
}

//software 스타일
function goSoftwareStyle() {
    jq('#software_div').css('display', 'block');
    jq('#service_div').css('display', 'none');
    jq('#software_quick_div').css('display', 'block');
    jq('#service_quick_div').css('display', 'none');
    jq('#software_quick_ul').css('display', 'block');
    jq('#service_quick_ul').css('display', 'none');
    jq('.gnb-service.active').removeClass('active');
    //jq('#header-wrap').addClass('gnb-software');
    jq('.gnb-software').addClass('active');
}

// urlencode 처리
function urlencode(u) {
	str = (u+'').toString();
	return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}

// urldecode 처리
function urldecode(u) {
	return decodeURIComponent(u).replace(/\+/g, ' ');
}
/**
 * 메소드명: getPost
 * 작성자: 최영은
 * 설 명: 우편번호 검색 창 오픈
 *
 * 최초작성일: 2018.01.08
 * 최종수정일: 2018.01.08
 * ---
 * Date              Auth        Desc
 */
function getPost() {
	var pop = window.open("/juso_popup.html", "pop_basic", "width=450,height=550,scrollbars=yes,resizable=yes");
} // end of function getPost

/**
 * 메소드명: goSTLViewer
 * 작성자: 최영은
 * 설 명: STL Viewer 창 오픈
 *
 * 최초작성일: 2018.01.17
 * 최종수정일: 2018.01.17
 * ---
 * Date              Auth        Desc
 */
function goSTLViewer() {
	// 새창으로 페이지 연결만...
	window.open("about:blank").location.href = "https://stephaneginier.com/sculptgl/";
} // end of function goSTLViewer


/**
 * 메소드명: showImgViewer
 * 작성자: 최영은
 * 설 명:  이미지 Viewer modal 오픈
 *
 * 최초작성일: 2018.01.17
 * 최종수정일: 2018.01.17
 * ---
 * Date              Auth        Desc
 */
function showImgViewer(src, existImg) {
	if(existImg == 'Y'){
		jq("#common_ing_view").attr('src', src);
		jq("#mdlImgView").modal('show');
	}
} // end of function showImgViewer



