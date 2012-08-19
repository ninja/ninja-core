module.exports = function (grunt) {
  'use strict';

  grunt.registerMultiTask('version', 'Replace version semver string with latest from package.json', function () {
    var
      version = grunt.config.get('pkg.version'),
      placeholder = grunt.config.get('version.options.placeholder') || '0.0.0development',
      regularexpression = new RegExp(placeholder),
      distribution = this.file.dest;

    grunt.file.write(distribution, grunt.file.read(distribution).replace(regularexpression, version));

    grunt.log.writeln('Replaced "' + placeholder + '" with "' + version + '": ' + distribution);
  });
};
