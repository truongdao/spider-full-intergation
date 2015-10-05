//only in java 8
if(!nashorn) outln('Not support heredoc in Rhino!');
var tml=  <<EOD
<p>Counting to three:</p>
  	<% for (var i=1; i<=jrt_data.lines; i++) { %>
  	 <p>This number is <%= i %>.</p>
  	<% } %>
  	<p><%=jrt_data.name%></p>
EOD

var rpt = report.getReport(tml, "{lines:3, name:'Truong'}" );
outln(rpt);
