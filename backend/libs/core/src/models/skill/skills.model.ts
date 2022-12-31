import { SkillType } from './skill-type.enum'

export type SKillLevelsModel = {
  [key in SkillType]?: number
}
