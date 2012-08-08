/*global $ */
/*jshint expr:true */

describe('$.Ninja.Component', function () {
  it('constructor', function () {
    expect($.Ninja.Component).to.be.a('function').and.not.an('object');
    expect($.Ninja.Component).itself.to.not.respondTo('$element');
    expect($.Ninja.Component).itself.to.not.respondTo('options');
  });
});

describe('$component', function () {
  var $component;

  before(function () {
    $component = new $.Ninja.Component();
  });

  it('is an instance of $.Ninja.Component', function () {
    expect($component).to.be.an.instanceof($.Ninja.Component);
  });

  describe('properties', function () {
    it('$element', function () {
      expect($component).to.have.property('$element').and.be.an('object');
    });

    it('options', function () {
      expect($component).to.have.property('options').and.be.an('object');
    });
  });
  describe('functions', function () {
    it('select', function () {
      expect($component).to.have.property('select').and.be.a('function');
    });
  });
});

