(function ($) {
  $(document).ready(function () {


    $(".hamburger_menu").on("click", function (e) {
      e.preventDefault();
      $(".slide-bar").toggleClass("show");
      $("body").addClass("on-side");
      $('.body-overlay').addClass('active');
      $(this).addClass('active');
    });
  
    $(".close-mobile-menu > a").on("click", function (e) {
      e.preventDefault();
      $(".slide-bar").removeClass("show");
      $("body").removeClass("on-side");
      $('.body-overlay').removeClass('active');
      $('.hamburger_menu').removeClass('active');
    });
    

    //mobile menu active
    if ($("#mobile-menu").length > 0) {
      //Mobile menu
      $("#mobile-menu").meanmenu({
        meanMenuContainer: ".mobile-menu",
        meanScreenWidth: "991",
      });

      $(".mobile-menu-bar").on("click", function () {
        $(".sidebar-main").addClass("active");
      });
      $(".sidebar-close").on("click", function () {
        $(".sidebar-main").removeClass("active");
      });
    }

    //Video poppup
    if ($(".play-btn").length > 0) {
      $(".play-btn").magnificPopup({
        type: "iframe",
      });
    }

       // counter-up
       $(".counter").countUp();

    //Post gallary slider
    const blog_gallary = $(".gallary-slider");
    if (blog_gallary.length > 0) {
      //Blog Gallary
      blog_gallary.owlCarousel({
        loop: true,
        autoHeight: true,
        nav: true,
        navText: [
          "<i class='fa-solid fa-angle-left'></i>",
          "<i class='fa-solid fa-angle-right'></i>",
        ],
        dots: false,
        items: 1,
      });
    }

    // sticky header active
    // if ($("#header").length > 0) {
    //   $(window).on("scroll", function (event) {
    //     var scroll = $(window).scrollTop();
    //     if (scroll < 1) {
    //       $("#header").removeClass("sticky");
    //     } else {
    //       $("#header").addClass("sticky");
    //     }
    //   });
    // }

    
    // sticky header active
    if ($("#header2").length > 0) {
      $(window).on("scroll", function (event) {
        var scroll = $(window).scrollTop();
        if (scroll < 1) {
          $("#header2").removeClass("sticky2");
        } else {
          $("#header2").addClass("sticky2");
        }
      });
    }

    //demo sidebar active
    const demosIcon = $("#demosIcon, .demos");
    const demoSidebar = $("#demo-sidebar");
    demosIcon.on("click", function (e) {
      e.preventDefault();
      demoSidebar.toggleClass("active-sidebar");
    });
  });

  
      $(".trusred-slider-all").owlCarousel({
        loop: true,
        nav: true,
        dots: false,
        // autoplay: true,
        // autoplayTimeout: 3000,
        items: 1,
        autoplay: true,
       autoplayTimeout: 5000,
      smartSpeed: 1000,
      slideSpeed: 600,
        navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
      });

        //owl-carousel-slider-team
        $(".team-slider").owlCarousel({
          loop: true,
          margin: 10,
          nav: false,
          dots: true,
          smartSpeed: 1000,
          slideSpeed: 600,
          responsive: {
            0: {
              items: 1,
            },
            900: {
              items: 3,
            },
          },
        });

                //owl-carousel-slider-team
                $(".testimonial-slider1").owlCarousel({
                  loop: true,
                  margin: 10,
                  nav: false,
                  dots: true,
                  smartSpeed: 1000,
                  slideSpeed: 600,
                  responsive: {
                    0: {
                      items: 1,
                    },
                    900: {
                      items: 2,
                    },
                  },
                });
        



        // home3 tistimonial slider
        $(".tes3-slider-all").owlCarousel({
          loop: true,
          margin: 10,
          nav: true,
          dots: true,
          // autoplay: true,
          // autoplayTimeout: 6000,
          smartSpeed: 1000,
          slideSpeed: 600,
          navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
          responsive: {
            0: {
              items: 1,
            },
            900: {
              items: 2,
            },
          },
        });

                // home3 tistimonial slider
                $(".tes5-slider-all").owlCarousel({
                  loop: true,
                  margin: 10,
                  nav: true,
                  dots: true,
                  // autoplay: true,
                  // autoplayTimeout: 6000,
                  smartSpeed: 1000,
                  slideSpeed: 600,
                  navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
                  responsive: {
                    0: {
                      items: 1,
                    },
                    900: {
                      items: 3,
                    },
                  },
                });

        // home4 tistimonial slider
        $(".tes4-slider").owlCarousel({
          loop: true,
          margin: 10,
          nav: true,
          dots: true,
          smartSpeed: 1000,
          slideSpeed: 600,
          navText: ['<i class="fa-regular fa-angle-left"></i>', '<i class="fa-regular fa-angle-right"></i>'],
          responsive: {
            0: {
              items: 1,
            },
            900: {
              items: 1,
            },
          },
        });


     // sticky header active
     if ($("#header").length > 0) {
      $(window).on("scroll", function (event) {
        var scroll = $(window).scrollTop();
        if (scroll < 1) {
          $("#header").removeClass("sticky");
        } else {
          $("#header").addClass("sticky");
        }
      });
    }


      // check redio
  const color = $(".checkout-input-selact");

  color.on("click", function () {
    $(".checkout-input-selact").removeClass("active");
    $(this).addClass("active");
  });

        // btn_theme
        $(function() {  
          $('.btn_theme')
            .on('mouseenter', function(e) {
                    var parentOffset = $(this).offset(),
                      relX = e.pageX - parentOffset.left,
                      relY = e.pageY - parentOffset.top;
                    $(this).find('span').css({top:relY, left:relX})
            })
            .on('mouseout', function(e) {
                    var parentOffset = $(this).offset(),
                      relX = e.pageX - parentOffset.left,
                      relY = e.pageY - parentOffset.top;
                $(this).find('span').css({top:relY, left:relX})
            });
        });
        
  
    $(".homepage-slides").on("translate.owl.carousel", function () {
      $(".single-slide-item h3")
              .removeClass("animated fadeInUp")
              .css("opacity", "1");
          $(".single-slide-item h1")
              .removeClass("animated fadeInDown")
              .css("opacity", "1");        
          $(".single-slide-item p")
              .removeClass("animated fadeInUp")
              .css("opacity", "1");
          $(".single-slide-item .main-btn")
              .removeClass("animated fadeInDown")
              .css("opacity", "1");
      });
  
      $(".homepage-slides").on("translated.owl.carousel", function () {
      $(".single-slide-item h3")
              .addClass("animated fadeInUp")
              .css("opacity", "1");
          $(".single-slide-item h1")
              .addClass("animated fadeInDown")
              .css("opacity", "1");        
          $(".single-slide-item p")
              .addClass("animated fadeInUp")
              .css("opacity", "1");
          $(".single-slide-item .main-btn")
              .addClass("animated fadeInDown")
              .css("opacity", "1");
      });
  


    

  // home4-header-video
  // new ModalVideo(".video-action-btn1");

  $('.popup-youtube').magnificPopup({
    type: 'iframe'
  });

      //minus

      var buttonPlus = $(".qty-btn-plus");
      var buttonMinus = $(".qty-btn-minus");
  
      var incrementPlus = buttonPlus.click(function () {
        var $n = $(this).parent(".qty-container").find(".input-qty");
        $n.val(Number($n.val()) + 1);
      });
  
      var incrementMinus = buttonMinus.click(function () {
        var $n = $(this).parent(".qty-container").find(".input-qty");
        var amount = Number($n.val());
        if (amount > 0) {
          $n.val(amount - 1);
        }
      });



      //Product slider
      $(".tes2-slider-bottom").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: ".tes2-solider-parent",
        dots: false,
        arrows: false,
        centerMode: false,
        focusOnSelect: true,
        loop: true,
        infinite: true,

        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
            }
          },
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]

      });
  
      $(".tes2-solider-parent").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        loop: true,
        focusOnSelect: true,
        asNavFor: ".tes2-slider-bottom",
        infinite: true,
        
      });


      $(".hero-image-slider").slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 2,
        vertical: true,
        verticalSwiping: true,
        arrows: false,
        swipeToSlide: true,
        focusOnSelect: true,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 8000,
        pauseOnHover: false,
        cssEase: 'linear',
        loop: true,
    });


    $(".hero-image-slider2").slick({
      centerMode: true,
      centerPadding: '60px',
      slidesToShow: 2,
      vertical: true,
      verticalSwiping: true,
      arrows: false,
      swipeToSlide: true,
      focusOnSelect: true,
      autoplay: true,
      autoplaySpeed: 0,
      speed: 10000,
      pauseOnHover: false,
      cssEase: 'linear',
      loop: true,
  });

          //product colors
    const colors = $("ul.product-colors li");

    colors.on("click", function () {
      $("ul.product-colors li").removeClass("active");
      $(this).addClass("active");
    });


    // page-progress
    var progressPath = document.querySelector(".progress-wrap path");
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "none";
    progressPath.style.strokeDasharray = pathLength + " " + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition =
      "stroke-dashoffset 10ms linear";
    var updateProgress = function () {
      var scroll = $(window).scrollTop();
      var height = $(document).height() - $(window).height();
      var progress = pathLength - (scroll * pathLength) / height;
      progressPath.style.strokeDashoffset = progress;
    };
    updateProgress();
    $(window).scroll(updateProgress);
    var offset = 50;
    var duration = 550;
    jQuery(window).on("scroll", function () {
      if (jQuery(this).scrollTop() > offset) {
        jQuery(".progress-wrap").addClass("active-progress");
      } else {
        jQuery(".progress-wrap").removeClass("active-progress");
      }
    });
    jQuery(".progress-wrap").on("click", function (event) {
      event.preventDefault();
      jQuery("html, body").animate({ scrollTop: 0 }, duration);
      return false;
    });

    

    AOS.init({
      offset: 200,
      duration: 400,
      easing: "ease-in-out",
      anchorPlacement: "top-bottom",
      disable: "mobile",
    });

    $('select').niceSelect();


     //preloader
  $(window).on("load", function (event) {

    setTimeout(function() {
      $('#ctn-preloader').addClass('loaded');
      // Una vez haya terminado el preloader aparezca el scroll
      $('body').removeClass('no-scroll-y');
  
      if ($('#ctn-preloader').hasClass('loaded')) {
        // Es para que una vez que se haya ido el preloader se elimine toda la seccion preloader
        $('#preloader').delay(1000).queue(function() {
          $(this).remove();
        });
      }
    }, 3000);

    // $('.tlt').textillate();

  });





            //case study 6
            $(".case6-slider-all").slick({
              margin: "30",
              slidesToShow: 3,
              arrows: true,
              centerMode: true,
              loop: true,
              centerMode: false,
              prevArrow: $(".testimonial-prev-arrow"),
              nextArrow: $(".testimonial-next-arrow"),
              draggable: true,
              centerPadding: "10px",
              dots: false,
              scroll: true,
              responsive: [
                {
                  breakpoint: 769,
                  settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: "40px",
                    slidesToShow: 2,
                  },
                },
                {
                  breakpoint: 480,
                  settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: "40px",
                    slidesToShow: 1,
                  },
                },
              ],
            });


            //testimonial 7
            $(".tes7-slider-all").slick({
              margin: "30",
              slidesToShow: 2,
              arrows: true,
              centerMode: true,
              loop: true,
              centerMode: false,
              prevArrow: $(".testimonial-prev-arrow1"),
              nextArrow: $(".testimonial-next-arrow1"),
              draggable: true,
              centerPadding: "40px",
              dots: true,
              scroll: true,
              responsive: [
                {
                  breakpoint: 769,
                  settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: "40px",
                    slidesToShow: 2,
                  },
                },
                {
                  breakpoint: 480,
                  settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: "40px",
                    slidesToShow: 1,
                  },
                },
              ],
            });






  function _drawAnimated(v) {
    $(canvas).stop(true, true).css({ value: 0 }).animate({ value: v }, $.extend({}, options.animation, {
          step: function(p) {
              _draw(p);
              $(canvas).trigger('circle-animation-progress', [p / v, p]);
          },
  
          complete: function() {
              $(canvas).trigger('circle-animation-end');
          }
      }));
  }
  




  //preloader
  $(window).on("load", function (event) {
    setTimeout(function () {
      $(".preloader-parent").fadeToggle();
    }, 2000);
  });

  $("select").niceSelect();


})(jQuery);











