(function($) {
    "use strict"; // Start of use strict

    // HIW Artist-Business switch
    $("#btn-artist").click(function(){
        $("#hiw-business").addClass("d-none");
        $("#hiw-artist").removeClass("d-none");
    });

    $("#btn-business").click(function(){
        $("#hiw-business").removeClass("d-none");
        $("#hiw-artist").addClass("d-none");
    });

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: (target.offset().top - 48)
            }, 1000, "easeInOutExpo");
            return false;
          }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
    target: '#mainNav',
    offset: 54
    });

    // Collapse Navbar
    var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
    };

    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
})(jQuery); // End of use strict

// Collection of the painting metadata, collected at document ready
var paintings = [];

$(document).ready(function () {
    // Load paintings data
    var imagesElements = $(".gallery-img");
    for (var i = 0; i < imagesElements.length; i++) {
        var element = imagesElements[i];
        var lowres = $(element).attr("src");
        var highres = $(element).attr("data-highres");
        var w = $(element).attr("data-width");
        var h = $(element).attr("data-height");
        var title = $(element).attr("alt");
        paintings.push({
            src: highres,
            msrc: lowres,
            w: w,
            h: h,
            title: title,
        });
    }
});

function openPainting(e) {
    var targetSrc = $(e).attr("src");

    // Find the correct index
    var index = 0;
    for (var i = 0; i<paintings.length; i++) {
        if (paintings[i].msrc === targetSrc) {
            index = i;
            break;
        }
    }

    var pswpElement = document.querySelectorAll('.pswp')[0];

    // define options (if needed)
    var options = {
        // optionName: 'option value'
        // for example:
        index: index, // start at first slide
        getThumbBoundsFn: function(index) {

            // find thumbnail element
            var thumbnail = $(".gallery-img")[index];

            // get window scroll Y
            var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
            // optionally get horizontal scroll

            // get position of element relative to viewport
            var rect = thumbnail.getBoundingClientRect();

            // w = width
            return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};


            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
        }
    };

    // Initializes and opens PhotoSwipe
    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, paintings, options);
    gallery.init();
}