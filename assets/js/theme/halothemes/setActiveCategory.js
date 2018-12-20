import $ from 'jquery';
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable eqeqeq */

export default function() {
   $('ul.all-categories-list li').each(function() {
      const breadLink = $('.page-type-product #breadcrumbs-wrapper ul li.breadcrumb.is-active').prev('.breadcrumb').children('a').attr('href');
      if (($(this).children('a').attr('href') == window.location) || ($(this).children('a').attr('href') == window.location.pathname)) {
         $(this).addClass('current-cat');
         $(this).children('.dropdown-category-list').addClass('cat-expanded').siblings('i.fa.fa-caret-down').addClass('is-clicked');
         $(this).parents('.dropdown-category-list').addClass('cat-expanded').siblings('i.fa.fa-caret-down').addClass('is-clicked');
      }
      if ($(this).children('a').attr('href') == breadLink) {
         $(this).addClass('current-cat');
         $(this).parents('.dropdown-category-list').addClass('cat-expanded').siblings('i.fa.fa-caret-down').addClass('is-clicked');
      }
   });

   $('ul.all-categories-list i.fa.fa-caret-down').click(function() {
      /* Act on the event */
      $(this).toggleClass('is-clicked');
      $(this).siblings('ul.dropdown-category-list').toggleClass('cat-expanded');
   });
}
