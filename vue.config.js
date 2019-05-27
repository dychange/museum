const BASE_URL = process.env.NODE_ENV === 'production' ? '/dist' : '/'

module.exports={
    publicPath: BASE_URL,
    assetsDir: 'assets',
    outputDir: 'dist',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080', 
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}