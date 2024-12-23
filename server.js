const React = require('react')

const express = require('express');

const app = express();

// const timeout = require('connect-timeout')

const path = require('path');

const { renderToString } = require('react-dom/server');
const { Root } = require('./dist/node/main.js');

app.use(express.static(path.resolve(__dirname, './dist/web'), { index: false }));

app.get('*', function(request, response) {

    const result = Root();

    response.status(200).send(`
        <!doctype html>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <title>Simple SPA</title>
                <base href='/'>
                <script defer='defer' src='main.js'></script>
                <link href='main.css' rel='stylesheet'>
            </head>
            <body>
                <div id="root">${result.html}</div>
            </body>
            </html>
        `)
})

app.listen(3000)