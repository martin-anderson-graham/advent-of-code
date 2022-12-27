import { DLL} from "./utils"

const performMixing = (q: DLL): void => {
  let originalNodeOrder = q.getRNodeArray()
  originalNodeOrder.forEach(node => {
      q.moveNode(node)
  })
}

export {
    performMixing
}
