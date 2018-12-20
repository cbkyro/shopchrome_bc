import $ from 'jquery';
/* eslint-disable space-before-function-paren */
/* eslint-disable padded-blocks */
/* eslint-disable indent */
/* eslint-disable func-names */

export default function() {

   // SideBar Toggle Mobile View
   if ($('#sidebar-toggle').length) {
      $('#sidebar-toggle').click(function() {
         if ($(this).find('i').hasClass('fa-plus')) {
            $('.page-sidebar > nav').fadeIn(200);
            if ($('.page-sidebar > nav').length) {
               $(window).scrollTop($('.page-sidebar > nav').offset().top - 50);
            }
            $(this).find('i').attr('class', 'fa fa-minus');
         } else if ($(this).find('i').hasClass('fa-minus')) {
            if ($('.page-sidebar > nav').length) {
               $('.page-sidebar > nav').fadeOut(200);
            }
            $(this).find('i').attr('class', 'fa fa-plus');
         }
      });
   }
}
