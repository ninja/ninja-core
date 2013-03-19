var
  window = require('window'),
  $ = require('jquery'),
  keys = {
    arrowDown: 40,
    arrowLeft: 37,
    arrowRight: 39,
    arrowUp: 38,
    enter: 13,
    escape: 27,
    tab: 9
  };

function Ninja(element, options) {
  if ($.isPlainObject(element)) {
    this.$element = $('<span>');

    this.options = element;
  } else {
    this.$element = $(element);

    this.options = options || {};
  }
}

Ninja.prototype.deselect = function () {
  if (this.$element.hasClass('ninja-selected') && !this.$element.hasClass('ninja-disabled')) {
    this.$element.trigger('deselect.ninja');
  }
};

Ninja.prototype.disable = function () {
  this.$element.addClass('ninja-disabled').trigger('disable.ninja');
};

Ninja.prototype.enable = function () {
  this.$element.removeClass('ninja-disabled').trigger('enable.ninja');
};

Ninja.prototype.select = function () {
  if (!this.$element.hasClass('ninja-disabled')) {
    this.$element.trigger('select.ninja');
  }
};

module.exports = Ninja;

module.exports.error = function () {
  var
    console = window.console,
    message = Array.prototype.slice.call(arguments);

  if (console && console.error && message.length) {
    message.unshift('Ninja:');

    console.error(message.join(' '));
  }
};

module.exports.keys = keys;

module.exports.key = function (code, names) {
  var
    codes = $.map(names, function (name) {
      return keys[name];
    });

  return $.inArray(code, codes) > -1;
};

module.exports.plugin = function () {
  $.fn.ninja = function (component, options) {
    var ninja = new Ninja();

    return this.each(function () {
      if (!$.data(this, 'ninja.' + component)) {
        $.data(this, 'ninja.' + component);

        ninja[component](this, options);
      }
    });
  };
};
