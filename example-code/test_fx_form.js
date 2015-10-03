var cont1 = 	"D:/my/Proj_Spider/03_Workspace/99_BlankSpace/test-fx-webview/small.html";	
var cont3 = 	"D:/my/Proj_Spider/03_Workspace/spider-docs/SLDoc/WebContent/sub/technologies.html";	
var cont2=
		"<html>\n"
		+"<body>\n"
		+"<p id='lable'>Normal</p>\n"
		+"<script>\n"
		+"window.status = 'MY-MAGIC-VALUE';\n"
		+"window.status = '';\n"
		+"document.getElementById('lable').innerHTML='Hello ' + guest;\n"
		+"form.foutput.put('hello_from_web', 'Hello from Web view!');\n"
		+"</script>\n"
		+"</body>\n"
		+"</html>\n"
		;				

		
if(nashorn)
	var form = new HtmlForm(cont2);
else
	var form = new Packages.spider.form.html.HtmlForm(cont2);

	form.setTitle('hello form')
	.putData("guest", "Doc Truong")
	.show();
outln("hello_from_web:"+form.getData("hello_from_web"));

form.load(cont3).show();








