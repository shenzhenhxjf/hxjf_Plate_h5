export default {
    plugins: {
        'postcss-pxtorem': {
            rootValue: 16, // 1rem = 16px (基准值)
            propList: ['*'], // 所有属性都转换
            unitPrecision: 5, // 转换后rem的小数位数
            replace: true, // 直接替换px，不保留备用值
            mediaQuery: true, // 媒体查询中的px也转换
            minPixelValue: 1, // 最小值，小于此值的px不转换
            exclude: /node_modules/i, // 排除node_modules目录
        },
    },
}