/**
 * @function removeClass
 * @description remove class from Dom element/s
 * @param {Object} elem - Dom element
 * @param {String} className - class name to remove
 *
 **/
function removeClass(elem, className) {
  let l = elem.length;

  if (l == undefined) {
      _removeClass(elem, className);
  } else {
      let i = l - 1;

      while (i >= 0) {
          _removeClass(elem[i], className);
          i--;
      }
  }
}

/**
* @function _removeClass
* @description internal method to remove class from Dom element
* @param {Object} elem - Dom element
* @param {String} newClass - class name to remove
*
**/
function _removeClass(elem, newClass) {
  if (elem.classList) {
      elem.classList.remove(newClass);
  } else {
      let exp = '(^|\\b)' + newClass.split(' ').join('|') + '(\\b|$)';
      elem.className = elem.className.replace(new RegExp(exp, 'gi'), ' ');
  }
}

/**
* @function addClass
* @description add class to Dom element
* @param {Object} elem - Dom element
* @param {String} className - class name to add
*
**/
function addClass(elem, className) {
 let l = elem.length;

 if (l == undefined) {
    _addClass(elem, className);
 } else {
    let i = l - 1;

    while (i >= 0) {
       _addClass(elem[i], className);
       i--;
    }
 }
}


/**
* @function _addClass
* @description internal method add class to Dom element
* @param {Object} elem - Dom element
* @param {String} newClass - class name to add
*
**/
function _addClass(elem, newClass) {
 if (elem.classList) {
    elem.classList.add(newClass);
 } else {
    elem.className += ' ' + className;
 }
}


