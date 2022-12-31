import { EffectModel } from '../impact/effect.model'
import { StatusEffectModel } from '../impact/status-effect.model'

export interface AbilityModel {
  abilityId: string
  name: string
  description: string

  castTime: number
  cooldownTime: number

  effect: EffectModel
  statusEffect: StatusEffectModel
}
