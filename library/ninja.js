/*!
##Begin Immediately-Invoked Function Expression

Assign `jQuery` to `$`.

Enable ECMAScript 5 strict mode.
*/
(function ($) {
  'use strict';

/*
##Ninja Constructor

`keys` object for readable key event tests.

`version` semver string. Gets replaced with the package.json version at build time.

    var ninja = new Ninja();
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

    this.version = '0.0.0development';
  }

/*
##Page-wide Initialize

`initialize` every element with the data-ninja attribute using its value as the type of component.

This is the "Damn it Jim! I'm an doctor, not a JavaScript engineer!" function.

For components that require an array of values, the `<datalist>` element is used. Other options are specified via data attributes on the element being initialized.

    <input data-ninja="autocomplete" list="bones"/>
    <datalist id="bones">
      <option value="scanner"/>
      <option value="phaser"/>
      <option value="transporter"/>
    </datalist>
    <script>$.ninja.initialize();</script>
*/
  Ninja.prototype.initialize = function () {
    var $elements = $('[data-ninja]');

    $elements.each(function () {
      var $element = $(this);

      $element.ninja($element.data('ninja'));
    });
  };

/*
##Key Boolean

`key` code is within an array of names?

    $('<input/>').on('keyup', function (event) {
      if ($.ninja.key(event.which, ['escape', 'tab']) {
        $(this).blur();
      }
    });
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
##Component Constructor

Merge an instance of this with a component instance to gain default behavior.

    var autocomplete = $.merge(new $.Ninja(), new Autcomplete());
*/
  $.Ninja = function (element, options) {
    this.$element = element ? $(element) : $('<span>');
    this.options = options || {};
  };

/*
##Deselect Component

Triggers deselect.ninja event if component is selected but not disabled.

    <button id="cut">Cut</button>
    <script>
      $('#cut').ninja('button', {
        select: true
      }).on('deselect.ninja', function () {
        // Do something.
      }).deselect();
    </script>
*/
  $.Ninja.prototype.deselect = function () {
    if (this.$element.hasClass('nui-slc') && !this.$element.hasClass('nui-dsb')) {
      this.$element.trigger('deselect.ninja');
    }
  };

/*
##Disable Component

Adds disabled CSS class. Triggers disable.ninja event.

    <button id="cut">Cut</button>
    <script>
      $('#cut').ninja('button').on('disable.ninja', function () {
        // Do something.
      }).disable();
    </script>
*/
  $.Ninja.prototype.disable = function () {
    this.$element.addClass('nui-dsb').trigger('disable.ninja');
  };

/*
##Enable Component

Removes disabled CSS class. Triggers enable.ninja event.

    $('<input/>').enable();
*/
  $.Ninja.prototype.enable = function () {
    this.$element.removeClass('nui-dsb').trigger('enable.ninja');
  };

/*
##Select Component

Triggers select.ninja event if component is not disabled.

    $('<input/>').select();
*/
  $.Ninja.prototype.select = function () {
    if (!this.$element.hasClass('nui-dsb')) {
      this.$element.trigger('select.ninja');
    }
  };

/*
##jQuery Instance

`ninja` instance of Ninja class added to jQuery.

    $.ninja.initialize();
    $.ninja.key(9, ['enter', 'tab']); // true
    $.ninja.keys.enter; // 13
    $.ninja.version; // 1.1.0
*/
  $.ninja = new Ninja();

/*
##jQuery Object Initialize

`ninja` component initialize a jQuery object.

Prevents initializing the same component twice.

    <input id="katana"/>
    <script>
      $('#katana').ninja('autocomplete', {
        datalist: ['one', 'two', 'three']
      });
    </script>
*/
  $.fn.ninja = function (component, options) {
    return this.each(function () {
      if (!$.data(this, 'ninja.' + component)) {
        $.data(this, 'ninja.' + component);

        $.ninja[component](this, options);
      }
    });
  };

/*!
##End Immediately-Invoked Function Expression

Preserve jQuery's state while invoking.
*/
}(jQuery));
