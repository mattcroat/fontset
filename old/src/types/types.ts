import type characterTable from '@root/data/characterTable.json'
import { weightNames } from '@root/src/utils/helpers'

export interface Font {
  family: string
  category: string
  weights: string[]
  axes: {
    tag: string
    min: number
    max: number
    defaultValue: number
  }[]
}

export interface WeightNames {
  [key: string]: string
}

export type WeightSizes = keyof typeof weightNames

export type CharacterTable = typeof characterTable
