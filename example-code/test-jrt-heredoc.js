var tml=  heredoc(function () {/*
<p>Counting to three:</p>
  	<% for (var i=1; i<=jrt_data.lines; i++) { %>
  	 <p>This number is <%= i %>.</p>
  	<% } %>
  	<p><%=jrt_data.name%></p>
*/});

var rpt = report.getReport(tml, "{lines:3, name:'Truong'}" );
outln(rpt);
