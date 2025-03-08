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

        // environment是同步串行钩子 SyncHook
        compiler.hooks.environment.tap('TestPlugin', () => {
            console.log('TestPlugin environment')
        })

        // emit是异步串行钩子 AsyncSeriesHook
        compiler.hooks.emit.tap('TestPlugin', (compilation) => {
            console.log('TestPlugin emit')
        })

        compiler.hooks.emit.tapAsync('TestPlugin', (compilation, callback) => {
            setTimeout(() => {
                console.log('TestPlugin emitAsync')
                callback();
            }, 2000)
        })

        compiler.hooks.emit.tapPromise('TestPlugin', (compilation) => {
            console.log('TestPlugin emitPromise')
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('TestPlugin emitPromise')
                    resolve();
                }, 1000)
            })
        })

        // make是异步并行钩子 AsyncParallelHook
        compiler.hooks.make.tapAsync('TestPlugin', (compilation, callback) => {
            setTimeout(() => {
                console.log('TestPlugin makeAsync 111')
                callback();
            }, 3000)
        })

        compiler.hooks.make.tapAsync('TestPlugin', (compilation, callback) => {
            setTimeout(() => {
                console.log('TestPlugin makeAsync 222')
                callback();
            }, 1000)
        })

        compiler.hooks.make.tapAsync('TestPlugin', (compilation, callback) => {
            setTimeout(() => {
                console.log('TestPlugin makeAsync 333')
                callback();
            }, 2000)
        })
    }
}

module.exports = TestPlugin;