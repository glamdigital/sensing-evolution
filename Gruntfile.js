/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    meta: {
      version: '0.1.0'
    },
    banner: '/*! PROJECT_NAME - v<%= meta.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '* http://PROJECT_WEBSITE/\n' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
      'YOUR_NAME; Licensed MIT */\n',
    // Task configuration.
    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/FILE_NAME.js'],
        dest: 'dist/FILE_NAME.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/FILE_NAME.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    },
    "phonegap-build": {
      release: {
        options: {
          archive: "app.zip",
          "appID": "1274129",
        }
      }
    },
    compress: {
      release: {
        options: {
          archive: "app.zip",
          mode: "zip",
        },
        files: [
          {
            expand: true,
            src: [
              'www/img/**',
              'www/video/**',
              'www/config.xml',
              'www/js/built.js',
              'www/index-built.html',
              ],
            dest:'app-built/',
            filter:'isFile'
          },
        ]
      }
    },
    requirejs: {
      //release: {
        compile: {
          options: {
            baseUrl: ".",
            mainConfigFile: "app/require.config.js",
            name: "bower_components/almond/almond.js", // assumes a production build using almond
            out: "www/js/built.js",
            //optimize: "none",
            done: function(done, output) {
              grunt.log.success(output);
            },
            include: ['app/main'],
            //insertRequire: ['app/main']
            //modules: [ { name: 'app/main' }],
          }
        }
      //}
    }
  });

  // These plugins provide necessary tasks.
  //grunt.loadNpmTasks('grunt-contrib-concat');
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-qunit');
  //grunt.loadNpmTasks('grunt-contrib-jshint');
  //grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-phonegap-build');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Default task.
  grunt.registerTask('style', ['compass']);
  grunt.registerTask('package', ['requirejs', 'compress']);
  grunt.registerTask('cloud', ['phonegap-build']);

};
