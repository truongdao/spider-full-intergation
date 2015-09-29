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
	ide_add_completion_keys(js_resv_keys);
	ide_add_completion_keys(spider_builtins_stuffs);
	ide_add_completion_keys(spider_form_stuffs);
	ide_add_completion_keys(spider_file_stuffs);
	ide_add_completion_keys(spider_heredoc_stuffs);
	ide_add_completion_keys(spider_global_vars_stuffs);
}

function ide_add_completion_keys(skeys){
	
	//1. init js key words set
	for( var i in skeys){
	
		var bcompl;
		if(nashorn){
			var BasicCompletion = Java.type("org.fife.ui.autocomplete.BasicCompletion");
			bcompl = new BasicCompletion(__ide_code_complete__, skeys[i]);
		} else{
			//importClass(Packages.org.fife.ui.autocomplete.BasicCompletion);
			bcompl = new Packages.org.fife.ui.autocomplete.BasicCompletion(__ide_code_complete__, skeys[i]);
		}
		__ide_code_complete__.addCompletion(bcompl);
	}
}

var spider_builtins_stuffs = [
	'loadjar(jar_url)',
	'include(js_url)',
	'out(msg)',
	'outln(msg)',
	'clear()',
	'input(title, ivalue)',
	'exit()'
];

var spider_global_vars_stuffs = [

'spider.',
'spider.x.',
'spider.x.config.',
'spider.x.common.',
'spider.x.constant.',

];

var spider_form_stuffs= [
	'Form(ls_items)',
	'append(item)',
	'show()',
	'hide()'
];

var spider_file_stuffs = [
	'dir.',
	'dir.newf(path)',
	'dir.newd(path)',
	'dir.copyf(src, dest)',
	'dir.movef(src, dest)',
	'dir.writef(path2open) -PrintWriter',
	'dir.readf(path2open) -PrintReader',
	'dir.ls( path , regex, mode) ',
	'dir.lsa( path , regex) -list all',
	'dir.lsf( path , regex) -search file',
	'dir.lsd( path , regex) -search folder',
	'dir.find( path , regex, mode) - find in subfolder',
	'dir.fina( path , regex) - find all in subfolder',
	'dir.findf( path , regex) - find file in subfolder',
	'dir.findd( path , regex) - find folder in subfolder',
];


var spider_heredoc_stuffs = [
     'heredoc(function(){ /*',
     '*/}); //end hdoc'
];

var js_resv_keys= [
	//http://www.w3schools.com/js/js_reserved.asp
	//JavaScript Reserved Words
	"abstract",	"arguments",	"boolean",	"break",	"byte",
	"case",	"catch",	"char",	"class*",	"const",
	"continue",	"debugger",	"default",	"delete",	"do",
	"double",	"else",	"enum*",	"eval",	"export",
	"extends*",	"false",	"final",	"finally",	"float",
	"for",	"function",	"goto",	"if",	"implements",
	"import*",	"in",	"instanceof",	"int",	"interface",
	"let",	"long",	"native",	"new",	"null",
	"package",	"private",	"protected",	"public",	"return",
	"short",	"static",	"super*",	"switch",	"synchronized",
	"this",	"throw",	"throws",	"transient",	"true",
	"try",	"typeof",	"var",	"void",	"volatile",
	"while",	"with",	"yield",

	//JavaScript Objects, Properties, and Methods
	"Array",	"Date",	"eval",	"function",	"hasOwnProperty",
	"Infinity",	"isFinite",	"isNaN",	"isPrototypeOf",	"length",
	"Math",	"NaN",	"name",	"Number",	"Object",
	"prototype",	"String",	"toString",	"undefined",	"valueOf"
];
