var
  stylus = require('stylus'),
  nib = require('nib'),
  name = require('../package.json').name,
  path = require('path'),
  distribution = path.resolve(__dirname, '..', 'distribution', name + '.css'),
  library = path.resolve(__dirname, '..', 'library', name + '.styl');

module.exports = function (grunt) {
  'use strict';

  grunt.registerTask('stylesheet', 'Compile CSS file from a Stylus file.', function () {
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
