const {promisify} = require('util')  //引入异步函数
const figlet = promisify(require('figlet'))  //引入炫酷的字体

const clear = require('clear')
const chalk = require('chalk')   //日志打印修饰一下，变成彩色
const log = content => console.log(chalk.green(content))

const {clone} = require('./download')
const open = require('open')

const spawn = async (...args) => {
    const {spawn} = require('child_process')  //原生包的子进程
    return new Promise(resolve => {
        const proc = spawn(...args)
        proc.stdout.pipe(process.stdout)  //子进程的输出流与主进程相对接  为了打印子进程的日志
        proc.stderr.pipe(process.stderr)  //错误流
        proc.on('close', () => {
            resolve()
        })
    })
}


module.exports = async name => {
    //打印欢迎界面
    clear()
    const data = await figlet('welcome')
    log(data)

    //clone
    log(`创建项目: ${name}`)
    await clone('github:lfourg/s-vue-router', name)

    //自动安装依赖
    log('安装依赖')
    /**
     * npm：要执行的命令，可以是cnpm...
     * []:所有参数放数组中
     * cwd: 在哪个目录下执行命令
     */
    await spawn('cnpm',['install'],{cwd:`./${name}`})
    log(`
     安装完成
     to get start:
     ---------------------------
            cd ${name}
            npm run serve
     ---------------------------
    `)

    //启动
    await  spawn('npm',['run','serve'],{cwd:`./${name}`})
    open('http://localhost:8080')


}