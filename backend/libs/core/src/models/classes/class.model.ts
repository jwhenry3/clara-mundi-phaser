import { ElementalModel } from '../statistics/elemental.model'
import { StatsModel } from '../statistics/stats.model'

export interface ClassModel {
  classId: string
  name: string

  baseElements: ElementalModel
  baseStats: StatsModel
  elementsGrowthPerLevel: ElementalModel
  statGrowthPerLevel: StatsModel
}
