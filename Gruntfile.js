module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  
  function resolvePath(project, file) {

    return path.join(path.dirname(require.resolve(project)), file);

  }

  // project configuration
  grunt.initConfig({
    browserify: {
      options: {
        transform: [
          [ 'stringify', {
            extensions: [ '.bpmn' ]
          } ],
          [ 'babelify', {
            global: true
          } ]
        ]
      },
      watch: {
        options: {
          watch: true
        },
        files: {
          'dist/app.js': [ 'app/**/*.js' ]
        }
      },
      app: {
        files: {
          'dist/app.js': [ 'app/**/*.js' ]
        }
      }
    },
    copy: {
      comments: {
        files: [ {
          src: require.resolve('bpmn-js-embedded-comments/assets/comments.css'),
          dest: 'dist/comments.css'
        } ]
      },
      diagram_js: {
        files: [ {
          src: require.resolve('bpmn-js/dist/assets/diagram-js.css'),
          dest: 'dist/diagram-js.css'
        } ]
      },
      app: {
        files: [
          {
            expand: true,
            cwd: 'app/',
            src: ['**/*', '!**/*.js'],
            dest: 'dist'
          },
		  {
            expand: true,
            cwd: 'resources/',
            src: ['*.css'],
            dest: 'dist'
          },
		  {
            expand: true,
            cwd: 'resources/',
            src: ['*.png'],
            dest: 'dist'
          }
        ]
      }
    },
    watch: {
      options: {
        livereload: false
      },

      samples: {
        files: [ 'app/**/*.*' ],
        tasks: [ 'copy:app' ]
      },
    },

    connect: {
      livereload: {
        options: {
          port: 8080,
          livereload: true,
          hostname: 'localhost',
          open: false,
          base: [
            'dist'
          ]
        }
      }
    }
  });

  // tasks

  grunt.registerTask('build', [ 'browserify:app', 'copy' ]);

  grunt.registerTask('auto-build', [
    'copy',
    'browserify:watch',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('default', [ 'build' ]);
};
