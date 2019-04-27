(function($) {
  "use strict"; // Start of use strict

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

  //Download button based on OS
    var windowsDownloadLink = "https://www.dropbox.com/s/03nata93050ce8i/Dokey-setup-0.5.1.exe?dl=1";
    var macOSDownloadLink = "https://www.dropbox.com/s/sy84tnp6h6hcijz/Dokey-0.5.1.dmg?dl=1";
    var OSName="Unknown OS";
    if (navigator.appVersion.indexOf("Win")!==-1) OSName="Windows";
    if (navigator.appVersion.indexOf("Mac")!==-1) OSName="MacOS";
    if (navigator.appVersion.indexOf("X11")!==-1) OSName="UNIX";
    if (navigator.appVersion.indexOf("Linux")!==-1) OSName="Linux";

    var btnPrimary = $('#js-dynamic-btn').find('a');
    var btnSecondary = $('#js-dynamic-btn').find('p').find('a');

    if (OSName === "Windows"){
        btnPrimary.attr("href", windowsDownloadLink);
        btnPrimary.html("Download for Windows");

        btnSecondary.attr("href", macOSDownloadLink);
        btnSecondary.html("MacOS");
    }else{
        btnPrimary.attr("href", macOSDownloadLink);
        btnPrimary.html("Download for MacOS");

        btnSecondary.attr("href", windowsDownloadLink);
        btnSecondary.html("Windows");
    }


    // YuoTube

    $(".cinema").click(function () {
        $(this).hide();
        pauseVideo();
    });

    $(".cinema-close").click(function () {
        $(".cinema").hide();
        pauseVideo();
    });


    $(".btn-video").click(function () {
        $(".cinema").show();
        playVideo();
    });

    function pauseVideo(){
        $('.youtube-video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
    }

    function playVideo(){
        $('.youtube-video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
    }

})(jQuery); // End of use strict
