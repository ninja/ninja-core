module.exports = function (grunt) {
  'use strict';

  grunt.registerMultiTask('stylus', 'Compile CSS file from Stylus file(s).', function () {
    var
      css = '',
      stylus = require('stylus'),
      nib = require('nib');

    this.files.forEach(function (fileObject) {
      var
        library = grunt.file.expandFiles(fileObject.src),
        distribution = fileObject.dest,
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

              grunt.fail.warn('Stylus failed.');
            } else {
              grunt.log.writeln('Parsed: ' + file);

              css += styles;

              index += 1;

              if (index === library.length) {
                grunt.file.write(grunt.template.process(distribution), css);

                grunt.log.writeln('Compiled: ' + distribution);
              }
            }
          });
      });
    });
  });
};
