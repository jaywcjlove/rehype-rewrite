import { Plugin } from 'unified';
import { Root, Element } from 'hast';
import { Node, Data } from 'unist';
import { visit } from 'unist-util-visit';

export type RehypeRewriteOptions = (node: Node<Data>, index: number | null, parent: Root | Element | null) => void;

const remarkRewrite: Plugin<[RehypeRewriteOptions?], Root> = (handle) => {
  return (tree) => {
    visit(tree, (node, index, parent) => {
      if (handle && typeof handle === 'function') {
        handle(node, index, parent);
      }
    });
  }
}

export default remarkRewrite;
