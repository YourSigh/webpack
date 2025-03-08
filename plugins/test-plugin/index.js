/**
 * 1.webpack会加载所有配置，此时会进行new TestPlugin()
 * 2.创建一个compiler对象
 * 3.遍历所有插件，调用apply方法
 * 4.继续执行编译流程，触发各个hooks
 */

class TestPlugin {
    constructor(options) {
        console.log('TestPlugin constructor')
        this.options = options;
    }
    

    apply(compiler) {
        console.log('TestPlugin apply')
        compiler.hooks.environment.tap('TestPlugin', () => {
            console.log('TestPlugin environment')
        })
    }
}

module.exports = TestPlugin;