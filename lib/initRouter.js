const fs = require('fs')
const handlebars = require('handlebars')
const chalk = require('chalk')


module.exports = async () => {

    //获取列表
    const list = fs.readdirSync('./src/views')
        .map(fileName => {
            return {
                name: fileName.replace('.vue', '').toLowerCase(),
                file: fileName
            }
        })

    //生成路由定义
    compile({list}, './src/router.js', './src/template/router.js.hbs')

    //生成菜单
    compile({list}, './src/App.vue', './src/template/App.vue.hbs')

}

/**
 * 模版编译
 * @param meta 数据定义
 * @param filepath 目标文件
 * @param templatePath 模版文件
 */
function compile(meta, filepath, templatePath) {
    if (fs.existsSync(templatePath)) {
        const content = fs.readFileSync(templatePath).toString()
        const result = handlebars.compile(content)(meta)
        fs.writeFileSync(filepath, result)
        console.log(`${filepath}创建成功`)
    }
}