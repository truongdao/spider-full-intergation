//static Global variable
var __form_dialog_movement_action = null;
var _static_form_dialog_previous_position;

///////////////////////////////////////////////////////////////////////////////
//			F	O	R	M													 //
///////////////////////////////////////////////////////////////////////////////
function Form(ls_items){

	this.rows = ls_items;
	this.form_dialog = null;
	this.ret = null;
	
	
	// append new row to the last /////////////////////////////////////////////
	this.append = function(item){
	
		this.rows[this.rows.length] = item;
	};
	
	//insert new row to last-1, push the last go 1 step down///////////////////
	this.append_1 = function(item){
	
		var last = this.rows[this.rows.length-1];
		this.rows[this.rows.length-1] = item;
		this.rows[this.rows.length] = last;
	};
	
	///////////////////////////////////////////////////////////////////////////
	this.show = function(){
	
		//1. construct frame
		importPackage(javax.swing);
		form_dialog = new javax.swing.JDialog(new JFrame(), true);
		var panel = new JPanel();
		var scr_panel = new JScrollPane(panel);
		var gbl_panel = new java.awt.GridBagLayout();
		panel.setLayout(gbl_panel);
		form_dialog.add(scr_panel);
		
		//2. built form
		var temp_name = this.rows;
		for(var i=0; i<temp_name.length; i++) {											
			var j = 0;																	
			for( x in temp_name[i]){													
				var	gbc_btnRun;
				var static_gbc_btnRun;
				if(nashorn){
					 static_gbc_btnRun = Java.type("java.awt.GridBagConstraints");
					gbc_btnRun = new static_gbc_btnRun();
				}
				else{
					 gbc_btnRun = new java.awt.GridBagConstraints(); 
					 static_gbc_btnRun = gbc_btnRun;
				 }
				 
				gbc_btnRun.anchor = static_gbc_btnRun.WEST;									
				gbc_btnRun.gridx = 	j;													
				gbc_btnRun.gridy = 	i; 	
				temp_name[i][x].up = this;				
				panel.add(temp_name[i][x].r, gbc_btnRun);						
				j++;																	
			}																			
		}		
			//limit size of dialog
			var preferredSize = scr_panel.getPreferredSize();
			preferredSize.width = (preferredSize.width < 512)? 
									(preferredSize.width + 50) : //avoid showing scroll bar
									512;						 //limitted size
									
			preferredSize.height = (preferredSize.height < 512)? 
									(preferredSize.height + 50) : //avoid showing scroll bar
									512;						 //limitted size
			
			form_dialog.setSize(preferredSize);
		
		//3. keep track position of dialog automatically
		var act;
		__form_dialog_movement_action = new Object();
		__form_dialog_movement_action.componentMoved = function(ev){
			//get position of dialog
			_static_form_dialog_previous_position = form_dialog.getLocation();
		};
		__form_dialog_movement_action.componentResized = function(ev){};
		__form_dialog_movement_action.componentShown = function(ev){};
		__form_dialog_movement_action.componentHidden = function(ev){};
		
		act = spider.x.builtins.cast2Java('__form_dialog_movement_action', 'java.awt.event.ComponentListener');
		form_dialog.addComponentListener(act);

		if(_static_form_dialog_previous_position !=null)
			form_dialog.setLocation(_static_form_dialog_previous_position);
		
		//LAST. show it up
		form_dialog.setVisible(true);
		
		//POLLING. wait for having done then get return
		
	};
	
	///////////////////////////////////////////////////////////////////////////
	this.hide = function(){
	
		form_dialog.setVisible(false);
	};
}

///////////////////////////////////////////////////////////////////////////////
//		B U I L T - I N		C O M P O N E N T S								 //
///////////////////////////////////////////////////////////////////////////////

/**
 * interface of Components
 */
function Component(init){

	//the form containing this component
	this.up = null;
	
	//real java.awt.Component
	this.r= null;	
	
	//abstract function to get value
	this.value= function(){};
}


/******************************************************************************
 * General button, no pre-built action is added later.<p>
 * @param: value - display string
 */
 function Button(value){	
 
	var th = {			
	'up': null,
	'r': new javax.swing.JButton(value),						
	'value': function(){											
		return th.r.getText();									
	}														
	};																	
	return th;															
}


/******************************************************************************
 * Confirm button, help close the form and set return value.<p>
 * @param: value - display/return string
 */
function Confirm(value){
													
	var th = {			
	'up': null,
	'r': new javax.swing.JButton(value),						
	'value': function(){											
		return th.r.getText();									
	}														
	};																	

	//default action setting
	__ConfirmButton_action = new Object();
	__ConfirmButton_action.actionPerformed = function( arg0 ) {
				th.up.hide();	
				th.up.ret = th.r.getText();
	}
	var act = spider.x.builtins.cast2Java('__ConfirmButton_action', 'java.awt.event.ActionListener');
	th.r.addActionListener(act);	
	
	return th;															
}
var __ConfirmButton_action = null;


/******************************************************************************
 * a Label which can contain HTML content.<p>
 * @param: value - display string
 */
function Label(value){	
												
	var th = {	
	'up': null,	
	'r': new javax.swing.JEditorPane('text/html', 
					'<font size="3" face="Tahoma">' +
					value+
					'</font>'
	),						
	'value': function(){											
		return th.r.getText();									
	}														
	};	
	th.r.setEditable(false);
	th.r.setOpaque(false);
	return th;															
}


/******************************************************************************
 * a TextField for get input string.<p>
 * @param: value - initial string
 */
function TextField(value){		
											
	var th = {			
	'up': null,	
	'r': new javax.swing.JTextField(value, 15),						
	'value': function(){											
		return th.r.getText();									
	}														
	};																	
	return th;															
}	


/******************************************************************************
 * a Check box for getting boolean value.<p>
 * @param: value - label string
 */
function CheckBox(value){	
												
	var th = {			
	'up': null,	
	'r': new javax.swing.JCheckBox(value),						
	'value': function(){											
		return th.r.isSelected();									
	}														
	};																	
	return th;															
}		
