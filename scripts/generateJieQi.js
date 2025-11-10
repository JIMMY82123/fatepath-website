#!/usr/bin/env node

/**
 * 预生成节气数据表
 *
 * 输出格式：
 * {
 *   "1900": {
 *     "小寒": "1900-01-05T16:23:00.000Z",
 *     ...
 *   },
 *   ...
 * }
 */

const fs = require('fs')
const path = require('path')

const {
  LunarYear,
  Solar
} = require('lunar-javascript')

const START_YEAR = 1900
const END_YEAR = 2100
const OUTPUT_PATH = path.resolve(__dirname, '../src/data/jieqi.json')

/**
 * 将 Solar 对象转换为 ISO 字符串
 * @param {Solar} solar
 * @returns {string}
 */
const solarToISOString = (solar) => {
  if (!(solar instanceof Solar)) return null
  const year = solar.getYear()
  const month = solar.getMonth()
  const day = solar.getDay()
  const hour = solar.getHour?.() ?? 0
  const minute = solar.getMinute?.() ?? 0
  const second = solar.getSecond?.() ?? 0
  const date = new Date(Date.UTC(year, month - 1, day, hour, minute, second))
  return date.toISOString()
}

const generate = () => {
  const table = {}

  for (let year = START_YEAR; year <= END_YEAR; year++) {
    try {
      const lunarYear = LunarYear.fromYear(year)
      const jieQiMap = lunarYear.getJieQiTable()

      if (!jieQiMap) continue

      table[year] = {}

      const entries = jieQiMap instanceof Map
        ? Array.from(jieQiMap.entries())
        : Object.entries(jieQiMap)

      entries.forEach(([name, solar]) => {
        const iso = solarToISOString(solar)
        if (iso) {
          table[year][name] = iso
        }
      })
    } catch (error) {
      console.warn(`Failed to generate jieqi for year ${year}`, error)
    }
  }

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true })
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(table, null, 2), 'utf-8')
  console.log(`JieQi data generated: ${OUTPUT_PATH}`)
}

generate()

