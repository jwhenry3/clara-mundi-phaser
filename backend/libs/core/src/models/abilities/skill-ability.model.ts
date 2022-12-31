import { SkillType } from '../skill/skill-type.enum'

export interface SkillAbility {
  skill: SkillType
  skillLevel: number
  abilityId: string
}
