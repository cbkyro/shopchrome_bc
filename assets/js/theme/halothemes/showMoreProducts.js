import $ from 'jquery';
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable quote-props */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */


export default function() {
   if ($('#homeNewProducts .prod-item').length >= 11) {
      $('#homeNewProducts .prod-item:nth-child(n+11)').css({ 'display': 'none' });
      $('#homeNewProducts .container').append('<div class="showMoreProduct text-center"><a class="btn btn-alt" href="javascript:void(0);">Show More</a></div>');
   }

   const productsToShow = 10;
   const totalProducts = $('#homeNewProducts .prod-item');
   $('.showMoreProduct a').click(function() {
      if ($('#homeNewProducts .prod-item:hidden').length > 0) {
         $('#homeNewProducts .prod-item:hidden:lt(' + productsToShow + ')').show();
         if ($('#homeNewProducts .prod-item:hidden').length === 0) {
            // no more products
            $('.showMoreProduct a.btn').text('No More Products').addClass('disabled');
         }
      }
   });
}
