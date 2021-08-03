import type characterTable from '@root/src/data/character-table.json'
import type { weightNames } from '@root/src/utils/helpers'

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

export type WeightSizes = keyof typeof weightNames

export type CharacterTable = typeof characterTable
