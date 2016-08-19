module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	sass: {                              // Task
        dist: {                            // Target
          options: {                       // Target options
            style: 'expanded'
          },
          files: {                         // Dictionary of files
            'public/css/main.css': 'public/css/main.scss',       // 'destination': 'source'
          }
        }
    },
    watch: {
        css: {
            files: '**/*.scss',
            tasks: ['sass']
        }
    }  
});

  // Load the plugin that provides the "uglify" task.
	//grunt.loadNpmTasks('grunt-contrib-uglify');
	//grunt.loadNpmTasks('grunt-contrib-jshint');
	//grunt.loadNpmTasks('grunt-browserify');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-watch');
  // Default task(s).
  grunt.registerTask('default', ['watch']);

};