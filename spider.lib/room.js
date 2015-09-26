/**
 * Aimed to load configuration file (data.room) in app folder.</p>
 */

var room = {
		api: { 
				_conf_room_data_file: 'data.room',
				autosave_interval_s: 60,
				load: null
		},
		load:	null,	//self-called function
		flush:	null,	//call when needed
		autoSave:	null,	//enable feature
		data:	{}	//storage
		
};

/*****************************************************************************/
/*			G L O B A L 													 */
/*****************************************************************************/

/**
 * load objects in data.room file in application folder to room object.
 * @require file.js
 */
room.load = function(){
	
	//1. read  .room as string
	var codef = 'room.data = \n';
	var rf = dir.readf(room.api._conf_room_data_file);
	var line;
	while((line = rf.readLine())!=null) codef += line +'\n';
	rf.close();
	
	//2. execute .room file
	//outln(codef);
	var cf = new Function(codef);
	cf();
};

/**
 * force to push data in room object to data.room file immediately
 * @require file.js
 */
room.flush = function(){
	var str_data = JSON.stringify(room.data);
	var wf = dir.writef(room.api._conf_room_data_file);
	wf.write(str_data);
	wf.close();
}

var __startAutoSaveThread;

/**
 * start/disable auto save room feature
 * @param dt > 0 start auto save
 * 			dt <= 0 stop auto save 
 */
room.autoSave = function(dt){
	
	room.api.autosave_interval_s = dt;
	
	if((dt> 0 )&& __startAutoSaveThread==null){ 

		__startAutoSaveThread = new Object();
		__startAutoSaveThread.run = function(){
			while(room.api.autosave_interval_s > 0){
				__startAutoSaveThread.sleep(room.api.autosave_interval_s*1000);
				outln('saving data.room automatically...');
				room.flush();
				out('done!');
			}
		};
		
		__startAutoSaveThread.sleep = function(delay){
			  var start = new Date().getTime();
		        while (new Date().getTime() < start + delay);
		};
		
		var run_if = convert('__startAutoSaveThread', 'java.lang.Runnable');
		var thrd = new java.lang.Thread(run_if);
		thrd.start();

	}
	else{
		outln('stopped auto save room feature!');
	}
}

/*****************************************************************************/
/*		I N T E R N A L														 */
/*****************************************************************************/


//1. automatically load data.room file when program is invoked.
room.load();

//2. start auto save thread
//room.autoSave(60);
