module.exports = function(content) {
    // 这种方法会导致图片之类的资源没办法处理等问题所以采用了pitch方法
    // const script = `
    //     const style = document.createElement('style');
    //     style.innerHTML = ${JSON.stringify(content)};
    //     document.head.appendChild(style);
    // `;
    // return script;
}

module.exports.pitch = function(remainingRequest, precedingRequest, data) {
    console.log('style-loader');
    // remainingRequest是当前loader的请求路径，分为两个部分，前面的是当前loader的路径，后面的是当前loader的请求路径
    // 这里注意要使用箭头函数，否则this指向会有问题
    const relativePath = remainingRequest.split('!').map(absolutePath => {
        // 把绝对路径转换成相对路径
        // 这里的this指向loaderContext，contextify方法接收两个参数，第一个是上下文，第二个是路径，返回一个相对路径
        return this.utils.contextify(this.context, absolutePath);
    }).join('!');
    // 引入css-loader处理后的资源
    // 创建一个script标签，将css-loader处理后的资源插入到head标签中
    // 这里的!!是为了防止webpack对css-loader处理后的资源进行处理，因为css-loader处理后的资源是一个js模块
    // 虽然熔断了，但是通过import style from "!!${JSON.stringify(relativePath)}";可以让webpack对css-loader处理后的资源进行处理
    const script = `
        import style from "!!${relativePath}";
        const styleEl = document.createElement('style');
        styleEl.innerHTML = style;
        document.head.appendChild(styleEl);
    `;
    // 熔断loader
    return script;
}