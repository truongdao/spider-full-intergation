if(spider.x.config.enable_ide==true){
	loadjar("spider.lib/spider-ide.jar");
	spider.x.config.ide = "spider.ide.modern.MainGui";

		var __ide_console;
		if(spider.x.config.engine_js_name == "Nashorn"){
			__ide_console__ = Java.type("spider.ide.modern.MainGui");
		}
		if(spider.x.config.engine_js_name == "JavaScript"){
				importClass(Packages.spider.ide.modern.MainGui);
				__ide_console__ = new MainGui(null);
		}
		

	clear = function(){
			__ide_console__.console.setText("");
	};
} else{
	clear = function(){}
}






