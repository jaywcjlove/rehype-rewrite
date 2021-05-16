rehype-rewrite
---

[![NPM version](https://img.shields.io/npm/v/rehype-rewrite.svg?style=flat)](https://npmjs.org/package/rehype-rewrite)
[![Build](https://github.com/jaywcjlove/rehype-rewrite/actions/workflows/ci.yml/badge.svg)](https://github.com/jaywcjlove/rehype-rewrite/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/jaywcjlove/rehype-rewrite/badge.svg?branch=main)](https://coveralls.io/github/jaywcjlove/rehype-rewrite?branch=main)

Rewrite element with [rehype](https://github.com/rehypejs/rehype).

## Installation

```bash
npm i rehype-rewrite
yarn add rehype-rewrite
```

## Usage

```js
const rehype = require('rehype')
const rehypeRewrite = require('rehype-rewrite')
const stringify = require('rehype-stringify')

const html = `<h1>header</h1>`;
const htmlStr = rehype()
  .data('settings', { fragment: true })
  .use(rehypeRewrite, (node, index, parent) => {
    if(node.type == 'text' && node.value == 'header') {
      node.value = ''
    }
  })
  .use(stringify)
  .processSync(html)
  .toString()
```

> ```html
> <h1>header</h1>
> ```
> Output: 
> 
> ```html
> <h1></h1>
> ```
> 


```js
const rehype = require('rehype')
const rehypeRewrite = require('rehype-rewrite')
const stringify = require('rehype-stringify')

const html = `<h1>header</h1>`;
const htmlStr = rehype()
  .use(rehypeRewrite, (node) => {
    if (node.type == 'element' && node.tagName == 'body') {
      node.properties = { ...node.properties, style: 'color:red;'}
    }
  })
  .use(stringify)
  .processSync(html)
  .toString()
```

> ```html
> <h1>header</h1>
> ```
> Output: 
> 
> ```html
> <html><head></head><body style="color:red;"><h1>header</h1></body></html>
> ```
> 

```js
const rehype = require('rehype')
const rehypeRewrite = require('rehype-rewrite')
const stringify = require('rehype-stringify')

const html = `<h1>hello</h1>`;
const htmlStr = rehype()
  .data('settings', { fragment: true })
  .use(rehypeRewrite, (node) => {
    if (node.type == 'element' && node.tagName == 'h1') {
      node.children = [ ...node.children, {
        type: 'element',
        tagName: 'span',
        properties: {},
        children: [
          {type: 'text', value: ' world'}
        ]
      }]
    }
  })
  .use(stringify)
  .processSync(html)
  .toString()
```

> ```html
> <h1>hello</h1>
> ```
> Output: 
> 
> ```html
> <h1>hello<span> world</span></h1>
> ```
> 

```js
const unified = require("unified");
const remarkParse = require('remark-parse')
const remark2rehype = require('remark-rehype')
const rehypeRaw = require('rehype-raw')
const rehypeRewrite = require('rehype-rewrite')
const stringify = require('rehype-stringify')

const html = `<h1>hello</h1>`;
const htmlStr = unified()
  .use(remarkParse)
  .use(remark2rehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeRewrite, (node) => {
    if (node.type == 'element' && node.tagName == 'p') {
      node.properties = { ...node.properties, style: 'color:red;' }
    }
  })
  .use(stringify)
  .processSync(html)
  .toString()
```

> ```html
> <h1>hello</h1>
> ```
>
> Output: 
> 
> ```html
> <p style="color:red;">Hello World!</p>
> ```
> 

## Related

- [`rehype-attr`](https://github.com/jaywcjlove/rehype-attr) New syntax to add attributes to Markdown.
- [`rehypejs`](https://github.com/rehypejs/rehype) HTML processor powered by plugins part of the @unifiedjs collective
- [`remark-parse`](https://www.npmjs.com/package/remark-parse) remark plugin to parse Markdown
- [`remark-rehype`](https://www.npmjs.com/package/remark-rehype) remark plugin to transform to rehype
- [`rehype-raw`](https://www.npmjs.com/package/rehype-raw) rehype plugin to reparse the tree (and raw nodes)
- [`rehype-stringify`](https://www.npmjs.com/package/rehype-stringify) rehype plugin to serialize HTML

## License

MIT © [Kenny Wong](https://github.com/jaywcjlove)