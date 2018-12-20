import $ from 'jquery';
import './common/select-option-plugin';
import 'html5-history-api';
import PageManager from './page-manager';
import quickSearch from './global/quick-search';
import currencySelector from './global/currency-selector';
import foundation from './global/foundation';
import quickView from './global/quick-view';
import cartPreview from './global/cart-preview';
import compareProducts from './global/compare-products';
import privacyCookieNotification from './global/cookieNotification';
import maintenanceMode from './global/maintenanceMode';
import 'lazysizes';
import loadingProgressBar from './global/loading-progress-bar';
import FastClick from 'fastclick';

import 'jquery.browser';
/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import haloProductImageSwap from './halothemes/haloProductImageSwap';
import owlCarousel from 'owl.carousel';
import slick from './product/slick';
import mouseWheel from 'jquery-mousewheel';
import mCustomScrollbar from 'malihu-custom-scrollbar-plugin';
import magnificPopup from 'magnific-popup';

import haloGlobal from './halothemes/haloGlobal';

import backToTop from './halothemes/backToTop';

import topBarPromotion from './halothemes/topBarPromotion';
    window.topBarPromotion = topBarPromotion;

import stickyNavigation from './halothemes/stickyNavigation';
    window.stickyNavigation = stickyNavigation;

import haloNewsletterPopup from './halothemes/haloNewsletterPopup';
    window.haloNewsletterPopup = haloNewsletterPopup;

import lazyLoadingEffect from './halothemes/lazyLoadingEffect';
    window.lazyLoadingEffect = lazyLoadingEffect;

import haloProductNewLabel from './halothemes/haloProductNewLabel';

import haloAdvancedProductImageSwap from './halothemes/halo-advanced-product-image-swap';


function fastClick(element) {
    return new FastClick(element);
}

export default class Global extends PageManager {
    /**
     * You can wrap the execution in this method with an asynchronous function map using the async library
     * if your global modules need async callback handling.
     * @param next
     */
    loaded(next) {
        haloProductImageSwap();
        haloGlobal();
        haloProductNewLabel();
        backToTop();
        fastClick(document.body);
        quickSearch();
        currencySelector();
        foundation($(document));
        quickView(this.context);
        cartPreview();
        compareProducts(this.context.urls);
        privacyCookieNotification();
        maintenanceMode(this.context.maintenanceMode);
        loadingProgressBar();
        next();
        haloAdvancedProductImageSwap();
    }
}

