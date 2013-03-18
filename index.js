var
  window = require('window'),
  $ = require('jquery'),
  history = [],
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

module.exports.keys = keys;

module.exports.key = function (code, names) {
  var
    codes = $.map(names, function (name) {
      return keys[name];
    });

  return $.inArray(code, codes) > -1;
};

function log(type, parts) {
  var message = Array.prototype.slice.call(parts).join(' ');

  if (message) {
    history.push({
      type: type,
      message: message
    });

    if (window.console) {
      window.console[type]('Ninja: ' + message);
    }
  }
}

module.exports.log = {
  history: history,
  error: function () {
    log('error', arguments);
  },
  info: function () {
    log('info', arguments);
  },
  warn: function () {
    log('warn', arguments);
  }
};
