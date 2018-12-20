import $ from 'jquery';
import nod from '../common/nod';
import { CollapsibleEvents } from '../common/collapsible';
import forms from '../common/models/forms';

export default class {
    constructor($reviewForm) {
        this.validator = nod({
            submit: $reviewForm.find('input[type="submit"]'),
        });

        this.$reviewsContent = $('.productView-description');
        this.$collapsible = $('[data-collapsible]', this.$reviewsContent);

        this.initLinkBind();
        this.injectPaginationLink();
        this.collapseReviews();
    }

    /**
     * On initial page load, the user clicks on "(12 Reviews)" link
     * The browser jumps to the review page and should expand the reviews section
     */
    initLinkBind() {
        $(".reviewLinkCount > a" ).click(function( event ) {
          event.preventDefault();
        });
        
        $('.reviewLinkCount').click(() => {
            $('html, body').animate({
                scrollTop: this.$reviewsContent.offset().top - 76,
            }, 600);

            var i = 2;
            $( ".tab" ).each(function( index ) {
             
              if( $( this ).text().search("Product Reviews") != -1){
                i = index + 1;
              }
            });

            if (!$('.productView-description .tabs li:nth-child('+i+')').hasClass('is-active')) {
                $('.productView-description .tabs li:nth-child('+i+') a').trigger('click');
            }

            // $('.navPage-childList-item').each(function(index){
            //     console.log( index + ": " + $( this ).text() );
            // });
        });
    }

    collapseReviews() {
        // We're in paginating state, do not collapse
        if (window.location.hash && window.location.hash.indexOf('#product-reviews') === 0) {
            $('html, body').animate({
                scrollTop: this.$reviewsContent.offset().top - 76,
            }, 600);
            if (!$('.productView-description .tabs li:nth-child(2)').hasClass('is-active')) {
                $('.productView-description .tabs li:nth-child(2) a').trigger('click');
            }
        }

        // force collapse on page load
        //this.$collapsible.trigger(CollapsibleEvents.click);
    }

    /**
     * Inject ID into the pagination link
     */
    injectPaginationLink() {
        const $nextLink = $('.pagination-item--next .pagination-link', this.$reviewsContent);
        const $prevLink = $('.pagination-item--previous .pagination-link', this.$reviewsContent);

        if ($nextLink.length) {
            $nextLink.attr('href', `${$nextLink.attr('href')} #product-reviews`);
        }

        if ($prevLink.length) {
            $prevLink.attr('href', `${$prevLink.attr('href')} #product-reviews`);
        }
    }

    registerValidation() {
        this.validator.add([{
            selector: '[name="revrating"]',
            validate: 'presence',
            errorMessage: 'The \'Rating\' field cannot be blank.',
        }, {
            selector: '[name="revtitle"]',
            validate: 'min-length:2',
            errorMessage: 'The \'Review Subject\' field cannot be blank.',
        }, {
            selector: '[name="revtext"]',
            validate: 'min-length:2',
            errorMessage: 'The \'Comments\' field cannot be blank.',
        }, {
            selector: '[name="email"]',
            validate: (cb, val) => {
                const result = forms.email(val);
                cb(result);
            },
            errorMessage: 'Please use a valid email address, such as user@example.com.',
        }]);

        return this.validator;
    }

    validate() {
        return this.validator.performCheck();
    }
}
