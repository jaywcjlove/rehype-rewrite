/// <reference types="jest" />
import { unified } from 'unified'
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import { rehype } from 'rehype';
import rehypeRaw from 'rehype-raw';
import stringify from 'rehype-stringify';
import rehypeRewrite from '..';

describe('rehype-rewrite test case', () => {
  it('remove text', async () => {
    const html = `<h1>header</h1>`;
    const expected = `<h1></h1>`
    const htmlStr = rehype()
      .data('settings', { fragment: true })
      .use(rehypeRewrite, (node) => {
        if(node.type == 'text' && node.value == 'header') {
          node.value = ''
        }
      })
      .use(stringify)
      .processSync(html)
      .toString()

      expect(htmlStr).toEqual(expected);
  });

  it('modify properties', async () => {
    const html = `<h1>header</h1>`;
    const expected = `<html><head></head><body style="color:red;"><h1>header</h1></body></html>`
    const htmlStr = rehype()
      .use(rehypeRewrite, (node: any) => {
        if (node.type == 'element' && node.tagName == 'body') {
          node.properties = { ...node.properties, style: 'color:red;'}
        }
      })
      .use(stringify)
      .processSync(html)
      .toString()

      expect(htmlStr).toEqual(expected);
  });

  it('add element', async () => {
    const html = `<h1>hello</h1>`;
    const expected = `<h1>hello<span> world</span></h1>`
    const htmlStr = rehype()
      .data('settings', { fragment: true })
      .use(rehypeRewrite, (node: any) => {
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
      
      expect(htmlStr).toEqual(expected);
  });

  it('use unified', async () => {
    const markdown = "Hello World!"
    const expected = `<p style="color:red;">Hello World!</p>`
    const htmlStr = unified()
      .use(remarkParse)
      .use(remark2rehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeRewrite, (node: any) => {
        if (node.type == 'element' && node.tagName == 'p') {
          node.properties = { ...node.properties, style: 'color:red;' }
        }
      })
      .use(stringify)
      .processSync(markdown)
      .toString()

      expect(htmlStr).toEqual(expected);
  });

  it('options parameter test', async () => {
    const markdown = "Hello World!"
    const expected = `Hello World!`
    const htmlStr = rehype()
      .data('settings', { fragment: true })
      .use(rehypeRewrite, {} as any)
      .use(stringify)
      .processSync(markdown)
      .toString()

      expect(htmlStr).toEqual(expected);
  });

});

