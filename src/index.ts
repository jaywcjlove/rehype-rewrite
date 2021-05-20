import { Root, Parent, Content } from 'ts-mdast'
import { Plugin } from 'unified'
import visit from './visit'

export type MdastTransformer = (tree: Root) => void
export type RehypeRewriteHandle = (node: Content, index: number, parent: Parent) => void

const remarkRewrite: Plugin<[RehypeRewriteHandle?]> = (handle): MdastTransformer =>{
  return (tree: Root) => {
    visit(tree, (node: Content, index: number, parent: Parent) => {
      if (handle && typeof handle === 'function') {
        handle(node, index, parent)
      }
    })
  }
}

export default remarkRewrite