let loaderDashoffsetTotal = 502;
let preloader = document.querySelector('.preloader');
let preloaderOuter = preloader.querySelector('.outer');
let logo = preloader.querySelector('.logo');
let loaded = 0;
let total = 10;

function onProgress() {
let percentLoaded = Math.round(( loaded / total ) * 100);
      let calc = (loaderDashoffsetTotal /100);
      let percent = Math.round(calc * percentLoaded);
      let offset = loaderDashoffsetTotal - percent;
      preloaderOuter.style.strokeDashoffset =offset + 'px';
}

function init() {
 let startLength = loaderDashoffsetTotal + 'px';
 preloaderOuter.style.strokeDashoffset = startLength;
 preloaderOuter.style.opacity = 1;

 setTimeout(() => {
    let newLength = (loaderDashoffsetTotal) + 'px';
    preloaderOuter.style.strokeDashoffset = newLength;
    addClass(preloaderOuter, 'loading');
    loadImages();


 }, 500);
}

init();

function loadImages() {

  load();
  

}

function load() {


loaded++;
onProgress();

if(loaded == total){
  setTimeout(() => {
    onDone();
  }, 1000);
} else {
  setTimeout(() => {
    load();
  }, 100);
}

}

function onDone() {
 addClass(preloader, 'out');
 removeClass(logo, 'fade-in');
 addClass(logo, 'fade-out');

setTimeout(() => {
  loaded = 0;
  removeClass(preloader, 'out');
 addClass(logo, 'fade-in');
 removeClass(logo, 'fade-out');
  preloaderOuter.style.strokeDashoffset = loaderDashoffsetTotal + 'px';
 removeClass(preloaderOuter, 'loading');
 
    init();
  
  
}, 1000);
}

