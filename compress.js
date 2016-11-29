// 管道流 - 管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。
var fs3 = require("fs");
// 创建一个可读流
var readerStream = fs3.createReadStream('input.txt');
// 创建一个可写流
var writerStream = fs3.createWriteStream('output.txt');
// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.pipe(writerStream);
console.log("程序执行完毕");


// 链式流 - 链式是通过连接输出流到另外一个流并创建多个对个流操作链的机制。链式流一般用于管道操作。
// 用管道和链式来压缩和解压文件。
var fs4 = require("fs");
var zlib = require('zlib');
// 压缩 input.txt 文件为 inputDecompress.txt.gz
fs4.createReadStream('inputDecompress.txt')
  .pipe(zlib.createGzip())
  .pipe(fs4.createWriteStream('input.txt.gz'));
console.log("文件压缩完成。");

var zlib = require('zlib');
// 解压 input.txt.gz 文件为 inputDecompress.txt
fs4.createReadStream('input.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs4.createWriteStream('inputDecompress.txt'));
console.log("文件解压完成。");
