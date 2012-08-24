module.exports = function (grunt) {
  'use strict';

  grunt.registerMultiTask('documentation', 'Compile documentation HTML from JavaScript source.', function () {
    var
      done = this.async(),
      http = require('http'),
      file = this.file.dest,
      html = '';

    http.get('http://localhost:3000/?socket=false', function (response) {
      response.on('data', function (chunk) {
        html += chunk;
      });

      response.on('end', function () {
        grunt.file.write(file, html);

        grunt.log.writeln('Documentation compiled: ' + file);

        done();
      });
    }).on('error', function (error) {
      grunt.log.error(error);

      grunt.fail.warn('Failed.');

      done();
    });
  });
};
