(function ($) {
  'use strict';

  /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  */

  module('$.Ninja', {
    setup: function () {
      this.constructor = $.Ninja;
    }
  });

  test('exists', function () {
    ok(this.constructor, 'should exist');
  });

  test('is a function', function () {
    ok($.isFunction(this.constructor), 'should be a function');
  });

  module('instance', {
    setup: function () {
      this.instance = new $.Ninja();
    }
  });

  test('is an instance', function () {
    ok(this.instance instanceof $.Ninja, 'should be instance of $.Ninja');
  });

  module('$.ninja');

  test('.keys', function () {
    ok($.isNumeric($.ninja.keys.arrowDown), 'should have key number');
    strictEqual($.ninja.keys.arrowDown, 40, '');
  });

  test('.version', function () {
    ok($.ninja.version, 'should exist');
  });

  test('.initialize()', function () {
    ok($.ninja.initialize, 'should exist');
    ok($.isFunction($.ninja.initialize), 'should be a function');
  });

  test('.key()', function () {
    ok($.ninja.key, 'should exist');
    ok($.isFunction($.ninja.key), 'should be a function');
    ok($.ninja.key(40, ['arrowDown', 'tab']), 'should return true when keycode is in keynames');
    ok(!$.ninja.key(40, ['enter', 'tab']), 'should return false when keycode is not in keynames');
  });

}(jQuery));
