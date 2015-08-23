module.exports = function (grunt) {

	grunt.initConfig({
		ts: {
			// A specific target
			build: {
				src: ['src/**/*.ts'],
				outDir: 'target/scripts',
				options: {
					module: 'amd',
					sourceMap: false
				}
			}
		},

		stylus: {
			compile: {
				options: {
					compress: false
				},
				files: {
					'target/styles/style.css': 'static/styles/style.styl'
				}
			}
		},

		copy: {
			dev: {
				expand: true,
				src: [
					'libs/**',
					'styles/style.css',
					'index.html'
				],
				dest: 'target/'
			}
		},

		clean: {
			dev: {
				src: 'target'
			}
		},

		watch: {
			scripts: {
				files: ['src/**/*.ts', 'static/**'],
				tasks: ['ts:build', 'stylus:compile'],
				options: {
					spawn: false
				}
			}
		}
	});

	// load the task
	grunt.loadNpmTasks('grunt-ts');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-stylus');

	grunt.registerTask('default', ['clean:dev', 'copy:dev', 'ts:build', 'stylus:compile']);
};