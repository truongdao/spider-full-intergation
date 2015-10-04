loadjar("spider.lib/spider-jrt.jar");
	
//
//var report = {
//	/*string*/executeJRT: null,	//function (path, json_vars),
//	/*string*/getReport: null,	//function(rpt_template, json_vars),
//	/*string*/getReport : null,	//function(engine, code, json_vars),
//	/*string*/toCode : null,	//function (txt_string)
//	
//};
//	/**
//	 * Open token for code pie
//	 */
//	report.INLINE_OPEN = "<%";
//	
//	/**
//	 * Closure token for code pie
//	 */
//	report.INLINE_CLOSE = "%>";
//
//	//NOTE: should not change for purposes
//	/*final*/ report.PRINTLN_FUNC = "__outln";
//	/*final*/ report.PRINT_FUNC = "__out";
//	
//	/**
//	 * Execute an .jrt file then return report string
//	 * @param path - link to report file
//	 * @param json_vars - data input as json string
//	 * @return report as string
//	 */
//	report.executeJRT = function (path, json_vars) {}
//	
//	/**
//	 * Process raw <code>rpt_template</code> on default script engine with passed <code>vars</code> variables.<p> 
//	 * @param rpt_template - template page content
//	 * @param vars - object containing input data that used in code 
//	 * @return report as string
//	 */
//	 
//	report.getReport = function(rpt_template, json_vars){}	
//	/**
//	 * Execute js <code>code</code> on script engine <code>engine</code> with passed <code>vars</code> variables.<p> 
//	 * @param engine - JavaScript Engine to run the code
//	 * @param code - java script code for producing report
//	 * @param vars - object containing input data that used in code 
//	 * @return report as string
//	 */
//	report.getReport = function(engine, code, json_vars)	{}
//	
//	/**
//	 * compile jrt text base to javascript code as string
//	 * @param txt_string - template as string
//	 * @return js code as string
//	 */
//	report.toCode = function (txt_string){}
	
/*actual object is an java object*/	
	var report;
	
	if(spider.x.config.engine_js_name=="JavaScript"){
		importClass(Packages.spider.jrt.Report);
		report = new Report();
	} else if( spider.x.config.engine_js_name=="Nashorn"){
		report = Java.type("spider.jrt.Report");
	} else{
		outln("error!");
	}
	report.engine =  new javax.script.ScriptEngineManager(null).getEngineByName(spider.x.config.engine_js_name);

/******************************************************************************
* help
*/
if(typeof ide_add_completion_enhanced == 'function'){

	var help_spider_jreport= [
		['report-executeJRT(path, json_var) :String', 'report.executeJRT(', 
						'produce report page from jsp template file path and input data json'
						],			
		['report-getReport(s_template, json) :String', 'report.getReport(', 
						'produce report page from jsp template string and input data json'
						],		
		['report-getReport(engine, s_template, json) :String', 'report.getReport(', 
						'produce report page from jsp template string and input data json, engine: specific engine to run the report processor'
						],	
		['report-toCode(s_template) :String', 'report.toCode(', 
						'compile jsp template string into executable js code'
						]							
	];
	
	ide_add_completion_enhanced(help_spider_jreport);
}
	