module.exports = function (grunt) {
  'use strict';

  grunt.registerTask('browser', [
    'server',
    'watch'
  ]);
};
