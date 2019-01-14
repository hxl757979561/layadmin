/**
 layuiAdmin pro 构建
*/

var pkg = require("./package.json");

var gulp = require("gulp");
var uglify = require("gulp-uglify");
var cssmin = require("gulp-minify-css");
var htmlmin= require("gulp-htmlmin");
var header = require("gulp-header");
var del = require("del");
var plumber = require("gulp-plumber");
var javascriptObfuscator = require('gulp-javascript-obfuscator');

function errrHandler(e) {
    gutil.beep();
    gutil.log(e);
    this.emit("end");
}

//获取参数
var  note = [
        "/** <%= pkg.name %>-v<%= pkg.version %> <%= pkg.license %> License By <%= pkg.homepage %> */\n <%= js %>",
        { pkg: pkg, js: ";" }
    ],
    destDir = "./dist", //构建的目标目录
    //任务
    task = {
        minjs: function() {
            var src = [
                "./src/**/*.js",
                "!./src/config.js",
                "!./src/lib/extend/echarts.js",
                "!./src/lib/extend/formSelects.js"
            ];

            return gulp
                .src(src)
                .pipe(plumber({errorHandler:errrHandler}))
                .pipe(uglify({
                    mangle: { except: ['require', 'exports', 'module', '$'] },//类型：Boolean 默认：true 是否修改变量名
                    compress: true,             //类型：Boolean 默认：true 是否完全压缩
                    preserveComments: 'false'   //保留所有注释
                }))
                .pipe(javascriptObfuscator({
                    compact:true,
                    sourceMap: false,
                    debugProtection: false,
                    deadCodeInjection: true,
                    stringArrayEncoding: "rc4",
                }))
                //.pipe(header.apply(null, note))
                .pipe(gulp.dest(destDir));
        },

        //压缩 CSS
        mincss: function() {
            var src = ["./src/**/*.css"],
                noteNew = JSON.parse(JSON.stringify(note));

            noteNew[1].js = "";

            return gulp
                .src(src)
                .pipe(plumber({errorHandler:errrHandler}))
                .pipe(cssmin({
                    advanced: false,        //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
                    compatibility: 'ie7',   //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
                    keepBreaks: false,      //类型：Boolean 默认：false [是否保留换行]
                    keepSpecialComments: '*' //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
                }))    
                //.pipe(header.apply(null, noteNew))
                .pipe(gulp.dest(destDir));
        },

        //压缩 HTML
        minhtml: function() {
            var src = ["./src/views/**/*.html"];
            
            return gulp
                .src(src)
                .pipe(plumber({errorHandler:errrHandler}))
                .pipe(htmlmin({
                        removeComments: true, //清除HTML注释
                        collapseWhitespace: true, //压缩HTML
                        minfyJS: true, //压缩JS
                        minfyCss: true //压缩CSS
                    }))
                .pipe(gulp.dest(destDir));
        },

        //复制文件夹
        mv: function() {
            gulp.src("./src/config.js").pipe(gulp.dest(destDir));

            gulp.src("./src/lib/extend/echarts.js").pipe(
                gulp.dest(destDir + "/lib/extend")
            );

            gulp.src("./src/lib/extend/formSelects.js").pipe(
                gulp.dest(destDir + "/lib/extend")
            );

            gulp.src("./src/style/res/**/*").pipe(
                gulp.dest(destDir + "/style/res")
            );

            return gulp
                .src("./src/views/**/*")
                .pipe(gulp.dest(destDir + "/views"));
        }
    };

//清理
gulp.task("clear", function(cb) {
    return del(["./dist/*"], cb);
});

gulp.task("minjs", task.minjs);
gulp.task("mincss", task.mincss);
gulp.task("minhtml", task.minhtml);
gulp.task("mv", task.mv);

//构建核心源文件
gulp.task("default", ["clear"], function() {
    //命令：gulp
    for (var key in task) {
        task[key]();
    }
});