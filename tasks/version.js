module.exports = function (grunt) {
  'use strict';

  grunt.registerMultiTask('version', 'Replace version semver string with latest from package.json', function () {
    var
      version = grunt.config.get('pkg.version'),
      placeholder = grunt.config.get('version.options.placeholder') || '0.0.0development',
      regularexpression = new RegExp(placeholder);

    this.files.forEach(function (fileObject) {
      var files = grunt.file.expandFiles(fileObject.src);

      files.forEach(function (file) {
        grunt.file.write(file, grunt.file.read(file).replace(regularexpression, version));

        grunt.log.writeln('Replaced "' + placeholder + '" with "' + version + '": ' + file);
      });
    });
  });
};
