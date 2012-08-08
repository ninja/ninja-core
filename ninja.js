/*
  Ninja User Inteface $VERSION
  http://ninjaui.com/
  Copyright 2008-$YEAR Jamie Hoover
  Licensed per the terms of the Apache License v2.0
  http://ninjaui.com/license.txt
*/

/*jshint
  strict:true
*/

(function ($) {
  'use strict';

  $.Ninja = function (selector) {
    this.keys = {
      arrowDown: 40,
      arrowLeft: 37,
      arrowRight: 39,
      arrowUp: 38,
      enter: 13,
      escape: 27,
      tab: 9
    },
    this.name = 'Ninja UI',
    this.selector = selector || '[data-ninja]';
    this.version = '1.1.0';
  };

  $.Ninja.prototype.initialize = function () {
    var $elements = $(this.selector);

    $elements.each(function () {
      var $element = $(this);

      $element.ninja($element.data('ninja'));
    });
  };

  $.Ninja.prototype.key = function (code, names) {
    var
      keys = this.keys,
      codes = $.map(names, function (name) {
        return keys[name];
      });

    return $.inArray(code, codes) > -1;
  };

  $.Ninja.Component = function (element, options) {
    this.$element = element ? $(element) : $('<span>');
    this.options = options || {};
  };

  $.Ninja.Component.prototype.deselect = function () {
    if (this.$element.is('.nui-slc') && !this.$element.is('.nui-dsb')) {
      this.$element.trigger('deselect.ninja');
    }
  };

  $.Ninja.Component.prototype.disable = function () {
    this.$element.addClass('nui-dsb').trigger('disable.ninja');
  };

  $.Ninja.Component.prototype.enable = function () {
    this.$element.removeClass('nui-dsb').trigger('enable.ninja');
  };

  $.Ninja.Component.prototype.select = function () {
    if (!this.$element.is('.nui-dsb')) {
      this.$element.trigger('select.ninja');
    }
  };

  $.ninja = new $.Ninja();

  $.fn.ninja = function (component, options) {
    return this.each(function () {
      $.ninja[component](this, options);
    });
  };
}(window.jQuery));
