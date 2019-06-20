const BASE_URL = process.env.NODE_ENV === 'production' ? '/dist' : '/'

module.exports={
    publicPath: BASE_URL,
    assetsDir: 'assets',
    outputDir: 'dist',
    productionSourceMap:false,
    devServer: {
        port:'4567',
        proxy: {
            '/api': {
                target: 'http://192.168.0.110:4567', 
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}