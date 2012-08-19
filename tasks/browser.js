module.exports = function (grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-reload');

  grunt.registerTask('browser', [
    'server',
    'reloadServer',
    'watch'
  ]);
};
