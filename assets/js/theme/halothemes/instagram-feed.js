import $ from 'jquery';
import Instafeed from 'instafeed.js';
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */
/* eslint-disable space-before-blocks */
/* eslint-disable semi-spacing */

export default function() {
   const feed = new Instafeed({
      get: 'user',
      userId: $('#instafeed').data('userid'),
      accessToken: $('#instafeed').data('accesstoken'),
      resolution: 'low_resolution',
      limit: '10',
      before: function(){
         $('#instafeed').after('<div class="before-loading text-center"><i class="fa fa-spinner fa-spin fa-3x fa-fw"></i></div>') ;
      },
      after: function() {
         $('#instafeed ~ .before-loading').remove();
         $('#instafeed a').attr('target', '_blank');
         $('#instafeed').owlCarousel({
            nav: true,
            dots: false,
            items: 5,
            margin: 30,
            slideBy: 5,
            responsive: {
               0: {
                  items: 2,
                  slideBy: 2
               },
               420: {
                  items: 2,
                  slideBy: 2
               },
               560: {
                  items: 3,
                  slideBy: 3
               },
               768: {
                  items: 4,
                  slideBy: 4
               },
               992: {
                  items: 4,
                  slideBy: 4
               },
               1200: {
                  items: 5,
                  slideBy: 5
               }
            },
            responsiveRefreshRate: 0
         });
      }
   });
   feed.run();
}
