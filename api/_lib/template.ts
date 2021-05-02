
import { readFileSync } from 'fs';
import marked from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64');

function getCss() {
    return `
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500&display=swap');

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
    }

    body {
        box-sizing: border-box;
        height: 100vh;
        width: 100%;
        margin: 0;
        background: #FFF;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 50px;
        background: #C9CCD3;
        background-image: linear-gradient(-180deg, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%);
        background-blend-mode: lighten;
    }

    .main {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-radius: 10px;
        padding: 50px;
        box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.25);
        background: #FFF;
        position: relative;
    }

    .title {
        font-family: 'Noto Sans JP', 'Inter', sans-serif;
        font-style: normal;
        font-size: 48px;
        line-height: 1.5;
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        -webkit- transform: translateY(-50%) translateX(-50%);
        width: 80%;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, md } = parsedReq;
    return `
    <!DOCTYPE html>
    <html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss()}
    </style>
    <body>
        <div class="main">
            <div class="title">${emojify(
                md ? marked(text) : sanitizeHtml(text)
            )}
            </div>
            <div></div>
        </div>
    </body>
    </html>
`;
}