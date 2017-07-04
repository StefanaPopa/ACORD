module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            // define the files to lint
            files: ['Gruntfile.js', 'app/**/*.js'],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                // more options here if you want to override JSHint defaults
                strict: "globals",
                globals: {
                    angular: false,
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },
        sass: {                              // Task
            dist: {                            // Target
                options: {                       // Target options
                    style: 'expanded'
                },
                files: [{
                    expand: true,
                    cwd: 'app',
                    src: ['*.sass'],
                    dest: '../styles',
                    ext: '.css'
                }]
            }
        },
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: '\n'
            },
            dist: {
                // the files to concatenate
                src: [
                    'app/app.module.js',
                    'app/globals/globals.module.js',
                    'app/globals/**/*.constant*.js',
                    'app/globals/**/*.value*.js',
                    'app/globals/**/*.factory*.js',
                    'app/globals/**/*.service*.js',
                    'app/globals/**/*.run*.js',
                    'app/globals/**/*.config*.js',
                    'app/globals/**/*.filter*.js',
                    'app/globals/**/*.controller*.js',
                    'app/globals/**/*.component*.js',
                    'app/globals/**/*.directive*.js',
                    'app/globals/**/*.js',

                    'app/runs/**/*.js',
                    'app/configs/**/*.js',

                    'app/widgets/widgets.module.js',
                    'app/widgets/**/*.constant*.js',
                    'app/widgets/**/*.value*.js',
                    'app/widgets/**/*.service*.js',
                    'app/widgets/**/*.filter*.js',
                    'app/widgets/**/*.controller*.js',
                    'app/widgets/**/*.directive*.js',
                    'app/widgets/**/*.component*.js',

                    'app/pages/**/*.module*.js',
                    'app/pages/**/*.constant*.js',
                    'app/pages/**/*.value*.js',
                    'app/pages/**/*.service*.js',
                    'app/pages/**/*.factory*.js',
                    'app/pages/**/*.config*.js',
                    'app/pages/**/*.run*.js',
                    'app/pages/**/*.filter*.js',
                    'app/pages/**/*.controller*.js',
                    'app/pages/**/*.component*.js',
                    'app/pages/**/*.directive*.js',
                    'app/pages/**/*.js'
                ],
                // the location of the resulting JS file
                dest:  'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        concat_css: {
            options: {
                // Task-specific options go here.
            },
            all: {
                src: ['app/**/*.css'],
                dest: 'dist/<%= pkg.name %>.css'
            }
        },
        cssmin: {
            target: {
                files: {
                    'dist/<%= pkg.name %>.min.css':
                        ['dist/<%= pkg.name %>.css']
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>', '<%= concat_css.all.src%>'],
            tasks: ['jshint', 'concat', 'uglify', 'concat_css', 'cssmin']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // this would be run by typing "grunt test" on the command line
    grunt.registerTask('test', ['jshint']);

    // the default task can be run just by typing "grunt" on the command line
    grunt.registerTask('default', ['concat', 'uglify', 'concat_css', 'cssmin', 'watch']);
};
