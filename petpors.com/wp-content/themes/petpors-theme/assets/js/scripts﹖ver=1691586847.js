(function( $ ) {
    $( 'buttonnnnnn' ).click( function() {
        $( '#message' ).hide();
    })
})( jQuery );

function open_petpors_popup(popup_id) {
    (function( $ ) {
        $( '#petpors-popup--id-' + popup_id ).addClass('petpors-popup--active');
    })( jQuery );
}

(function( $ ) {
    $(".petpors-popup__close").click(function(){
        $(this).parents('.petpors-popup').removeClass('petpors-popup--active');
    });
    $(".petpors-popup__back").click(function(){
        $(this).parents('.petpors-popup').removeClass('petpors-popup--active');
    });
})( jQuery );

function openSearch() {
    document.getElementById("search-box-overlay").classList.toggle("active");
    var panel = document.getElementById("search-box-overlay");
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
    }
}

function closeSearch() {
    document.getElementById("search-box-overlay").style.display = "none";
}

function openNavResponsive() {
    document.getElementById("responsive-menu-outer-holder").classList.add("active");

    document.getElementById("responsive-menu-overlay").style.opacity = "1";
    document.getElementById("responsive-menu-overlay").style.visibility = "visible";
    document.getElementById("responsive-menu-overlay").style.display = "block";
}

function closeNavResponsive() {
    document.getElementById("responsive-menu-outer-holder").classList.remove("active");

    document.getElementById("responsive-menu-overlay").style.opacity = "0";
    document.getElementById("responsive-menu-overlay").style.visibility = "hidden";
    document.getElementById("responsive-menu-overlay").style.display = "none";
}

// course session accordion
var acc = document.getElementsByClassName("abar-accordion");
var i;
for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        var panel = this.nextElementSibling;
        if (panel) {
            this.classList.toggle("active");

            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                panel.classList.toggle("active");
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
                panel.classList.toggle("active");
            }
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const players = Plyr.setup('video', {captions: {active: true}});
    window.players = players;

    const audio_players = Plyr.setup('audio', {});
    window.audio_players = audio_players;
});


function AbarOpenTab(evt, tabId) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabId).style.display = "block";
    evt.currentTarget.className += " active";
}

// responsive instagram iframe
(function( $ ) {
    jQuery.fn.responsiveInstagram = function (options) {
        var $i = $(this)
            , width
            , windowWidth = $(window).width()
            , newHeight
            , defaults
        ;

        defaults = {
            width: 610
            , extraHeight: 260
            , breakpoint: 620
        };

        options = $.extend(defaults,options);

        if ( windowWidth <= options.breakpoint ) {
            $i.css('width', '100%');
        }
        else {
            $i.css('width', options.width.toString(10) + 'px');
        }

        width = $i.width();

        newHeight = Math.round(width + options.extraHeight);
        $i.css('height', newHeight.toString(10) + 'px');

        return this;
    };


})( jQuery );


function responsiveInstagramAll() {
    (function( $ ) {
        $('iframe[src*="instagram.com"]').responsiveInstagram();
    })( jQuery );
}


