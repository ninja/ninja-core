module.exports = function (grunt) {
  'use strict';

  grunt.registerTask('default', [
    'stylus',
    'lint',
    'qunit',
    'dox',
    'concat',
    'version',
    'min'
  ]);
};
