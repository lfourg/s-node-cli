#!/usr/bin/env node
// 指定解析器
const program = require('commander')   //node.js命令行界面的完整解决方案
program.version(require('../package.json').version)

program
    .command('init <name>')
    .description('init project')
    .action((name)=>{
        require('../lib/init.js')(name)})

program
    .command('initRouter')
    .description('init Router')
    .action(require('../lib/initRouter.js'))

//process 对象是一个全局变量，它提供当前 Node.js 进程的有关信息，以及控制当前 Node.js 进程。 因为是全局变量，所以无需使用 require()。
// process.argv 属性返回一个数组，这个数组包含了启动Node.js进程时的命令行参数
program.parse(process.argv)  //解析命令行参数，注意这个方法一定要放到最后调用