// lwptoc scripts = content Table
!function(){var o,l,n,e,g,m=function(t,e){var i,n={};for(i in t)n[i]=t[i];for(i in e)n[i]=e[i];return n},t=function(t){return t},c=(o={duration:300,action:"close",startTime:null,startHeight:null,endHeight:null,easing:t},l=function(e,i){cancelAnimationFrame(e.getAttribute("data-lwptoc-animation-request-id")),e.setAttribute("data-lwptoc-animation-request-id",window.requestAnimationFrame(function(t){n(e,i,t)}))},n=function(t,e,i){e.startTime||(e.startTime=i);var n,o=i-e.startTime;o<e.duration?(t.style.height=((e.endHeight-e.startingHeight)*e.easing(o/e.duration)+e.startingHeight).toFixed(2)+"px",l(t,e)):("close"===e.action&&(t.style.display="none"),"open"===e.action&&(t.style.display="block"),(n=t).style.height=null,n.style.overflow=null)},function(t,e){if(window.requestAnimationFrame){var i=m(o,{});i.action=e,t.style.height?i.startingHeight=parseFloat(t.style.height):i.startingHeight="close"===e?t.scrollHeight:0,(n=t).style.display="block",n.style.overflow="hidden",i.endHeight="close"===e?0:(t.style.height="0px",t.scrollHeight),l(t,i)}else t.style.display="close"===e?"none":"block";var n}),a=function(t){for(var e,i=document.querySelectorAll('[id="'+t+'"]'),n=0;n<i.length;n++)if((e=i[n]).offsetWidth||e.offsetHeight||e.getClientRects().length)return i[n];return null},i=(e={offset:0,duration:500,easing:t,onComplete:function(t,e){}},g=function(t,e){var i=t.getBoundingClientRect().top+window.pageYOffset-e;return i<0?0:i},function(o,t){var l,a=m(e,t);if(window.requestAnimationFrame&&"smooth"!==window.getComputedStyle(document.getElementsByTagName("HTML")[0]).scrollBehavior){var r,s,c=window.pageYOffset,d=null,u=function(t){l=g(o,a.offset),r=l-c;var e=window.pageYOffset;if(!s||!(0<r&&e<s||r<0&&s<e)){s=e,d||(d=t-1);var i=t-d,n=((l-c)*a.easing(i/a.duration)+c).toFixed();window.scroll(0,n),i<a.duration?window.requestAnimationFrame(u):(window.scroll(0,l),a.onComplete(0,l))}};window.requestAnimationFrame(u)}else l=g(o,a.offset),window.scroll(0,l),a.onComplete(0,l)}),u={scrollTo:function(t,e){i(t,e)},registerScrollTrigger:function(t,i){for(var e=0;e<t.length;e++)t[e].addEventListener("click",function(t){t.preventDefault();var e=this.getAttribute("href"),c=e.substring(1),d=a(c);d&&(e!==document.location.hash&&(i.onComplete=function(t,e){var i,n,o,l,a,r,s;d.setAttribute("id",""),i=c,n=t,o=e,(s=document.createElement("a")).setAttribute("id",i),s.setAttribute("style","position:absolute;visibility:hidden;left:"+n+"px;top:"+o+"px;"),l=document.body,a=s,l.prepend?l.prepend(a):l.insertBefore(a,l.firstChild),document.location.hash=i,(r=s).remove?r.remove():r.parentNode.removeChild(r),d.setAttribute("id",c)}),u.scrollTo(d,i))})},init:function(t){if("1"!==t.getAttribute("data-lwptoc-initialized")){t.setAttribute("data-lwptoc-initialized","1");var a,r=t.getElementsByClassName("lwptoc_toggle_label")[0],s=t.getElementsByClassName("lwptoc_items")[0];if(r)r.addEventListener("click",function(t){var e,i,n,o,l;t.preventDefault(),a=r.getAttribute("data-label"),r.setAttribute("data-label",r.innerHTML),r.innerHTML=a,l="lwptoc_items-visible",-1<(" "+s.className+" ").indexOf(" "+l+" ")?(o="lwptoc_items-visible",(n=s).className=(" "+n.className+" ").replace(" "+o+" ","").trim(),c(s,"close")):(i="lwptoc_items-visible",(e=s).className=e.className.trim()+" "+i,c(s,"open"))});"1"===t.getAttribute("data-smooth-scroll")&&u.registerScrollTrigger(s.getElementsByTagName("A"),{offset:t.getAttribute("data-smooth-scroll-offset")})}},globalInit:function(){for(var t=document.getElementsByClassName("lwptoc"),e=0;e<t.length;e++)u.init(t[e])}};window.lwptoc=u,"loading"===document.readyState?document.addEventListener("DOMContentLoaded",u.globalInit):u.globalInit()}();


// kk_star_ratings scripts = star ratings
jQuery(document).ready(function(s){function a(t,n){n=n||{isBusy:!1};function r(e){var i,c,o,u=s(this);i={id:t.data("id"),slug:t.data("slug"),score:u.data("star"),best:s("[data-star]",t).length},c=function(e,i,c){var o=s(e);o.addClass(t.attr("class")),t.replaceWith(o),s("[data-star]",t).each(function(){s(this).off("click",r)}),t.remove(),a(o,n)},o=function(s,a,t){s.responseJSON&&s.responseJSON.error&&console.error(s.responseJSON.error)},n.isBusy||t.hasClass("kksr-disabled")||(n.isBusy=!0,s.ajax({type:"POST",url:kk_star_ratings.endpoint,data:Object.assign({nonce:kk_star_ratings.nonce,action:kk_star_ratings.action},i),error:o,success:c,complete:function(){n.isBusy=!1}}))}s("[data-star]",t).each(function(){s(this).on("click",r)})}s(".kk-star-ratings").each(function(){a(s(this))})});

