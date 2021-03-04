const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function override(config, env) {
    if (!config.plugins) {
        config.plugins = [];
    }

    /*
    config.rules.push({
        test: /\.(png|gif|jpe?g|svg|ico)$/,
        include: includePaths,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'images/[name]-[hash].[ext]'
          }
        }
    );

    config.plugins.push(
        new CopyWebpackPlugin([{from: 'src/assets/', to: 'public'}])
    );
    */

    return config;
}