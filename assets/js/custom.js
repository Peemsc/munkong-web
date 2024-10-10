
$(window).on("load scroll",function(e){
    var scroll = $(window).scrollTop();

    // if (scroll >= 250) {
    //     $("body").addClass("scrolling");
    // } else {
    //     $("body").removeClass("scrolling");
    // }

    setTimeout(() => {
      document.querySelector('body').classList.add('scrolling');
      // console.log('Show Scrolling');
    }, 1000);
});


$(document).ready(function(){
   /*===================Bootstrap scrollspy ==================*/

  $("a.target").on('click', function(event) {
      event.preventDefault();
     var hash = this.hash;

    $('html, body').animate({
         scrollTop: $(hash).offset().top
       }, 1000, function(){
    });
  });

  /*------------[Start] Menu Mobile ------------*/

  $("body").removeClass("nav-opened");
  $('<div class="page-blocker"></div>').appendTo('body');
  $('<div class="search-blocker"></div>').appendTo('body');
 // $('<div class="filter-blocker"></div>').appendTo('body');

  $('.navbar-toggle').click(function () {
      $("html").toggleClass("nav-opened");
  });

  $(".page-blocker").click(function () {
      $("html").toggleClass("nav-opened");
      setTimeout($.proxy(function(){
          $('html').removeClass("closing");
      },this),700);
  });

  $('.target').click(function () {
      $("html").removeClass("nav-opened");
  });

  $('.filter-toggle').click(function () {
      $("html").toggleClass("filter-opened");

      $('.prodct-loader').addClass("show");
      setTimeout($.proxy(function(){
          $('.prodct-loader').removeClass("show");
      },this),500);
  });


    $(".dropdown.select ul li").click(function(){
        var selText = $(this).text();
        $(this).parents('.dropdown').find('[data-toggle]').html(selText);
    });


  /*------------[Start] progress ------------*/

  $('.progress-bar').each(function(){
        $(this).appear(function() {
          $(this).css('width',  function(){ return ($(this).attr('data-percentage')+'%')});
      });
    });

  /*------------[Start] buttons toggle ------------*/

  $(".btn-like").click(function() {
    $(this).toggleClass( "active" );
  });

  $(".page-icon.search").click(function() {
    $('html').toggleClass( "search-opened" );
  });
  $(".search-blocker").click(function() {
    $('html').toggleClass( "search-opened" );
  });

   /*------------[Start] input focus ------------*/

  $("input.focus").focus(function(){
       $(this).parent().addClass('has-focus');

  }).blur(function(){
       $(this).parent().removeClass('has-focus');
  })

  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

  /*------------[Start] swiper  ------------*/

  // var swiperBanner = new Swiper('.swiper-banner', {
  //     slidesPerView:1,
  //     spaceBetween:0,
  //     speed: 700,
  //     loop: true,
  //     effect: 'slide',
  //     observer: true,
  //     observeParents: true,
  //     watchOverflow: true,
  //     autoplay: {
  //         delay: 50500,
  //         disableOnInteraction: false,
  //     },
  //     pagination: {
  //         el: '.swiper-pagination.banner',
  //         clickable: true,
  //     },
  //     navigation: {
  //         nextEl: '.swiper-button-next.banner',
  //         prevEl: '.swiper-button-prev.banner',
  //     }
  // });

  // $(".swiper-single").each(function(index, element){
  //     var $this = $(this);
  //     var swiper = new Swiper(this, {
  //         slidesPerView:1,
  //         spaceBetween:0,
  //         speed: 700,
  //         loop: true,
  //         effect: 'slide',
  //         observer: true,
  //         observeParents: true,
  //         watchOverflow: true,
  //         autoplay: {
  //             delay: 5500,
  //             disableOnInteraction: false,
  //         },
  //         pagination: {
  //             el: $this.parent().find('.swiper-pagination.single'),
  //             clickable: true,
  //         },
  //         navigation: {
  //             nextEl: $this.parent().find(".swiper-button-next.single")[0],
  //             prevEl: $this.parent().find(".swiper-button-prev.single")[0],
  //         }
  //     });
  // });

  // var swiperGadget = new Swiper('.swiper-gadget', {
  //     slidesPerView:4,
  //     spaceBetween:0,
  //     slidesPerGroup: 1,
  //     speed: 800,
  //     loop: true,
  //     observer: true,
  //     effect: 'slide',
  //     observeParents: true,
  //     watchOverflow: true,
  //     pagination: {
  //         el: '.swiper-pagination.gadget',
  //         clickable: true,
  //     },
  //     navigation: {
  //         nextEl: '.swiper-button-next.gadget',
  //         prevEl: '.swiper-button-prev.gadget',
  //     },
  //     breakpoints: {
  //       1280: {
  //           slidesPerView: 4,
  //           spaceBetween: 0,
  //       },
  //       768: {
  //           slidesPerView: 3,
  //           spaceBetween: 0,
  //       },
  //       576: {
  //           slidesPerView: 2,
  //           spaceBetween: 0,
  //           speed: 700,
  //       },
  //       0: {
  //           slidesPerView: 1,
  //           spaceBetween: 0,
  //           speed: 700,
  //       },
  //     }
  // });

  /*--------------product gallery---------------*/

  // var galleryThumbs = new Swiper('.swiper-gallery-thumb', {
  //   spaceBetween: 20,
  //   slidesPerView: 4,
  //   loop: false,
  //   effect: 'slide',
  //   watchSlidesVisibility: true,
  //   observeParents: true,
  //   watchOverflow: true,
  //   /*simulateTouch:false,*/
  //   navigation: {
  //         nextEl: '.swiper-button-next.gallery-thumb',
  //         prevEl: '.swiper-button-prev.gallery-thumb',
  //     },
  //     breakpoints: {
  //       1366: {
  //           spaceBetween: 20,
  //           slidesPerView: 4,
  //       },
  //       768: {
  //           spaceBetween: 10,
  //           slidesPerView: 4,
  //       } ,
  //       0: {
  //           spaceBetween: 5,
  //           slidesPerView: 4,
  //       }
  //     },
  // });

  // var gallery = new Swiper('.swiper-gallery', {
  //     slidesPerView:1,
  //     spaceBetween:10,
  //     speed: 500,
  //     loop: false,
  //     observer: true,
  //     effect: 'slide',
  //     observeParents: true,
  //     watchOverflow: true,
  //     thumbs: {
  //       swiper: galleryThumbs,
  //     },
  //     navigation: {
  //         nextEl: '.swiper-button-next.gallery',
  //         prevEl: '.swiper-button-prev.gallery',
  //     },
  //     pagination: {
  //         el: '.swiper-pagination.gallery',
  //         clickable: true,
  //     },
  // });

});


