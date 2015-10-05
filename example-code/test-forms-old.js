clear()

var form1 = new Form([
	{'0': Label('Name:'),  name: TextField('Truong'), '1': CheckBox('Male') },
	{'1': Label('Age:'),	  age: TextField(''), '':Label('*required')},   ]);

form1.append(
          [Confirm('OK'),  Confirm('Cancel')]     );

for(var i=0; i<5; i++) form1.append_1( 
	{'1': Label('Item'+i+':'),   item: TextField(''),} );

form1.append(
          {'0':Label(''), '': Label('<a href="">(c) 2015 Truong Dao </a>')}   );

form1.show();

if(form1.ret == 'OK')
	outln('Form submitted!\tname: '+form1.rows[0]['name'].value());
if(form1.ret == 'Cancel')
	outln('Form cancel!');
if(form1.ret == null)
	outln('Form ignored!');








