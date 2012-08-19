var
  dox = require('dox'),
  name = require('../package.json').name,
  path = require('path'),
  documentation = path.resolve(__dirname, '..', 'documentation', name + '.json'),
  library = path.resolve(__dirname, '..', 'library', name + '.js');

module.exports = function (grunt) {
  'use strict';

  grunt.registerTask('documentation', 'Compile JSON file from JavaScript file.', function () {
    var json = dox.parseComments(grunt.file.read(library));

    grunt.log.writeln('Dox parsed: ' + library);

    grunt.file.write(documentation, JSON.stringify(json));

    grunt.log.writeln('Dox compiled: ' + documentation);
  });
};
