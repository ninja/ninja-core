module.exports = function (grunt) {
  'use strict';

  grunt.registerMultiTask('dox', 'Compile documentation JSON from JavaScript.', function () {
    var
      dox = require('dox'),
      documentation = this.file.dest,
      library = this.file.src,
      json = dox.parseComments(grunt.file.read(library));

    grunt.log.writeln('Dox parsed: ' + library);

    grunt.file.write(documentation, JSON.stringify(json));

    grunt.log.writeln('Dox compiled: ' + documentation);
  });
};
