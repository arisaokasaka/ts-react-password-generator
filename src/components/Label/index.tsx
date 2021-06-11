import React from 'react'

interface Props {
  title: string
  count?: string
}

const Label: React.FC<Props> = ({ title, count }) => {
  return (
    <label className="block text-gray-500 text-sm font-bold">
      {title}
      {count && (
        <span>
          :&nbsp;<span className="text-white">{count}</span>
        </span>
      )}
    </label>
  )
}

export default Label
