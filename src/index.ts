import { Plugin } from 'unified';
import { Root, Element, RootContent } from 'hast';
import { visit } from 'unist-util-visit';
import { selectAll } from 'hast-util-select';
import { Test } from 'unist-util-is';

export type RehypeRewriteOptions = {
  /**
   * Select an element to be wrapped. Expects a string selector that can be passed to hast-util-select ([supported selectors](https://github.com/syntax-tree/hast-util-select/blob/master/readme.md#support)).
   * If `selector` is not set then wrap will check for a body all elements.
   */
  selector?: string;
  /** Rewrite Element. */
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
