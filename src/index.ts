import { Plugin } from 'unified';
import { Root, Element, RootContent } from 'hast';
import { visit } from 'unist-util-visit';
import { selectAll } from 'hast-util-select';
import { Test } from 'unist-util-is';

export type RehypeRewriteOptions = {
  selector?: string;
  rewrite(node: Root | RootContent, index: number | null, parent: Root | Element | null): void;
}

const remarkRewrite: Plugin<[RehypeRewriteOptions?], Root> = (options) => {
  const { selector, rewrite } = options || {};
  return (tree) => {
    if (!rewrite || typeof rewrite !== 'function') return;
    if (selector && typeof selector === 'string') {
      const selected = selectAll(selector, tree);
      if (selected && selected.length > 0) {
        visit(tree, selected as unknown as Test, (node: Element, index, parent) => {
          rewrite(node, index, parent);
        });
      }
      return;
    }

    visit(tree, (node: Root | RootContent, index, parent) => {
      rewrite(node, index, parent);
    });
  }
}

export default remarkRewrite;
