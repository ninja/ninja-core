/*!
ninja 1.1.3
http://ninjaui.com/
Copyright 2008-2012 Jamie Hoover
Licensed per the terms of the Apache 2
http://ninjaui.com/license.txt
*/

(function ($) {
  'use strict';

  /*
  Ninja constructor

  Examples:

      var
        defaultNinja = new Ninja('ninja'),
        customNinja = new Ninja('katana');

  @param {String} selector
  @return {Object} instance of constructor
  @api private
  */
  function Ninja() {
    this.keys = {
      arrowDown: 40,
      arrowLeft: 37,
      arrowRight: 39,
      arrowUp: 38,
      enter: 13,
      escape: 27,
      tab: 9
    };

    this.version = '1.1.2';
  }

  /*
  Ninja group `initialize`
  Initializes every element with the data-ninja attribute using its value as the type of component.
  This is the "Dammit Jim! I'm an doctor, not a JavaScript engineer!" function.

  Example:
      <input data-ninja="autocomplete" list="bones"/>
      <datalist id="bones">
        <option value="scanner"/>
        <option value="phaser"/>
        <option value="transporter"/>
      </datalist>
      <script>$.ninja.initialize();</script>

  @api private
  */
  Ninja.prototype.initialize = function () {
    var $elements = $('[data-ninja]');

    $elements.each(function () {
      var $element = $(this);

      $element.ninja($element.data('ninja'));
    });
  };

  /*
  Ninja `key`

  Example:
      $('<input/>').on('keyup', function (event) {
        if ($.ninja.key(event.which, ['escape', 'tab']) {
          $(this).blur();
        }
      });

  @param {Number} key code
  @param {Array} list of key names
  @return true if key code is within key names
  @api private
  */
  Ninja.prototype.key = function (code, names) {
    var
      keys = this.keys,
      codes = $.map(names, function (name) {
        return keys[name];
      });

    return $.inArray(code, codes) > -1;
  };

  /*
  `$.ninja` instance

  Examples:

      $.ninja.initialize();
      $.ninja.key(9, ['enter', 'tab']); // true
      $.ninja.keys.enter; // 13
      $.ninja.version; // 1.1.0

  @api public
  */
  $.ninja = new Ninja();

  /*
  `$().ninja()` individual `initialize`

  Example:

      var $ninja = $('<input/>').ninja('autocomplete', {
        datalist: ['one', 'two', 'three']
      });

  @param {String} component type
  @param {Object} options
  return {Object} jQuery object(s)
  @api public
  */
  $.fn.ninja = function (component, options) {
    return this.each(function () {
      $.ninja[component](this, options);
    });
  };

  /*
  Ninja component constructor
  Ninja components extend this object.

  Examples:

      var ninjaComponent = new $.Ninja();

  @param {Object} jQuery object
  @param {Object} options
  @return {Object} instance of constructor
  @api public
  */
  $.Ninja = function (element, options) {
    this.$element = element ? $(element) : $('<span>');
    this.options = options || {};
  };

  /*
  Ninja `deselect`

  Example:
      $('<input/>').on('keyup', function (event) {
        if ($.ninja.key(event.which, ['escape', 'tab']) {
          $(this).blur();
        }
      });

  @param {Number} key code
  @param {Array} list of key names
  @return true if key code is within key names
  @api private
  */
  $.Ninja.prototype.deselect = function () {
    if (this.$element.hasClass('nui-slc') && !this.$element.hasClass('nui-dsb')) {
      this.$element.trigger('deselect.ninja');
    }
  };

  $.Ninja.prototype.disable = function () {
    this.$element.addClass('nui-dsb').trigger('disable.ninja');
  };

  $.Ninja.prototype.enable = function () {
    this.$element.removeClass('nui-dsb').trigger('enable.ninja');
  };

  $.Ninja.prototype.select = function () {
    if (!this.$element.hasClass('nui-dsb')) {
      this.$element.trigger('select.ninja');
    }
  };

}(window.jQuery));
