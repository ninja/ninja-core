var
  name = require('../package.json').name,
  version = require('../package.json').version,
  placeholder = '0.0.0development',
  regularexpression = new RegExp(placeholder),
  path = require('path'),
  distribution = path.resolve(__dirname, '..', 'distribution', name + '.js');

module.exports = function (grunt) {
  'use strict';

  grunt.registerTask('version', 'Replace version semver string with latest from package.json', function () {
    grunt.file.write(distribution, grunt.file.read(distribution).replace(regularexpression, version));

    grunt.log.writeln('Replaced "' + placeholder + '" with "' + version + '": ' + distribution);
  });
};
