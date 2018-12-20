import $ from 'jquery';
/* eslint-disable padded-blocks */
/* eslint-disable space-before-blocks */
/* eslint-disable indent */
/* eslint-disable func-names */
/* eslint-disable semi */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable eol-last */
/* eslint-disable space-before-function-paren */

export default function () {

   // Product Images Swap
   const sourceSwap = function () {
      const $this = $(this).find('img[data-src-swap]');
      const newSource = $this.data('src-swap');
      $this.data('src-swap', $this.attr('src'));
      $this.attr('src', newSource);
   }

   $(function() {
      $('.prod-item .prod-image').each(function() {
         new Image().src = $(this).find('img[data-src-swap]').data('src-swap');
      }).hover(sourceSwap, sourceSwap);
   });
}
