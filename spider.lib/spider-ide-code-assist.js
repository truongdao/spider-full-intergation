/*static*/ var __ide_code_complete__;

function auto_code_install(redit){
loadjar("spider.lib/auto-complete-code/auto-complete-code.jar");
	if(nashorn){
		var _auto = Java.type('org.fife.ui.autocomplete.AutoCompletion');
		var _pro = Java.type('org.fife.ui.autocomplete.DefaultCompletionProvider');
		var pro = new _pro();
		var cauto = new _auto(pro);
	} else{
		importClass(Packages.org.fife.ui.autocomplete.AutoCompletion);
		importClass(Packages.org.fife.ui.autocomplete.DefaultCompletionProvider);
		var pro = new DefaultCompletionProvider();
		var cauto = new AutoCompletion(pro);
	}
	__ide_code_complete__ = pro;
	cauto.install(redit);
	
	//
	ide_add_completion_enhanced(help_spider_builtins);
	ide_add_completion_enhanced(help_spider_global_vars);
}

function ide_add_completion_basic(skeys){
	
	//1. init js key words set
	for( var i in skeys){
	
		var bcompl;
		if(nashorn){
			var BasicCompletion = Java.type("org.fife.ui.autocomplete.BasicCompletion");
			bcompl = new BasicCompletion(__ide_code_complete__, skeys[i]);
		} else{
			//importClass(Packages.org.fife.ui.autocomplete.BasicCompletion);
			bcompl = new Packages.org.fife.ui.autocomplete.BasicCompletion(
								__ide_code_complete__, 
								skeys[i]);
		}
		__ide_code_complete__.addCompletion(bcompl);
	}
}


function ide_add_completion_enhanced(skeys){
	
	//1. init js key words set
	for( var i in skeys){
	
		var bcompl;
		if(nashorn){
			var ShorthandCompletion = Java.type("org.fife.ui.autocomplete.ShorthandCompletion");
			bcompl = new ShorthandCompletion(__ide_code_complete__, 
											skeys[i][0],
											skeys[i][1],
											skeys[i][2]);
		} else{
			bcompl = new Packages.org.fife.ui.autocomplete.ShorthandCompletion(
											__ide_code_complete__, 
											skeys[i][0],
											skeys[i][1],
											skeys[i][2]);
		}
		__ide_code_complete__.addCompletion(bcompl);
	}
}

var help_spider_builtins = [

	['loadjar(jar_url)', 'loadjar(', 
						'load jar lib from system'
						],
	['include(js_url)','include(', 
						'execute external js file'
						],
	['out(msg)','out(', 
						'print msg to console/ide'
						],
	['outln(msg)','outln(', 
						'print msg to new line of console\ide'
						],
	['clear()','clear();', 
						'clear output console of ide'
						],
	['input(title, ivalue)','input(', 
						'show prompt to get input string'
						],
	['exit()', 'exit();', 
						'exit program'
						]
];

var help_spider_global_vars = [

	['spider_', 'spider.',
						'root data'
						],
	['spider_x_','spider.x.',
						'central program/ide data'
						],
	['spider_x_config_', 'spider.x.config.',
						'program config bundle'
						],
	['spider_x_common_', 'spider.x.common.',
						'program common data bundle'
						],
	['spider_x_constant_', 'spider.x.constant.',
						'program constant bundle'
						]
];



