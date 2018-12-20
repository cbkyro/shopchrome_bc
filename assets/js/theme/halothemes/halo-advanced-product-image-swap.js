import $ from 'jquery';
import utils from '@bigcommerce/stencil-utils';

export default function() {

    const product_class = ".prod-item";
    var product_image = [];
    var product_hover = [];

    $(document).ready(function() {

        callProductOption();

        $(document).on('mouseover', product_class + ' label', function(event) {
            var $product = $(this).parents(product_class);
            var $product_img = $(this).parents(product_class).find("img");
            var productId = $("[data-product-id]", $product).data("productId");
            var cur_val = $(this).attr("data-product-attribute-value");

            if (product_hover[productId] != 1) {
                product_hover[productId] = 1;

                $('input[type="radio"]', $product.html()).each(function() {
                    var data = { "action": "add" }
                    data["product_id"] = productId;
                    data["qty[]"] = 1;
                    data[$(this).attr('name')] = $(this).attr('value');

                    utils.api.productAttributes.optionChange(productId, data, (err, result) => {
                        const productAttributesData = result.data || {};

                        if ((typeof productAttributesData.image === "object") && (productAttributesData.image !== null)) {
                            var src = productAttributesData.image.data.replace('{:size}', '500x659');
                            $('label[for=attribute_' + productId + '_' + $(this).attr('value') + ']').addClass('colorVarian_addon').attr("d_img", src);
                            if (cur_val == $(this).attr('value')) {
                                $product_img.attr("src", src);
                            }
                        } else {
                            $('label[for=attribute_' + productId + '_' + $(this).attr('value') + ']').addClass('colorVarian_addon').attr("d_img", product_image[productId]);
                        }
                    });

                });
            }
        });

        $(document).on('click', '.colorVarian_addon', function(event) {
            var img = $(this).attr('d_img');
            var $product_img = $(this).parents(product_class).find("img");
            $product_img.attr("src", img);
        });
        $(document).on('mouseover', '.colorVarian_addon', function(event) {
            var img = $(this).attr('d_img');
            var $product_img = $(this).parents(product_class).find("img");
            $product_img.attr("src", img);
        });
        /*$(document).on('mouseleave', '.colorVarian_addon', function (event) {
          var productId = $("[data-product-id]", $(this).parents(product_class)).data("productId");
          var $product_img = $(this).parents(product_class).find("img");
          $product_img.attr("src", $product_img.attr("data-src"));
        });*/

    });

    function callProductOption() {

        $(product_class).each(function() {
            var $product = $(this);
            var productId = $("[data-product-id]", $product).data("productId");
            product_image[productId] = $("img", $product).attr("data-src");
            if (productId != undefined) {
                utils.api.product.getById(productId, { template: 'halothemes/haloAdvancedProductImageSwap' }, (err, response) => {
                    if ($('[data-product-attribute="swatch"]', response).length == 1) {
                        var $response = $(response).find('.form-label--alternate').remove().end();
                        response = $response;
                        var data_option = $('[data-product-attribute="swatch"]', response).html();

                        data_option = data_option.replace(new RegExp(escapeRegExp("attribute_"), 'g'), "attribute_" + productId + "_");
                        data_option = data_option.replace(new RegExp(escapeRegExp("attribute_" + productId + "_value_images"), 'g'),"attribute_value_images");
                        if ($product.parents('.module-wrapper').hasClass('productList')){
                            $product.find('.prod-image').append("<div class='product-color-img product-option-" + productId + "'><div data-product-option-change><div data-product-attribute=\"swatch\">" + data_option + "</div></div></div>");
                        } else{
                            $product.find('.prod-desc').append("<div class='product-color-img product-option-" + productId + "'><div data-product-option-change><div data-product-attribute=\"swatch\">" + data_option + "</div></div></div>");
                        }
                        $product.find('.form-option-expanded').parents('.product-color-img').hide();
                    }
                });
            }
        });
    }

    function escapeRegExp(str) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }
    $('#list-view').click(function() {
      $(product_class).each(function() {
        var $product = $(this);
        $product.find('.prod-desc').find('.product-color-img').appendTo($product.find('.prod-image .actions'));
      });
    });
    $('#grid-view').click(function() {
        $(product_class).each(function() {
        var $product = $(this);
        $product.find('.prod-image .actions').find('.product-color-img').appendTo($product.find('.prod-desc'));
      });
    });
}
