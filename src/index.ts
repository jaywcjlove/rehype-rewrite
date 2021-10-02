import { Plugin } from 'unified';
import { Root, Element, ElementContent } from 'hast';
import { visit } from 'unist-util-visit';

export type RehypeRewriteOptions = (node: ElementContent, index: number | null, parent: Root | Element | null) => void;

const remarkRewrite: Plugin<[RehypeRewriteOptions?], Root> = (handle) => {
  return (tree: Root) => {
    visit(tree, (node, index, parent) => {
      if (handle && typeof handle === 'function') {
        handle(node as ElementContent, index, parent);
      }
    });
  }
}

export default remarkRewrite;
