import { Parent, NodeData } from 'unist';

export type VisitCallback = (node: NodeData<Parent>, index: number, parent: NodeData<Parent>) => void;
export function visit(tree?: NodeData<Parent>, callback?: VisitCallback) {
  if (tree && tree.children && Array.isArray(tree.children)) {
    handle(tree.children, tree, callback)
  }
}

function handle(tree: NodeData<Parent>[], parent: NodeData<Parent>, callback?: VisitCallback) {
  tree.forEach((item, index) => {
    if (callback) {
      callback(item, index, parent);
    }
    if (item && Array.isArray(item.children)) {
      handle(item.children, item, callback)
    }
  })
}