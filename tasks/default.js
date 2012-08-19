module.exports = function (grunt) {
  'use strict';

  grunt.registerTask('default', [
    'stylesheet',
    'lint',
    'test',
    'documentation',
    'concat',
    'version',
    'min'
  ]);
};
