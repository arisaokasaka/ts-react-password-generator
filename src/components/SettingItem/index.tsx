import React from 'react'

interface Props {
  title: string
  onOff: boolean
  handleClick?: () => void
}

interface ClassNameCategoriesOfButton {
  default: string
  on: string
  off: string
}

interface ClassNameOfButton {
  background: ClassNameCategoriesOfButton
  circle: ClassNameCategoriesOfButton
}

const SettingItem: React.FC<Props> = ({ title, onOff, handleClick }) => {
  const classNamesOfButton: ClassNameOfButton = {
    background: {
      default: 'block w-14 h-8 rounded-2xl relative cursor-pointer ',
      on: 'bg-blue-700 justify-content-end',
      off: 'bg-gray-800',
    },
    circle: {
      default:
        'block w-7 h-7 bg-white rounded-2xl mx-1 absolute transform top-1/2 -translate-y-1/2 cursor-pointer ',
      on: 'left-5',
      off: '',
    },
  }

  return (
    <div className="bg-gray-700 h-12 mb-2 px-2 flex justify-between items-center rounded">
      <a>{title}</a>
      <span
        className={
          onOff
            ? classNamesOfButton.background.default +
              classNamesOfButton.background.on
            : classNamesOfButton.background.default +
              classNamesOfButton.background.off
        }
        onClick={handleClick}>
        <span
          className={
            onOff
              ? classNamesOfButton.circle.default + classNamesOfButton.circle.on
              : classNamesOfButton.circle.default +
                classNamesOfButton.circle.off
          }></span>
      </span>
    </div>
  )
}

export default SettingItem
