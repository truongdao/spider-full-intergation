loadjar('spider.lib/spider-form.jar');

if(nashorn){
	var HtmlForm = Java.type('spider.form.html.HtmlForm');
}
else
{
	loadjar('C:/Program Files/Java/jre7/lib/jfxrt.jar');
}

/******************************************************************************
* help
*/
if(typeof ide_add_completion_enhanced == 'function'){

	var help_spider_form= [
		['htmlform_new()', 'new HtmlForm(', 
						'create new empty HtmlForm using fx WebView'
						],
		['htmlform_new(s_content)', 'new HtmlForm(',
						'create HtmlForm with auto_recognized content type (url/html code)'
						],
		['htmlform_new(s_content, b_type)', 'new HtmlForm(',
						'create HtmlForm with specific content type, true mean content is url'
						],
		['htmlform_new(s_title, s_content, b_type)', 'new HtmlForm(',
						'create HtmlForm with window title and specific content type, true mean content is url'
						],
		['htmlform_load(s_content)', '.load(',
						'load auto_type content if replace current content'
						],						
		['htmlform_setTitle(s_tit)', '.setTitle(',
						'set window title of form'
						],
		['htmlform_putData(s_name, o_obj)', '.putData(',
						'put data object from program to WebEngine'
						],
		['htmlform_getData(s_name) :object', '.getData(',
						'get data object which pushed by WebEngine after closing the form'
						],
		['htmlform_show()', '.show();',
						'show the form and block current program'
						]
	];
	
	ide_add_completion_enhanced(help_spider_form);
}




