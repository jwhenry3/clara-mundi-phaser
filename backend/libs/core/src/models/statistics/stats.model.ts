export interface EnergyModel {
  hp: number
  mp: number
}

export interface StatsModel extends EnergyModel {
  mHp: number
  mMp: number

  pAtk: number
  pAcc: number
  pDef: number
  pEva: number
  pSpd: number

  mAtk: number
  mAcc: number
  mDef: number
  mEva: number
  mSpd: number
}
