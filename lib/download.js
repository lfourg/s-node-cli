const {promisify} = require('util')  //引入异步函数

/**
 *
 * @param repo 导出代码地址
 * @param desc 导入的文件夹
 * @returns {Promise<void>}
 */
module.exports.clone=async function (repo,desc) {
    const download = promisify(require('download-git-repo'))  //下载文件
    const ora = require('ora')  //进度条
    const process = ora(`文件下载中...${repo}`)  //定制进度条
    process.start()  //启动进度条
    await download(repo,desc)   //开始下载
    process.succeed()


}