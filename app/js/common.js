$(function() {

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	//Smooth Scroll
	$('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
	$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	
// menu
	$('.menu-mobile').click(function(e){
		e.preventDefault();
		$('.menu').slideToggle();
		return false;
	})
	$(window).resize(function(){
	  var w = $(window).width();
	  if(w > 320 && $('.menu').is(':hidden')) {
	   $('.menu').removeAttr('style');
	  }
	});
//manipulation with svg
	 $('img[src$=".svg"]').each(function() {
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
//tabs
	$(".tabs-menu__link").click(function(event) {
        $(this).addClass("current");
        $(this).siblings().removeClass("current");
        var tab = $(this).attr('data-tabs');
        $(".tabs-content").not(tab).css("display", "none");
        $(tab).fadeIn();
    });
//sliders
	$('.equipment__slider').slick({
	  arrows: false,
	  dots: true
	});
	$('.our-clients__slider').slick({
	  slidesToShow: 4,
	  slidesToScroll: 4,
	  variableWidth: true,
	  responsive: [
	    {
	      breakpoint: 992,
	      settings: {
	        variableWidth: false,
	        slidesToShow: 3,
	        slidesToScroll: 3,
	      }
	    },
	    {
	      breakpoint: 768,
	      settings: {
	        variableWidth: false,
	        slidesToShow: 2,
	        slidesToScroll: 2
	      }
	    }
	  ]
	});
	$('.certificates__slider').slick({
	  slidesToShow: 4,
	  variableWidth: true,
	  infinite: false,
	  responsive: [
	    {
	      breakpoint: 992,
	      settings: {
	        variableWidth: false,
	        slidesToShow: 3
	      }
	    },
	    {
	      breakpoint: 768,
	      settings: {
	        variableWidth: false,
	        slidesToShow: 2
	      }
	    }
	  ]
	});
//popups
  $('.certificates__item').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		fixedContentPos: true,
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: 0
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title') + '<small>просто демо</small>';
			}
		}
	});
  $('.popup-with-form').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#name',
		fixedContentPos: true,
		callbacks: {
			beforeOpen: function() {
				if($(window).width() < 700) {
					this.st.focus = false;
				} else {
					this.st.focus = '#name';
				}
			}
		}
	});
//yandex map
var ymapHeight = $('.address').height();
ymaps.ready(init);
$('.map').height(ymapHeight);
function init () {
    var myMap = new ymaps.Map('map', {
            center: [59.966507, 30.379022],
            zoom: 15.6,
            controls: []
        });
	var myPlacemark = new ymaps.Placemark(
		[59.966507, 30.375022] , {
            iconCaption: 'улица Минеральная 13 да:)'
        }, {
            preset: 'islands#redDotIconWithCaption'
        });     
	myMap.geoObjects.add(myPlacemark);
    myMap.behaviors.disable('scrollZoom');
}
//preloader
	$('.loader').hide();
});
