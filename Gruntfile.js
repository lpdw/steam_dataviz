module.exports = function(grunt) {

	grunt.initConfig({
		watch: {
			compileScss : {
				files: ['**/*.scss'],
				tasks: ['sass']
			}
		},
		// Minification JS
		uglify: {
			options: {
			  separator: ';',
			},
			dist: {
			  src: ['js/jquery.js', 'js/plugins.js','js/main.js'],
			  dest: 'js/app.min.js'
			}
		},
		sass: {
			options: {
				sourceMap: true,
				outputStyle:"compressed"
			},
			dist: {
				files: {
					'assets/css/style.min.css': 'assets/scss/style.scss',
					'assets/css/reset.min.css': 'assets/scss/reset.scss',
				}
			}
		}

	});
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');
	grunt.registerTask('default', ['watch']);

};