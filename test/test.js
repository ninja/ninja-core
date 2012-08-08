/*global $ */
/*jshint expr:true */

describe('$.Ninja', function () {
  it('constructor', function () {
    expect($.Ninja).to.be.a('function').and.not.an('object');

    expect($.Ninja).itself.to.not.respondTo('name');

    expect($.Ninja).itself.to.not.respondTo('selector');

    expect($.Ninja).itself.to.not.respondTo('version');

    expect($.Ninja).itself.to.not.respondTo('initialize');
  });
});

describe('$.ninja', function () {
  it('instance of $.Ninja', function () {
    expect($.ninja).to.be.an.instanceof($.Ninja);
  });

  describe('properties', function () {
    it('keys', function () {
      expect($.ninja).to.have.property('keys').and.to.be.an('object');

      expect($.ninja.keys.arrowDown).to.be.a('number').and.to.equal(40);

      expect($.ninja.keys.arrowLeft).to.be.a('number').and.to.equal(37);

      expect($.ninja.keys.arrowRight).to.be.a('number').and.to.equal(39);

      expect($.ninja.keys.arrowUp).to.be.a('number').and.to.equal(38);

      expect($.ninja.keys.enter).to.be.a('number').and.to.equal(13);

      expect($.ninja.keys.escape).to.be.a('number').and.to.equal(27);

      expect($.ninja.keys.tab).to.be.a('number').and.to.equal(9);
    });

    it('name', function () {
      expect($.ninja).to.have.property('name').and.to.be.a('string').and.equal('Ninja UI');
    });

    it('selector', function () {
      expect($.ninja).to.have.property('selector').and.to.be.a('string').and.equal('[data-ninja]');
    });

    it('version', function () {
      expect($.ninja).to.have.property('version').and.to.be.a('string').and.above('1.1');
    });
  });

  describe('functions', function () {
    it('initialize', function () {
      expect($.ninja).to.have.property('initialize').and.to.be.a('function');
    });

    it('key', function () {
      expect($.ninja).to.have.property('key').and.to.be.a('function');
    });
  });
});
