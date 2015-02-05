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
      options: {
        appId: 1274129
      },
      release: {
        options: {
          archive: "app.zip",
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
            cwd: '',
            src: [
              'img/**',
              'video/**',
              'css/**',
              'app/built.js',
              'config.xml',
              ],
            dest:'',
            filter:'isFile'
          },
          {
            expand: true,
            src: [
              'index-built.html',
            ],
            rename: function(dest,src) { return 'index.html' }
          }
        ]
      }
    },
    requirejs: {
      //release: {
        compile: {
          options: {
            mainConfigFile: "require.config.js",
            name: "app/libs/almond/almond.js", // assumes a production build using almond
            out: "app/built.js",
            include: ['app/main'],
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


  grunt.registerTask('package', 'Process all source files and zip to app.zip', ['requirejs', 'compass', 'compress']);

  // push - push the build to phonegap with the auth token provided as an argument
  // e.g. grunt push:<PhoneGapToken>
  grunt.registerTask('push', 'Push app.zip to phonegap cloud build. Supply auth token as argument', function(token) {
    if(!token) { grunt.log.error("Please specify auth token as an argument.  grunt push:<token>")}
    grunt.config.set('phonegap-build.options.user', { token: token });
    grunt.task.run('phonegap-build');
  });

  //grunt cloudbuild:<PhoneGapToken>
  grunt.registerTask('cloudbuild', 'Runs package then pushes to phonegap cloud build. Supply auth token as argument', function(token) {
    //package
    grunt.task.run('package');
    grunt.task.run('push:' + token);
  });

};
