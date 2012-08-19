module.exports = function (grunt) {
  'use strict';

  grunt.registerMultiTask('stylus', 'Compile CSS file from a Stylus file.', function () {
    var
      stylus = require('stylus'),
      nib = require('nib'),
      distribution = this.file.dest,
      library = this.file.src;

    stylus(grunt.file.read(library))
      .use(nib())['import']('nib')
      .set('compress', true)
      .set('filename', library)
      .render(function (error, css) {
        if (error) {
          grunt.log.error(error);

          grunt.fail.warn('Stylus failed.');
        } else {
          grunt.log.writeln('Stylus parsed: ' + library);

          grunt.file.write(distribution, css);

          grunt.log.writeln('Stylus compiled: ' + distribution);
        }
      });
  });
};
