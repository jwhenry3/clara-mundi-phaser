import { EffectModel, StatusEffectModel } from '@app/core'

export interface ItemConsumableModel {
  // status effect to apply if applicable
  status?: StatusEffectModel
  effect?: EffectModel

  consumeOnUse: boolean

  castTime: number
  cooldownTime: number
}
