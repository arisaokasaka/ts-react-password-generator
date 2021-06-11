import React, { useState } from 'react'
import Label from '../Label'
import SettingItem from '../SettingItem'
import Length from '../Length'

interface SettingItem {
  length: string
  upperCase: boolean
  lowerCase: boolean
  numbers: boolean
  symbols: boolean
}

type ARandomNumber = (arg: number) => number
type GeneratePassword = () => string
type CopyPassword = () => void

const Container: React.FC = () => {
  const stringUpperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const stringLowerCase = 'abcdefghijklmnopqrstuvwxyz'
  const stringNumbers = '1234567890'
  const stringSymbols = "!#$%&'()-^@[;:],./=~|`{+*}<>?"
  const [generatedPassword, setGeneratedPassword] = useState<string>('')
  const [showTooltip, setShowTooltip] = useState<boolean>(false)
  const [noSettingMessage, setNoSettingMessage] = useState<boolean>(false)
  const [setting, setSetting] = useState<SettingItem>({
    length: '4',
    upperCase: true,
    lowerCase: true,
    numbers: true,
    symbols: false,
  })

  const aRandomNumber: ARandomNumber = (max) => {
    return Math.floor(Math.random() * max)
  }

  const generatePassword: GeneratePassword = () => {
    let resources = ''
    let tmp_result = ''
    let result = ''
    setNoSettingMessage(false)

    if (
      setting.upperCase == false &&
      setting.lowerCase == false &&
      setting.numbers == false &&
      setting.symbols == false
    ) {
      setNoSettingMessage(true)
      return ''
    }

    // 設定された文字は最低１つ含める
    if (setting.upperCase) {
      tmp_result += stringUpperCase[aRandomNumber(stringUpperCase.length - 1)]
      resources += stringUpperCase
    }
    if (setting.lowerCase) {
      tmp_result += stringLowerCase[aRandomNumber(stringLowerCase.length - 1)]
      resources += stringLowerCase
    }
    if (setting.numbers) {
      tmp_result += stringNumbers[aRandomNumber(stringNumbers.length - 1)]
      resources += stringNumbers
    }
    if (setting.symbols) {
      tmp_result += stringSymbols[aRandomNumber(stringSymbols.length - 1)]
      resources += stringSymbols
    }

    // 設定された文字数を除いた分の文字をランダムに選ぶ
    const originalTmpResultLength = tmp_result.length
    for (
      let i = 1;
      i <= Number(setting.length) - originalTmpResultLength;
      i++
    ) {
      tmp_result += resources[aRandomNumber(resources.length - 1)]
    }

    // 結果に使用する文字列をランダムにする
    for (let i = 1; i <= Number(setting.length); i++) {
      const _randomIndex = aRandomNumber(tmp_result.length - 1)
      result += tmp_result[_randomIndex]
      tmp_result =
        tmp_result.substring(0, _randomIndex) +
        tmp_result.substring(_randomIndex + 1, tmp_result.length)
    }

    return result
  }

  const copyPassword: CopyPassword = () => {
    navigator.clipboard.writeText(generatedPassword)
    setShowTooltip(true)
    setTimeout(() => setShowTooltip(false), 800)
  }

  return (
    <div className="px-2">
      <div className="bg-gray-900 shadow overflow-hidden rounded-lg mt-8 max-w-md m-auto px-4 py-7 text-white">
        <h1 className="text-2xl">Password Generator</h1>
        {noSettingMessage && (
          <p className="text-yellow-300 mt-2">
            Please select settings at least one!
          </p>
        )}
        <div className="relative">
          <input
            className="rounded py-2 w-full font-bold h-12 mt-6 mb-6 px-2 text-black outline-none"
            value={generatedPassword}
            placeholder="Generated Password comes here!"
            readOnly
          />
          {showTooltip && (
            <div className="absolute -right-5 -top-2 z-10">
              <div className="relative mx-2">
                <div className="bg-gray-500 text-white text-sm rounded py-2 px-2 right-0 bottom-full">
                  {generatedPassword ? 'COPIED!' : 'No Password!'}
                  <svg
                    className="absolute block text-gray-500 h-2 w-full left-0 top-full"
                    x="0px"
                    y="0px"
                    viewBox="0 0 255 255"
                    xmlSpace="preserve">
                    <polygon
                      className="fill-current text-gray-500 "
                      points="0,0 127.5,127.5 255,0"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}
          <button
            className="absolute h-12 w-10 rounded top-1/4 right-0 text-gray-500 hover:text-gray-800 focus:outline-none bg-white"
            onClick={copyPassword}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
          </button>
        </div>
        <Label title="LENGTH" count={setting.length} />
        <Length
          initialValue={setting.length}
          handleChange={(e) =>
            setSetting({ ...setting, length: e.target.value })
          }
          styles="mb-3"
        />
        <Label title="SETTING" />
        <SettingItem
          title="Include UpperCase"
          onOff={setting.upperCase}
          handleClick={() =>
            setting.upperCase
              ? setSetting({ ...setting, upperCase: false })
              : setSetting({ ...setting, upperCase: true })
          }
        />
        <SettingItem
          title="Include LowerCase"
          onOff={setting.lowerCase}
          handleClick={() =>
            setting.lowerCase
              ? setSetting({ ...setting, lowerCase: false })
              : setSetting({ ...setting, lowerCase: true })
          }
        />
        <SettingItem
          title="Include Numbers"
          onOff={setting.numbers}
          handleClick={() =>
            setting.numbers
              ? setSetting({ ...setting, numbers: false })
              : setSetting({ ...setting, numbers: true })
          }
        />
        <SettingItem
          title="Include Symbols"
          onOff={setting.symbols}
          handleClick={() =>
            setting.symbols
              ? setSetting({ ...setting, symbols: false })
              : setSetting({ ...setting, symbols: true })
          }
        />
        <button
          className="block bg-gradient-to-r from-green-400 to-blue-700 rounded py-2 w-full font-bold h-12 mt-6 focus:outline-none"
          onClick={() => setGeneratedPassword(generatePassword)}>
          {generatedPassword ? 'GENERATE PASSWORD AGAIN' : 'GENERATE PASSWORD'}
        </button>
      </div>
    </div>
  )
}

export default Container
