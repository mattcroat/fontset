import type languages from '@root/src/data/character-table.json'
import type { weightLabel } from '@root/src/utils/helpers'

export type WeightType = keyof typeof weightLabel

export type LanguageType = keyof typeof languages
