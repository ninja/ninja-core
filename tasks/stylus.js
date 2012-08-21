module.exports = function (grunt) {
  'use strict';

  grunt.registerMultiTask('stylus', 'Compile CSS file from Stylus file(s).', function () {
    var
      css = '',
      stylus = require('stylus'),
      nib = require('nib'),
      distribution = this.file.dest,
      library = grunt.file.expand(this.file.src),
      index = 0;

    library.forEach(function (file) {
      stylus(grunt.file.read(file))
        .use(nib())
        .import('nib')
        .set('compress', true)
        .set('filename', file)
        .render(function (error, styles) {
          if (error) {
            grunt.log.error(error);

            grunt.fail.warn('Failed.');
          } else {
            grunt.log.writeln('Parsed: ' + file);

            css += styles;

            index += 1;

            if (index === library.length) {
              grunt.file.write(distribution, css);

              grunt.log.writeln('Compiled: ' + distribution);
            }
          }
        });
    });
  });
};
