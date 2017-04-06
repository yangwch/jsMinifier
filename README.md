# jsMinifier
使用uglifyjs，对多个js压缩到一个文件中

## 使用

1、安装node

2、执行命令 npm install

3、修改minifier.js中config变量

```javascript
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
```

4、执行命令 node minifier.js 或者 npm run build，压缩脚本

### 后续可能的功能

1、css压缩及其他功能
