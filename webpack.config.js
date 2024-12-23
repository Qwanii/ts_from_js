process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.TARGET = process.env.TARGET || 'web'


console.log(`TARGET: ${process.env.TARGET}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';
const isWeb = process.env.TARGET === 'web';
const isNode = process.env.TARGET === 'node';
const target = process.env.TARGET;

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

let config = {
    name: target,
    target: target,
    context: path.join(__dirname, '/src'), // Директория с исходным кодом приложения
    entry: `index.${target}.tsx`, // Главный файл приложения
    output: {
      path: path.join(__dirname, 'dist', target), // Куда делать оброку
      filename: '[name].js', // Шаблон для названия файлов
      clean: true, // Очистить ./dist перед сборкой
      library: {
        name: 'Root',
        type: isNode ? 'commonjs2' : 'window',
        export: 'default',
      }
    },
    mode: process.env.NODE_ENV,
    resolve: {
      extensions: ['.js', '.jsx', ".ts", ".tsx"], // расширения по умолчанию если не указаны в import
      modules: ['./', 'node_modules'], // Где искать файлы подключаемых модулей (пакетов)
    },
    module: {
      rules: [
        // Транспиляция JS/JSX
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [{loader: 'babel-loader'}],
        },
        // Правила обработки подключаемых файлов
        {
          test: /\.css$/,
          use: [
            {loader: MiniCssExtractPlugin.loader, options: {}},
            {loader: 'css-loader', options: {url: true, import: true}},
          ],
        },
        //транспилируем tsx/js
        {
          test: /\.(ts|tsx)$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin(), // Плагин для вытаскивания собранных стилей в отдельный файл

      // new HtmlWebPackPlugin({
      //   template: './index.html',
      //   filename: './index.html',
      //   title: 'Simple SPA',
      //   base: '/',
      // }),


      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          TARGET: JSON.stringify(process.env.TARGET),
          IS_WEB: process.env.TARGET === 'web',
          IS_NODE: process.env.TARGET === 'node',
        },
      }),
    ],
  }
;

if(isWeb) {
  config.plugins.push(
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: './index.html',
      title: 'Simple SPA',
      base: '/'
    })
  )
}

if (isDevelopment && isWeb) {
  config.devtool = 'inline-source-map';
  config.devServer = {
    static: path.join(__dirname, 'dist'),
    port: 8011,
    historyApiFallback: true,
    proxy: [
      {
        context: '/api/**',
        target: 'http://query.rest',
        secure: false,
        changeOrigin: true,
      },
    ],
  };
}

module.exports = config;
