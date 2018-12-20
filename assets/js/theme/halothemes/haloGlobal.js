import $ from 'jquery';
import classie from 'classie';
/* eslint-disable space-before-function-paren */
/* eslint-disable padded-blocks */
/* eslint-disable no-undef */
/* eslint-disable indent */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable wrap-iife */

export default function() {

   jQuery(document).ready(function($) {

      // OwlCarousel init
      const $carousel = $('[data-owl]');
      if ($carousel.length) {
         $carousel.each(function(index, el) {
            $(this).owlCarousel($(this).data('owl'));
         });
      }

      // Mobile Menu Links
      var sidebar = 0;
      var header = $('header.header').height();


      if ($('#sidebar-toggle').length) {
         sidebar = $('#sidebar-toggle').height();
      }

      $('#top-bar-promotion .close').on('click', function(){
         header = $('.header-bottom').height();
         set_maxheight_sidebarMenu()
      });

      function set_maxheight_sidebarMenu() {
         $('#mobile-categories ul').css('max-height', screen.height - header - sidebar);
         $('#mobile-customer ul').css('max-height', screen.height - header - sidebar);
      }

      set_maxheight_sidebarMenu()
      
      $(window).resize(function(event) {
         set_maxheight_sidebarMenu()
      });

      $('#mobile-customer ul li > span').click(function() {
         if ($(this).hasClass('collapsed')) {
            $(this).siblings('div').addClass('sub-expand');
            $(this).parent().addClass('expanded');
            $(this).removeClass('.collapsed');
         } else {
            $(this).siblings('div').removeClass('sub-expand');
            $(this).parent().removeClass('expanded');
            $(this).addClass('collapsed');
         }
      });


      // check pagination
      $('.pagination').each(function(index, el) {
         if ((!$(this).children('ul.pagination-list').length > 0) && ($(this).children('.compare-link').length > 0)) {
            $(this).addClass('only-compare');
         }
      });

      function initSearchBoxFixed() {
         const eventtype = $.browser.mobile ? 'touchstart' : 'click';
         $('.search-toggle').on(eventtype, function(ev) {
            ev.preventDefault();
            $(this).parent().toggleClass('is-open');
         });
         $(document).on(eventtype, function(ev) {
            if ($(ev.target).closest('#quickSearch').length === 0) {
               $('.search-toggle').parent().removeClass('is-open');
            }
         });
      }

      initSearchBoxFixed();

      // event quick search
      document.getElementById("search_query").addEventListener("input", quick_search);
      function quick_search() {
         if (!$('#quickSearch.is-open').length) {
            $('#quickSearch').addClass('is-open');
         }
      }


      // Mobile Search Toggle Button
      $('#mobile-search-toggle').click(function(event) {
         /* Act on the event */
         $(this).toggleClass('is-open');
      });

   });


   $(window).resize(function() {
      if ($(window).width() > 1024) {
         $('body').removeClass('st-off-canvas');
         $('html').removeClass('st-off-canvas');
         $('#st-container').removeClass('st-effect-1 st-menu-open');
      }
   });


   /**
    * sidebarEffects.js v1.0.0
    * http://www.codrops.com
    *
    * Licensed under the MIT license.
    * http://www.opensource.org/licenses/mit-license.php
    *
    * Copyright 2013, Codrops
    * http://www.codrops.com
    */

   const SidebarMenuEffects = (function() {
      function hasParentClass(e, classname) {
         if (e === document) return false;
         if (classie.has(e, classname)) {
            return true;
         }
         return e.parentNode && hasParentClass(e.parentNode, classname);
      }

      function init() {
         const container = document.getElementById('st-container');
         const buttons = Array.prototype.slice.call(document.querySelectorAll('#st-trigger-effects > a'));
         const buttonsAlt = Array.prototype.slice.call(document.querySelectorAll('li#mobileAccountSidebar > a'));
         // event type (if mobile use touch events)
         const eventtype = $.browser.mobile ? 'touchstart' : 'click';
         const resetMenu = function() {
            // classie.remove(container, 'st-menu-open');
            container.className = 'st-container';
            $('body').removeClass('st-off-canvas');
            $('html').removeClass('st-off-canvas');
            $('#mobile-search-toggle').removeClass('is-open');
         };
         const bodyClickFn = function(evt) {
            // if( hasParentClass( evt.target, 'close-canvas' ) ) {
            if (!hasParentClass(evt.target, 'st-menu')) {
               resetMenu();
               document.removeEventListener(eventtype, bodyClickFn);
            }
         };

         // toggle categories
         buttons.forEach(function(el, i) {
            const effect = el.getAttribute('data-effect');

            el.addEventListener(eventtype, function(ev) {
               ev.stopPropagation();
               ev.preventDefault();
               //container.className = 'st-container'; // clear
               if (classie.has(container, 'st-menu-open') && classie.has(container, effect)) {
                  container.className = 'st-container';
                  setTimeout(function() {
                     classie.remove(container, 'st-menu-open');
                     $('body').removeClass('st-off-canvas');
                     $('html').removeClass('st-off-canvas');
                  }, 25);
                  document.addEventListener(eventtype, bodyClickFn);
               } else {
                  container.className = 'st-container';
                  classie.add(container, effect);
                  $(window).scrollTop(0);
                  setTimeout(function() {
                     classie.add(container, 'st-menu-open');
                     $('body').addClass('st-off-canvas');
                     $('html').addClass('st-off-canvas');
                  }, 25);
                  document.addEventListener(eventtype, bodyClickFn);
               }

               // close search
               if ($('#mobile-search-toggle').hasClass('is-open')) {
                  $('#mobile-search-toggle').removeClass('is-open');
               }
            });
         });

         // toggle account
         $('li#mobileAccountSidebar > a').on('click', function(event) {
            event.preventDefault()
         });
         buttonsAlt.forEach(function(el, i) {
            const effect = el.getAttribute('data-effect');

            el.addEventListener(eventtype, function(ev) {
               ev.stopPropagation();
               ev.preventDefault();
               //container.className = 'st-container'; // clear
               if (classie.has(container, 'st-menu-open') && classie.has(container, effect)) {
                  container.className = 'st-container';
                  setTimeout(function() {
                     classie.remove(container, 'st-menu-open');
                     $('body').removeClass('st-off-canvas');
                     $('html').removeClass('st-off-canvas');
                  }, 25);
                  document.addEventListener(eventtype, bodyClickFn);
               } else {
                  container.className = 'st-container';
                  classie.add(container, effect);
                  $(window).scrollTop(0);
                  setTimeout(function() {
                     classie.add(container, 'st-menu-open');
                     $('body').addClass('st-off-canvas');
                     $('html').addClass('st-off-canvas');
                  }, 25);
                  document.addEventListener(eventtype, bodyClickFn);
               }

               // close search
               if ($('#mobile-search-toggle').hasClass('is-open')) {
                  $('#mobile-search-toggle').removeClass('is-open');
               }
            });
         });
      }

      init();
   })();

}
