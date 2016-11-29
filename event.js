//event.js文件
// event 对象注册了事件 some_event 的一个监听器，
// 然后我们通过 setTimeout 在 1000 毫秒以后向 event 对象发送事件 some_event，此时会调用some_event 的监听器。
var EventEmitter = require('events').EventEmitter; 
var event = new EventEmitter(); 
event.on('some_event', function() { 
	console.log('some_event 事件触发'); 
}); 
setTimeout(function() { 
	event.emit('some_event'); 
}, 1000); 



// EventEmitter 支持 若干个事件监听器。
/*
当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。
EventEmitter 提供了多个属性，如 on 和 emit。on 函数用于绑定事件函数，emit 属性用于触发一个事件。
*/
event.on('someEvent', function(arg1, arg2) { 
	console.log('listener1', arg1, arg2); 
}); 
event.on('someEvent', function(arg1, arg2) { 
	console.log('listener2', arg1, arg2); 
}); 
event.emit('someEvent', 'arg1 参数', 'arg2 参数');

// once(event, listener) - 为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器。
event.once('connection', function (stream) {
  console.log('Ah, we have our first user!');
});
event.emit('connection');



// 通过 connection（连接）事件演示了 EventEmitter 类的应用
var events = require('events');
var eventEmitter = new events.EventEmitter();

// 监听器 #1
var listener1 = function listener1() {
   console.log('监听器 listener1 执行。');
}
// 监听器 #2
var listener2 = function listener2() {
  console.log('监听器 listener2 执行。');
}

// 绑定 connection 事件，处理函数为 listener1 
eventEmitter.addListener('connection', listener1);
// 绑定 connection 事件，处理函数为 listener2
eventEmitter.on('connection', listener2);

var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " 个监听器监听连接事件。");

// 处理 connection 事件 
eventEmitter.emit('connection');

// 移除监绑定的 listener1 函数
eventEmitter.removeListener('connection', listener1);
console.log("listener1 不再受监听。");

// 触发连接事件
eventEmitter.emit('connection');

eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " 个监听器监听连接事件。");
console.log("程序执行完毕。");


// 错误处理
// var events = require('events'); 
// var emitter = new events.EventEmitter(); 
// emitter.emit('error'); 


// 创建 Buffer 类
// 创建长度为 10 字节的 Buffer 实例
var buf1 = new Buffer(10);
// 通过给定的数组创建 Buffer 实例
var buf2 = new Buffer([10, 20, 30, 40, 50]);
// 通过一个字符串来创建 Buffer 实例
var buf3 = new Buffer("hah", "utf-8");

// 写入缓冲区
len = buf1.write("hh");
console.log("写入字节数 : "+  len);
// 从缓冲区读取数据
buf = new Buffer(26);
for (var i = 0 ; i < 26 ; i++) {
  buf[i] = i + 97;
}
console.log( buf.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log( buf.toString('ascii',0,5));   // 输出: abcde
console.log( buf.toString('utf8',0,5));    // 输出: abcde
console.log( buf.toString(undefined,0,5)); // 使用 'utf8' 编码, 并输出: abcde

// 将 Buffer 转换为 JSON 对象
var buf2 = new Buffer('apple');
var json = buf.toJSON(buf);
console.log(json);



// Stream(流)  从流中读取数据
var fs = require("fs");
var data = '';

// 创建可读流
var readerStream = fs.createReadStream('input.txt');

// 设置编码为 utf8。
readerStream.setEncoding('UTF8');

// 处理流事件 --> data, end, and error
readerStream.on('data', function(chunk) {
   data += chunk;
});

readerStream.on('end',function(){
   console.log(data);
});

readerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("程序执行完毕");


// 写入流
// 程序会将 data 变量的数据写入到 output.txt 文件中
var fs2 = require("fs");
var data = '曾经沧海难为水';
// 创建一个可以写入的流，写入到文件 output.txt 中
var writerStream = fs2.createWriteStream('output.txt');

// 使用 utf8 编码写入数据
writerStream.write(data,'UTF8');
// 标记文件末尾
writerStream.end();
