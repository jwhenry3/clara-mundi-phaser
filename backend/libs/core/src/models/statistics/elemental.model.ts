import { Elements } from './elements.enum'

export type ElementalModel = {
  [key in Elements]?: number
}
