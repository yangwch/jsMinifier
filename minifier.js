//js
var fs = require('fs');
var uglifyjs = require('uglify-js');
//var jsp = uglifyjs.parser;
var pro = uglifyjs.uglify;
//清理dist文件夹 
var cleanDist = true;

//配置要压缩的模块
var config = [
	{
		'name': 'jquery',
		'js': ['./node_modules/jquery/dist/jquery.min.js']
	},
	{
		'name': 'bootstrap',
		'js': ['./node_modules/bootstrap/dist/js/bootstrap.js'],
		'css': ['./node_modules/bootstrap/dist/css/bootstrap.css']
	}
];

/*压缩JS*/
function jsMinifier(flieIn, fileOut) {
	var flieIn=Array.isArray(flieIn)? flieIn : [flieIn];
	var origCode,ast,finalCode=[];
	for(var i=0; i<flieIn.length; i++) {
		origCode = fs.readFileSync(flieIn[i], 'utf8');

		if(/.min.js$/.test(flieIn[i])){
			finalCode.push(origCode);
		}else{
			ast = uglifyjs.parse(origCode);
			//计算变量域
			ast.figure_out_scope();
			compressor = uglifyjs.Compressor();
			ast = ast.transform(compressor);
			
			//再次计算、压缩，混乱代码
			ast.figure_out_scope();
			ast.compute_char_frequency();
			ast.mangle_names();
			
			//获取丑化后的代码
			code = ast.print_to_string();
			finalCode.push(code);
		}
	}
	finalCode = finalCode.join('\n');
	var writeFile = function(){
		fs.mkdir('./dist', function(err){
			
			fs.open(fileOut, 'w', 0644, function(e,fd){
				if(e) throw e;
				fs.write(fd, finalCode, 0, 'utf8',function(e){
					if(e) throw e;
					else{ console.log("压缩完成：" + fileOut); }
					//fs.closeSync();
				});
			});
		});
	}
	writeFile();
	
}

//jsMinifier('./file-src/test2.js', './file-smin/test-min.js');  //单个文件压缩
//jsMinifier(['./file-src/test.js','./file-src/test2.js'], './file-smin/test-min.js'); 

//合并压缩
var minijsArr = [];
for(let i in config){
	var item = config[i];
	minijsArr = minijsArr.concat(item.js);
}
/*输出要压缩的脚本列表*/
console.log(minijsArr)
if(minijsArr.length){
	jsMinifier(minijsArr, './dist/vendors.min.js');
}