$(window).on("load", function() {

  $(".preload").fadeOut();

  // setTimeout(function () {
  //    $("html").addClass("page-loaded filter-opened");
  // }, 500);


  var isMobile = {
      Android: function() {
          return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function() {
          return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function() {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function() {
          return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
          return navigator.userAgent.match(/IEMobile/i);
      },
      any: function() {
          return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
      }
  };

  if(isMobile.any()) {
      $("html").addClass("device");
  }else{
      $("html").addClass("pc");
  }



  var ua = window.navigator.userAgent;
  var isIE = /MSIE|Trident/.test(ua);

  if ( isIE ) {
     $("html").addClass("ie");
  }

  $('.modal').on("hidden.bs.modal", function (e) {
      if ($('.modal:visible').length) {
          $('body').addClass('modal-open');
      }
  });


  $('img.svg-js').each(function() {
      var $img = jQuery(this);
      var imgURL = $img.attr('src');
      var attributes = $img.prop("attributes");

      $.get(imgURL, function(data) {
          // Get the SVG tag, ignore the rest
          var $svg = jQuery(data).find('svg');

          // Remove any invalid XML tags
          $svg = $svg.removeAttr('xmlns:a');

          // Loop through IMG attributes and apply on SVG
          $.each(attributes, function() {
              $svg.attr(this.name, this.value);
          });

          // Replace IMG with SVG
          $img.replaceWith($svg);
      }, 'xml');
  });
});



/*------------[Start] Height [vh] ------------*/

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
