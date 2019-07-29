$(document).ready(function() {
    // wow animate
    new WOW().init();
	
	// $(".phone").mask("+ 7 (999) 999 - 99 - 99?"); 

    // simplebox
    (function() {
        var boxes = [],
            els, i, l;
        if (document.querySelectorAll) {
            els = document.querySelectorAll('a[rel=simplebox]');
            Box.getStyles('simplebox_css', 'libs/simplebox/simplebox.css');
            Box.getScripts('simplebox_js', 'libs/simplebox/simplebox.js', function() {
                simplebox.init();
                for (i = 0, l = els.length; i < l; ++i)
                    simplebox.start(els[i]);
                simplebox.start('a[rel=simplebox_group]');
            });
        }
    })();

    // owl carousel
    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        nav: true,
        autoplay: false,
        smartSpeed: 1000,
        center: false, //если нужны обрезаные края
        navText: ['<span class="nav-left"></span>', '<span class="nav-right"></span>'],
        responsive: {
            320: {
                items: 1,
                nav: true
            },
            600: {
                items: 3,
                nav: false
            },
            1000: {
                items: 5,
                nav: true,
                loop: false
            }
        }
    });

    // Mobile menu =============================================================
    $(function() {
        function burger() {
            $('.main-nav').toggleClass('nav-show');
        };
        $('.burger-menu').click(function() {
            burger();
        });
        $('.close').click(function() {
            $('.main-nav').removeClass('nav-show');
        });
        $(window).resize(function() {
            var w = $(window).width();
            if (w >= 768) {
                $('.main-nav').removeAttr('style');
            }
        });
    });

    // send message ============================================================
    $(".form-reserv").submit(function() {
        var inpFirst = $(this).find('.inp_first');
        var inpSecond = $(this).find('.inp_second');
        var inpFirstInner = $(this).find('.inp_first input');
        var inpSecondInner = $(this).find('.inp_second input');

        var emptyFirst = false;
        var emptySecond = false;

        if (inpFirstInner.val() == "") {
            emptyFirst = true;
        }
        if (inpSecondInner.val() == "") {
            var emptySecond = true;
        }
        if (emptyFirst == true) {
            inpFirst.addClass("error-input");
            inpFirstInner.focus();
        }
        if (emptySecond == true) {
            inpSecond.addClass("error-input");
            inpSecondInner.focus();
        } else {
            var form_data = $(this).serialize();
            $.ajax({
                type: "POST",
                url: "/sendmessage.php",
                data: form_data,
                success: function() {
                    cleanTnanks(this);
                }
            });
        }
        return false;
    });

    function cleanTnanks(form) {
        $('.inp_first').removeClass("error-input");
        $('.inp_second').removeClass("error-input");

        $(".inp_first input").val("");
        $(".inp_second input").val("");

        $('.reservation-modal').hide();
        $('.modal-thanks').fadeIn();
    };
	
	// textarea autosize
	autosize($('textarea'));

    // custom select ===========================================================
    $('.select').selectmenu();

    // modal reservation =======================================================
    $('.modal-show').click(function() {
        $('.overlay').fadeIn();
        $('.reservation-modal').fadeIn();
        $('.close-modal').click(function() {
            $('.overlay').fadeOut();
            $('.reservation-modal').fadeOut();
            $('.modal-thanks').fadeOut();
        });
        $('.overlay').click(function() {
            $('.overlay').fadeOut();
            $('.reservation-modal').fadeOut();
            $('.modal-thanks').fadeOut();
        });
    });

    // slider ==================================================================
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        //   spaceBetween: 83,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

});
