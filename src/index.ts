import { Root, Parent, Content } from 'ts-mdast'
import { Plugin } from 'unified'
import visit from './visit'

export type MdastTransformer = (tree: Root) => void
export type RemarkRewriteHandle = (node: Content, index: number, parent: Parent) => Content

const remarkRewrite: Plugin<[RemarkRewriteHandle?]> = (handle): MdastTransformer =>{
  return (tree: Root) => {
    visit(tree, (node: Content, index: number, parent: Parent) => {
      if (handle && typeof handle === 'function') {
        handle(node, index, parent)
      }
    })
  }
}

export default remarkRewrite
