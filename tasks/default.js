module.exports = function (grunt) {
  'use strict';

  grunt.registerTask('default', [
    'stylus',
    'lint',
    'server',
    'qunit',
    'dox',
    'concat',
    'version',
    'min'
  ]);
};
