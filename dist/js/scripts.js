(function ($) {
  "use strict";

  /* Preloader */
  $(window).on("load", function () {
    var preloaderFadeOutTime = 500;
    function hidePreloader() {
      var preloader = $(".spinner-wrapper");
      setTimeout(function () {
        preloader.fadeOut(preloaderFadeOutTime);
      }, 500);
    }
    hidePreloader();
  });

  /* Navbar Scripts */
  // jQuery to collapse the navbar on scroll
  $(window).on("scroll load", function () {
    if ($(".navbar").offset().top > 20) {
      $(".fixed-top").addClass("top-nav-collapse");
    } else {
      $(".fixed-top").removeClass("top-nav-collapse");
    }
  });

  // jQuery for page scrolling feature - requires jQuery Easing plugin
  $(function () {
    $(document).on("click", "a.page-scroll", function (event) {
      var $anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr("href")).offset().top,
          },
          600,
          "easeInOutExpo"
        );
      event.preventDefault();
    });
  });

  // closes the responsive menu on menu item click
  $(".navbar-nav li a").on("click", function (event) {
    if (!$(this).parent().hasClass("dropdown")) $(".navbar-collapse").collapse("hide");
  });

  /* Rotating Text - Morphtext */
  $("#js-rotating").Morphext({
    // The [in] animation type. Refer to Animate.css for a list of available animations.
    animation: "fadeIn",
    // An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
    separator: ",",
    // The delay between the changing of each phrase in milliseconds.
    speed: 2000,
    complete: function () {
      // Called after the entrance animation is executed.
    },
  });

  /* Card Slider - Swiper */
  var cardSlider = new Swiper(".card-slider", {
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    slidesPerView: 3,
    spaceBetween: 20,
    breakpoints: {
      // when window is <= 992px
      992: {
        slidesPerView: 2,
      },
      // when window is <= 768px
      768: {
        slidesPerView: 1,
      },
    },
  });

  /* Lightbox - Magnific Popup */
  $(".popup-with-move-anim").magnificPopup({
    type: "inline",
    fixedContentPos: false /* keep it false to avoid html tag shift with margin-right: 17px */,
    fixedBgPos: true,
    overflowY: "auto",
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: "my-mfp-slide-bottom",
  });

  /* Filter - Isotope */
  var $grid = $(".grid").isotope({
    // options
    itemSelector: ".element-item",
    layoutMode: "fitRows",
  });

  // filter items on button click
  $(".filters-button-group").on("click", "a", function () {
    var filterValue = $(this).attr("data-filter");
    $grid.isotope({ filter: filterValue });
  });

  // change is-checked class on buttons
  $(".button-group").each(function (i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on("click", "a", function () {
      $buttonGroup.find(".is-checked").removeClass("is-checked");
      $(this).addClass("is-checked");
    });
  });

  /* Counter - CountTo */
  var a = 0;
  $(window).scroll(function () {
    if ($("#counter").length) {
      // checking if CountTo section exists in the page, if not it will not run the script and avoid errors
      var oTop = $("#counter").offset().top - window.innerHeight;
      if (a == 0 && $(window).scrollTop() > oTop) {
        $(".counter-value").each(function () {
          var $this = $(this),
            countTo = $this.attr("data-count");
          $({
            countNum: $this.text(),
          }).animate(
            {
              countNum: countTo,
            },
            {
              duration: 2000,
              easing: "swing",
              step: function () {
                $this.text(Math.floor(this.countNum));
              },
              complete: function () {
                $this.text(this.countNum);
              },
            }
          );
        });
        a = 1;
      }
    }
  });
})(jQuery);

$(document).ready(function () {
  $("#contactForm").submit(function (e) {
    e.preventDefault();
    const form = document.querySelector('form[id="contactForm"]');
    const name = form.elements["name"].value;
    const Mail = form.elements["email"].value;
    const message = "email — " + Mail + "<br>" + "Summary:" + form.elements["message"].value;


    if (!name || !form.elements["email"].value || !form.elements["message"].value) {
      form.reset();
       var x = document.getElementById("errorname").innerHTML = "Veuillez renseigner les champs obligatoires";
       var z = document.getElementById("errorname").style.color ="#eb0300";
      document.getElementById("errorname").innerHTML= x
    } else {
      var data = {
        service_id: "default_service",
        template_id: "template_7j41mmt",
        user_id: "user_wihDL2EWvYUv58ldvJ0k6",
        template_params: {
          from_name: name,
          from_email: email,
          message_html: message,
        },
      };

      $.ajax("https://api.emailjs.com/api/v1.0/email/send", {
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
      })
        .done(function () {
          form.reset();
             var second =  document.getElementById("errorname").innerHTML = "Envoyé";
            var sc = document.getElementById("errorname").style.color = "#00eb33"
         document.getElementById("errorname").innerHTML= second
        })
        .fail(function (error) {
          alert("Oops… " + JSON.stringify(error));
        });
    }
  });
});
