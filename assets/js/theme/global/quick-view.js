import $ from 'jquery';
import 'foundation-sites/js/foundation/foundation';
import 'foundation-sites/js/foundation/foundation.dropdown';
import utils from '@bigcommerce/stencil-utils';
import ProductDetails from '../common/product-details';
import { defaultModal } from './modal';

export default function (context) {
    const modal = defaultModal();

    $('body').on('click', '.quickview', (event) => {
        event.preventDefault();

        const productId = $(event.currentTarget).data('product-id');

        modal.open({ size: 'large' });

        utils.api.product.getById(productId, { template: 'products/quick-view' }, (err, response) => {
            modal.updateContent(response);

            modal.$content.find('.productView').addClass('productView--quickView');
            // const thumbnailCarousel = modal.$content.find('.productView-thumbnails');
            // thumbnailCarousel.owlCarousel(thumbnailCarousel.data('owl'));
            // new SlickCarousel();
            var slider1 = function() {
                $('.productView--quickView .pr_main').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    fade: true,
                    verticalSwiping: false,
                    asNavFor: '.productView--quickView .pr_slick'
                });

                $('.productView--quickView .pr_slick').slick({
                    infinite: true,
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    asNavFor: '.productView--quickView .pr_main',
                    verticalSwiping: false,
                    dots: false,
                    focusOnSelect: true,
                    nextArrow: '<div class="slick-next"><svg><use xlink:href="#icon-next"></use></svg></div>',
                    prevArrow: '<div class="slick-prev"><svg><use xlink:href="#icon-prev"></use></svg></div>',
                    responsive: [
                        {
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
            new slider1();
            if($(window).width() > 1024) {
                $(".productView-images .productView-image").zoom();
            }

            // $('.productView--quickView .form-field[data-product-attribute="swatch"] .form-radio').on('click', function() {
            //     var number = $('.productView--quickView .form-radio-swatch:checked').index('.productView--quickView .productView-details input.form-radio-swatch');
            //     $('.productView--quickView .productView-thumbnail[data-slick-index="'+number+'"]').click();
            // });

            // $('.productView--quickView .form-field[data-product-attribute="set-select"]').change(function () {
            //     var number_option = $('.productView--quickView .form-option-select:selected').index('.productView--quickView .productView-details option.form-option-select');
            //     if (number_option < 0) {
            //         number_option == 0;
            //     }
            //     $('.productView--quickView .productView-thumbnail[data-slick-index="'+number_option+'"]').click();
            // });

            return new ProductDetails(modal.$content.find('.quickView'), context);
        });
    });
}
