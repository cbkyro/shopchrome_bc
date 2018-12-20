import $ from 'jquery';
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable padded-blocks */

export default function() {
   function position_sidebar_menu() {
      var temp = $('header.header').height();
      $('.st-menu').css('top', temp);
   }
   
   function doSticky() {

      /*----------  scroll stickey menu  ----------*/
      
      var header_height = $('header.header').height();
      var nav_offset;
      if($(window).width() <= 1024) {
         nav_offset = $('header .header-bottom .header-panel').offset();
         position_sidebar_menu();
      } else {
         nav_offset = $('header .navPages-container').offset();
      }

      $(window).on('scroll', function (event) {
         if ($(window).scrollTop() > nav_offset.top) {
            $('body').addClass('is-sticky');
            $('body.is-sticky .body').css('margin-top', header_height );
         }
         else {
            $('body').removeClass('is-sticky');
            $('body .body').css('margin-top', '0px');
            // $('#quickSearch').removeClass('is-open');
         }

         if($(window).width() <= 1024) {
            position_sidebar_menu();
         }
      });

      $('#top-bar-promotion .close').on('click', function(){
         $('.st-menu').css('top', $('.header-bottom').height());
      });

      /*----------  Sidebar menu  ----------*/
   }
   
   doSticky();


   $(window).resize(function() {
      $('#top-bar-promotion .close').on('click', function(){
         $('.st-menu').css('top', $('.header-bottom').height());
      });
      if($(window).width() <= 1024) {
         position_sidebar_menu()
      }
   });
}
