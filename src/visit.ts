import { Root, Parent, Content } from 'ts-mdast'

type Callback = (node: Content, index: number, parent: Parent | Content) => void

export default function visit(tree: Root, callback: Callback) {
  if (tree && tree.children && Array.isArray(tree.children)) {
    handle(tree.children, tree, callback)
  }
}

function handle(tree: Content[], parent: Parent | Content, callback: Callback) {
  tree.forEach((item, index) => {
    callback(item, index, parent)
    if (item && Array.isArray(item.children)) {
      handle(item.children, item, callback)
    }
  })
}