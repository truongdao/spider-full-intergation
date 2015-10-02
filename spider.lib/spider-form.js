loadjar('spider.lib/spider-form.jar');

if(nashorn){
	var HtmlForm = Java.type('spider.form.html.HtmlForm');
}
else
{
	loadjar('C:/Program Files/Java/jre7/lib/jfxrt.jar');
	//new Packages.spider.form.html.HtmlForm();
}





