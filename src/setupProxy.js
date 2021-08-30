const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
// import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express();

module.exports = function _proxy(app) {
    app.use(
        // 这里必须写子路径，直接写根路径（"/"）会报错
        createProxyMiddleware('/api', {
            target: 'http://127.0.0.1:9002',
            secure: false,
            changeOrigin: true
        })
    );
};
