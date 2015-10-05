var dir = {
	newf: 	null,		//new file
	newd:   null,		//new directory
	copyf:	null,		//copy a file
	movef:	null,		//move a file
	
	writef: null,		// open a text file to write, return java.io.PrintWriter object 
	readf: null,		// open a text file to read, return java.io.LineNumberReader object
	
	//mode set
	path_mode: "full",	// "full" canonical path OR "relative" path OR "just_name"
						// used for ls and find
	silent: false,		// false - print out results while execute command
						// true - do not print out results
	
	ls:		null,		//full list function
	lsa:	null,		//list all
	lsf:	null,		//list all files
	lsd:	null,		//list all directories	
	
	find:	null,		//full find function
	finda: null,		// find all
	findf:	null,		//find file
	findd:	null,		//find folder
	
	//private
	check_pattern: null,	// function for check matched name;
};

///////////////////////////////////////////////////////////////////////////////

/**
 * create a file and also their path if parent dirs 
 * haven't existed
 * @return	true if OK, false if failed
 * @param {@code path} path to file
 */
dir.newf = function( path ){

	var f = new java.io.File(path);
	
	try{	
		var dir = f.getParentFile();
		if(dir!=null){
			java.nio.file.Files.createDirectories(dir.toPath()); 
			java.nio.file.Files.createFile(f.toPath());
		}	
		 return true;
	} catch(err){} 
	
	return false;
};

/**
 * create a dir and also their path if parent dirs 
 * haven't existed
 * @return	true if OK, false if failed
 * @param {@code path} path to file
 */
dir.newd = function( path ){

	var f = new java.io.File(path);
	try{	
		java.nio.file.Files.createDirectories(f.toPath()); 
		return true;
	} catch(err){outln(err.toString());} 
	return false;
};

/**
 * copy one file from {@code src} to {@code dest}
 */
dir.copyf = function (src, dest){

	try{
		var dt = new java.io.File(dest);
		var sr = new java.io.File(src);
		var fdest  = null;
		//dest is folder name
		if(dt.exists() && dt.isDirectory()) {
			fdest = new java.io.File(dest, sr.getName());
		}
		// dest is file name, do changing file name
		else{
			fdest = dt;		
		}
		
		outln(fdest.getCanonicalPath());
		java.nio.file.Files.copy(
				sr.toPath(),
				fdest.toPath()
		);
	} catch(err){}

};

/**
 * move one file from {@code src} to {@code dest}, do replacement if existed
 */
dir.movef = function (src, dest){

	try{
		var dt = new java.io.File(dest);
		var sr = new java.io.File(src);
		var fdest  = null;
		//dest is folder name
		if(dt.exists() && dt.isDirectory()) {
			fdest = new java.io.File(dest, sr.getName());
		}
		// dest is file name, do changing file name
		else{
			fdest = dt;		
		}
		
		outln(fdest.getCanonicalPath());
		java.nio.file.Files.move(
				sr.toPath(),
				fdest.toPath(),
				java.nio.file.StandardCopyOption.REPLACE_EXISTING
		);
	} catch(err){}
};

///////////////////////////////////////////////////////////////////////////////

/**
 * open a text file to write
 */
dir.writef = function(path){
	return java.io.PrintWriter(path);
};

/**
 * open a text file to read
 */
dir.readf = function(path){
	return java.io.LineNumberReader(
		new java.io.InputStreamReader(
			new java.io.FileInputStream(path)
		)
	);
};
///////////////////////////////////////////////////////////////////////////////

/**
 * list in folder the appriciated file/directory if it is matched the pattern
 * @param	path - from where to search
 * @param	patt - pattern to find. in js OR java style
 * @param	mode - {'all'/'directory'/'file'} type of found object
 * @return	list of matched file/directory
 */
dir.ls = function( path , patt, mode){

	if(path == null) path = ".";

	var lsf = new java.io.File(path).listFiles();
	var lsn =[];
	for (var i in lsf){
		var st = (dir.path_mode == "full")? lsf[i].getCanonicalPath() : 
					(dir.path_mode == "relative")? lsf[i].getPath() : 
					lsf[i].getName(); //"just_name"
		st 	= dir.check_pattern(st, patt);
		if(st!=null){
			if(lsf[i].isDirectory()){
				if(mode=='all' || mode=='directory') lsn.push(st);
			}
			if(lsf[i].isFile()){
				if(mode=='all' || mode=='file') lsn.push(st);
			}
			
		}
	}
	
	if(!dir.silent) for(var i in lsn) outln(lsn[i]);
	
	return lsn;
};

/**
 * search for all file/directory matched the pattern in their name
 */
dir.lsa = function( path , patt){
	return dir.ls(path, patt, 'all');
};


/**
 * search for all file matched the pattern in their name
 */
dir.lsf = function( path , patt){
	return dir.ls(path, patt, 'file');
};

/**
 * search for all directory matched the pattern in their name
 */
dir.lsd = function( path , patt){
	return dir.ls(path, patt, 'directory');
};

