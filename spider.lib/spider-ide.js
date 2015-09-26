if(spider.x.config.enable_ide==true){
	loadjar("spider.lib/spider-ide.jar");
	spider.x.config.ide = "spider.ide.modern.MainGui";

	//code highlighter
	loadjar("spider.lib/rsyntax-text-area/rsyntax-text-area.jar");
	if(nashorn){
		var _mgui = Java.type('spider.ide.modern.MainGui');
		var _rsyn = Java.type('org.fife.ui.rsyntaxtextarea.RSyntaxTextArea');
		var _rc = Java.type('org.fife.ui.rtextarea.RTextScrollPane');
		var _SyntaxConstants = Java.type('org.fife.ui.rsyntaxtextarea.SyntaxConstants');
		var redit = new _rsyn();
		var rscr  = new _rc(redit);
	} else{
		importClass(Packages.spider.ide.modern.MainGui);
		importClass(Packages.org.fife.ui.rsyntaxtextarea.RSyntaxTextArea);
		importClass(Packages.org.fife.ui.rtextarea.RTextScrollPane);
		importClass(Packages.org.fife.ui.rsyntaxtextarea.SyntaxConstants);
		var _mgui = Packages.spider.ide.modern.MainGui;
		var redit = new RSyntaxTextArea();
		var rscr  = new RTextScrollPane(redit);
		var _SyntaxConstants = Packages.org.fife.ui.rsyntaxtextarea.SyntaxConstants;
	}
		redit.setSyntaxEditingStyle(_SyntaxConstants.SYNTAX_STYLE_JAVASCRIPT);
		redit.setCodeFoldingEnabled(true);
		
		_mgui.codeEditor = redit;
		_mgui.scrl_Code = rscr;	
	
	
	//set clear function
	var __ide_console;
	if(nashorn){
		__ide_console__ = Java.type("spider.ide.modern.MainGui");
	}
	else{
			importClass(Packages.spider.ide.modern.MainGui);
			__ide_console__ = new MainGui(null);
	}
	clear = function(){
			__ide_console__.console.setText("");
	};
} else{ //else disable gui
	clear = function(){}
}






