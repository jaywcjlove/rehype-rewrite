import { Plugin, Transformer } from 'unified';
import { Parent, NodeData, Node } from 'unist';
import { visit } from './visit.js';

export * from './visit.js';

export type RehypeRewriteOptions = (node: NodeData<Parent>, index: number, parent: NodeData<Parent>) => void

const remarkRewrite: Plugin<[RehypeRewriteOptions?]> = (handle): Transformer => {
  return transformer;
  function transformer(tree: Node<NodeData<Parent>>): void {
    visit(tree as any, (node: NodeData<Parent>, index: number, parent: NodeData<Parent>) => {
      if (handle && typeof handle === 'function') {
        handle(node, index, parent)
      }
    })
  }
}

export default remarkRewrite
