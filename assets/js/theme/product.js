/*
 Import all product specific js
 */
import $ from 'jquery';
import PageManager from './page-manager';
import Review from './product/reviews';
import collapsibleFactory from './common/collapsible';
import ProductDetails from './common/product-details';
import videoGallery from './product/video-gallery';
import { classifyForm } from './common/form-utils';
import productViewMagnificPopup from './halothemes/productViewMagnificPopup';
import setActiveCategory from './halothemes/setActiveCategory';
import sidebarToggleMobile from './halothemes/sidebarToggleMobile';

export default class Product extends PageManager {
    constructor() {
        super();
        this.url = location.href;
        this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    }

    before(next) {
        // Listen for foundation modal close events to sanitize URL after review.
        $(document).on('close.fndtn.reveal', () => {
            if (this.url.indexOf('#writeReview') !== -1 && typeof window.history.replaceState === 'function') {
                window.history.replaceState(null, document.title, window.location.pathname);
            }
        });

        next();
    }

    loaded(next) {
        let validator;

        // Init collapsible
        collapsibleFactory();

        this.productDetails = new ProductDetails($('.productView'), this.context);

        // HaloThemes functions
        setActiveCategory();
        sidebarToggleMobile();
        productViewMagnificPopup();

        var slider = function() {
            $('.pr_main').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                verticalSwiping: false,
                asNavFor: '.pr_slick'
            });
            $('.pr_slick').slick({
                infinite: true,
                slidesToShow: 5,
                slidesToScroll: 1,
                asNavFor: '.pr_main',
                verticalSwiping: false,
                dots: false,
                focusOnSelect: true,
                nextArrow: '<div class="slick-next"><svg><use xlink:href="#icon-next"></use></svg></div>',
                prevArrow: '<div class="slick-prev"><svg><use xlink:href="#icon-prev"></use></svg></div>',
                responsive: [
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1,
                            dots: false
                        },
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            dots: false
                        }
                    },
                ]
            });
          };
        new slider();
        if($(window).width() > 1024) {
            $(".productView-images .productView-image").zoom();
        }
        
        // $('.form-field[data-product-attribute="swatch"] .form-radio').on('click', function() {
        //     var number = $('.form-radio-swatch:checked').index('.productView-details input.form-radio-swatch');
        //     $('.productView-thumbnail[data-slick-index="'+number+'"]').click();
        //     console.log(number);
        // });

        // $('.form-field[data-product-attribute="set-select"]').change(function () {
        //     var number_option = $('.form-option-select:selected').index('.productView-details option.form-option-select');
        //     if (number_option < 0) {
        //         number_option == 0;
        //     }
        //     $('.productView-thumbnail[data-slick-index="'+number_option+'"]').click();
        // });

        videoGallery();

        const $reviewForm = classifyForm('.writeReview-form');
        const review = new Review($reviewForm);

        $('body').on('click', '[data-reveal-id="modal-review-form"]', () => {
            validator = review.registerValidation();
        });

        $reviewForm.on('submit', () => {
            if (validator) {
                validator.performCheck();
                return validator.areAll('valid');
            }

            return false;
        });

        next();
    }

    after(next) {
        this.productReviewHandler();

        next();
    }

    productReviewHandler() {
        if (this.url.indexOf('#writeReview') !== -1) {
            this.$reviewLink.click();
        }
    }

}
