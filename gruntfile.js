/*
 * Welcome to Niagara's gruntfile :)
 * 
 * Here are some tasks that may be interesting for development:
 * 
 * - all: compiles and tests everything, sets up the /WebContent dir that's used for the site
 * - code: compiles the code in /src, executes automated tests
 * - test: runs all available tests (util in Node.js, web in PhantomJS)
 * - testQuick: runs the most important tests, much faster than 'test'
 * - site: use after you changed site content in /srcContent
 * - assemble (default): just create minified.js and copy test cases into /WebDevelopment, but no (slow) closure compilation
 * - watch: watches over files, execute the tasks above automatically when files change
 * - server: starts a server on port 8080 that serves /WebContent
 * 
 */ 

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		minitemplate: {
			staticPages: {
				options: {
					template: 'srcContent/page.template'
				},
				files: [{
			            expand: true,     
			            cwd: 'srcContent/',  
			            src: ['**/*.hson'],
			            dest: 'webContent/',
			            ext: '.html'
			          
				}]
			}
		},
		
		writedocs: {
		    web: {
		      options: {  
		        destDir: 'srcContent/api/'
		      },
		      files: {
		    	  src: ['src/niagara-generated-full-src.js']
		      }
		    }
		},
		
		mergesrc: {
		    main: {
		      options: {
		    	  prolog: "\n\n// WARNING! This file is autogenerated from niagara-master.js and others.\n\n\n"
		      },
		      files: {
		    	  'src/niagara-generated-full-src.js':  ['src/niagara-master.js',
		    	                                         'src/niagara-src.js',
		    	                                         'src/ext/minified-web-full-src.js', 
		    	                                         'src/ext/minified-util-full-src.js',
		    	                                         'src/ext/minified-extras-full-src.js']
		      }
		    }
		},
		
		rebuildsrc: {
			normal: {
				options: {
					config: "// niagara.js config start -- use this comment to re-create your build configuration\n"+
					 "// - All sections except debug, ie6compatibility, ie7compatibility, ie8compatibility.\n"
				},
				files: {
					'tmp/niagara-src.js':     'src/niagara-generated-full-src.js'
				}
			},
			legacy: {
				options: {
					config: "// niagara.js config start -- use this comment to re-create your build configuration\n"+
					 "// - All sections except debug.\n"
				},
				files: {
					'tmp/niagara-legacyie-src.js'    : 'src/niagara-generated-full-src.js'
				}
			}
		},
		
		htmlmin: {
		    dist: {
		      options: {  
		        removeComments: true,
		      },
		      files: [{
		            expand: true,     
		            cwd: 'WebContent/',  
		            src: ['*.html', 'about/*.html', 'api/**/*.html', 'builder/*.html', 'docs/**/*.html', 'download/*.html'],
		            dest: 'WebContent/'		          
		      }]
		    }
		},
		
		uglify: {
			dist: {
				options: {
					compress: {
						hoist_vars: true,
						unsafe: true
					},
					mangle: {
					}					
				},
				files: {
					'dist/niagara.js':              'tmp/niagara-src.js',
					'dist/niagara-legacyie.js':     'tmp/niagara-legacyie-src.js'
				}
			}
		},
		
		copy: {
			sources: {
				files: {
					'WebContent/test/mocha.js':     'node_modules/mocha/mocha.js',
					'WebContent/test/mocha.css':    'node_modules/mocha/mocha.css'
				}
			},
			imgs: {
				files: {
					'WebContent/img/': 'srcContent/img/*.png'
				}
			},
			dist: {
				files: [{
		            expand: true,
		            cwd: 'dist/',  
		            src: ['*.js'],
		            dest: 'WebContent/download/'
		      }]
			}
		},
		
		cssmin: {
			site: {
				files: {
					'WebContent/css/minimum.css': 'srcContent/css/minimum.css',
					'WebContent/css/doc.css': ['srcContent/css/minimum.css', 'srcContent/css/doc.css'],
					'WebContent/css/links.css': ['srcContent/css/minimum.css', 'srcContent/css/links.css'],
					'WebContent/css/homepage.css': ['srcContent/css/minimum.css', 'srcContent/css/homepage.css'],
					'WebContent/css/reference.css': ['srcContent/css/minimum.css', 'srcContent/css/doc.css', 'srcContent/css/reference.css']
				}
			}
		},
		
		xmlmin: {
			site: {
			    files: [{
			            expand: true,     
			            cwd: 'srcContent/img',  
			            src: ['*.svg'],
			            dest: 'WebContent/img'		          
			    }]
			}
		},
		
		measuresize: {
			minified: {
				files: {
					'niagara.js': 'dist/niagara.js',
					'niagara-legacyie.js': 'dist/niagara-legacyie.js'
				}
			}
		},
		
		mochaTest: {
			util: {
				options: {
					bail: true,
				},
				src: [ 'src/test/*test.js' ]
			}
 	    },
 	    
		clean: {
			tmp: ['tmp'],
			webContent: ['webContent'],
			dist: ['dist']
		},
		
		watch: {
			  test: {
				files: ['src/test/**/*'],
				tasks: ['assemble', 'test']
			  },
			  code: {
				files: ['src/niagara-src.js', 'src/ext/minified-web-full-src.js', 'src/ext/minified-util-full-src.js', 'src/ext/minified-extras-full-src.js', 'src/niagara-master.js'],
				tasks: ['code']
			  },
			  content: {
			    files: ['srcContent/**/*'],
			    tasks: ['site']
			  }
			},
		
		connect: {
		    server: {
		      options: {
		        port: 8080,
		        base: 'webContent',
		        keepalive: true
		      }
		    }
		  }
	});
	
	grunt.loadTasks('build/tasks/');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-closurecompiler');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-xmlmin');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.registerTask('assemble', ['mergesrc', 'rebuildsrc', 'copy:sources']);
	grunt.registerTask('code', ['assemble', 'uglify', 'test', 'measuresize']);
	grunt.registerTask('test', ['mochaTest']);
	grunt.registerTask('site', ['writedocs', 'minitemplate', 'copy:imgs', 'cssmin', 'htmlmin', 'xmlmin', 'copy:dist']);
	grunt.registerTask('all', ['code', 'test', 'site']);
	grunt.registerTask('server', ['all', 'connect']);
	grunt.registerTask('default', ['code']);
	
	
};
