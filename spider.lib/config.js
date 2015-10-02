/*spider.x.constant.enable_ide=true*/ /*DON'T SET FOR ANY OTHER LINES*/
	var nashorn = false;
	if(spider.x.config.engine_js_name == "Nashorn"){
		load("nashorn:mozilla_compat.js");
		nashorn = true;
	}
	if(spider.x.config.engine_js_name == "JavaScript"){
	}
	
outln('\n------ Loading libraries... ------');

outln('Load spider-ide.js'); include("spider.lib/spider-ide.js");
outln('Load spider-jrt.js'); include("spider.lib/spider-jrt.js");
outln('Load cmd.js'); include('spider.lib/cmd.js');
outln('Load spider-form-old.js'); include('spider.lib/spider-form-old.js');
outln('Load spider-form.js'); include('spider.lib/spider-form.js');
outln('Load excel.js'); include('spider.lib/excel.js');
outln('Load file.js'); include('spider.lib/file.js');
outln('Load autokey.js'); include('spider.lib/autokey.js');


outln('----------------------------------\n');






