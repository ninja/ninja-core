var
  window = require('window'),
  $ = require('jquery');

function message(type, params) {
  if (window.console && window.console[type]) {
    window.console[type]('Ninja: ' + params.join(' '));
  }
}

exports.error = function () {
  message('error', Array.prototype.slice.call(arguments));
};

exports.info = function () {
  message('info', Array.prototype.slice.call(arguments));
};

exports.log = function () {
  message('log', Array.prototype.slice.call(arguments));
};

exports.warn = function () {
  message('warn', Array.prototype.slice.call(arguments));
};

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

Ninja.prototype.key = function (code, names) {
  var
    keys = this.keys,
    codes = $.map(names, function (name) {
      return keys[name];
    });

  return $.inArray(code, codes) > -1;
};

$.Ninja = function (element, options) {
  if ($.isPlainObject(element)) {
    this.$element = $('<span>');

    this.options = element;
  } else {
    this.$element = $(element);

    this.options = options || {};
  }
};

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

$.ninja = new Ninja();

$.fn.ninja = function (component, options) {
  return this.each(function () {
    if (!$.data(this, 'ninja.' + component)) {
      $.data(this, 'ninja.' + component);

      $.ninja[component](this, options);
    }
  });
};