///////////////////////////////////////////////////////////////////////////////

dir.check_pattern = function(st, patt){
	if(patt==null){	//always
		return st;
	} else{			//filter
		
		if(typeof patt == 'object' &&	//js type
			st.search(patt) >= 0){
				return st;
		}
		
		else if(typeof patt == 'string'&&	//java type
			st.matches(patt)){
				return st;
		}	
	}
	return null;	//not matched
};

///////////////////////////////////////////////////////////////////////////////

/**
 * find appriciated file/folder if it is matched the pattern
 * @param	path - from where to search
 * @param	patt - pattern to find. in js OR java style
 * @param	mode - {'all'/'directory'/'file'} type of found object
 * @return	list of matched file/folder
 */
dir.find = function(path, patt, mode){

	if(path == null) path = ".";
	
	var lsn = [];
	var	stack = [];


	// non-recursion
	var lsFolder = function(fld){
		stack.push(fld);
		while(stack.length > 0){
			var child = stack.pop();
			var childf = new java.io.File(child);
			
			var	st = (dir.path_mode == "full")? childf.getCanonicalPath() : 
					(dir.path_mode == "relative")? childf.getPath() : 
					childf.getName(); //"just_name"
					
			if(childf.isDirectory()) {
				var ret = dir.check_pattern(st, patt);
				if((ret!=null) &&(mode=='all' || mode=='directory')) lsn.push(ret);
				
				var f = childf.listFiles();
				for(var i in f) stack.push(f[i].getPath());
			} else if(childf.isFile()){
				var ret = dir.check_pattern(st, patt);
				if((ret!=null) &&(mode=='all' || mode=='file')) lsn.push(ret);
			}
		}
		
	/*	//recursion method
		var lsf = fld.listFiles();
		for(var i in lsf){
			var	st = (dir.path_mode == "full")? lsf[i].getCanonicalPath() : 
					(dir.path_mode == "relative")? lsf[i].getPath() : 
					lsf[i].getName(); //"just_name"
			if(lsf[i].isDirectory()){
				var ret = dir.check_pattern(st, patt);
				if(ret!=null) {
					if(mode=='all' || mode=='directory') lsn.push(ret);
				}
				lsFolder(lsf[i]);
			}
			else{
				var ret = dir.check_pattern(st, patt);
				if(ret!=null) {
					if(mode=='all' || mode=='file') lsn.push(ret);
				}
			}
		}
	*/
	};
	
	lsFolder(path);
	
	if(!dir.silent) for(var i in lsn) outln(lsn[i]);
	
	return lsn;
};

/**
 * search for all file/directory matched the pattern in their name
 */
dir.finda = function(path, patt){
	return dir.find(path, patt, 'all');
};	

/**
 * search for all file matched the pattern in their name
 */
dir.findf = function(path, patt){
	return dir.find(path, patt, 'file');
};	

/**
 * search for all directory matched the pattern in their name
 */
dir.findd = function(path, patt){
	return dir.find(path, patt, 'directory');
};	

///////////////////////////////////////////////////////////////////////////////

/******************************************************************************
* help
*/
if(typeof ide_add_completion_enhanced == 'function'){

	var help_spider_file = [
		['dir_','dir.',
				'static object providing working functions with file'
				],
		['dir_newf(s_path) :File', 'dir.newf(',
				'create new File with path name'
				],
		['dir_newd(s_path) :File', 'dir.newd(path)',
				'create new Folder with path name'
				],
		['dir_copyf(from, to)', 'dir.copyf(',
				'copy file from A to B'
				],
		['dir_movef(from, to)', 'dir.movef(',
				'move file from A to B'
				],
		['dir_writef(s_wpath) :PrintWriter', 'dir.writef(',
				'open a file to write as output stream'
				],
		['dir_readf(s_rpath) : PrintReader', 'dir.readf(',
				'open a file to read as input stream'
				],
		['dir_ls( path , regex, mode) :String[]', 'dir.ls(',
				'list file in a path(no sub), regex: filter string, mode: {all, directory} inclusion'
				],
		['dir_lsa(path , regex): String[]', 'dir.lsa(',
				'list all file/folder in path (no sub)'
				],
		['dir_lsf( path , regex) :String[]', 'dir.lsf(',
				'list all file in path (no sub)'
				],
		['dir_lsd( path , regex) :String[]', 'dir.lsd(',
				'list all folder in path(no sub)'
				],
		['dir_find(path , regex, mode) :String[]', 'dir.find(',
				'find st in path (inc. sub)'
				],
		['dir_finda( path , regex) :String[]', 'dir.finda(',
				'find all in path (inc. sub)'
				],
		['dir_findf( path , regex) :String[]','dir_findf',
				'find file in path (inc. sub)'
				],
		['dir_findd( path , regex) :String[]', 'dir.finda',
				'find folder in path (inc. sub)'
				]
	];	
	ide_add_completion_enhanced(help_spider_file);
}


