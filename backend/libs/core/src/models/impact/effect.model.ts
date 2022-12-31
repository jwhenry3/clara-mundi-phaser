import { ElementalModel } from '../statistics/elemental.model'
import { FunctionalModel } from '../statistics/functional.model'
import { StatsModel } from '../statistics/stats.model'

export interface EffectModel {
  stats?: StatsModel
  elements?: ElementalModel
  functional?: FunctionalModel

  casterModifier?: StatsModel
  recipientModifier?: StatsModel
}
