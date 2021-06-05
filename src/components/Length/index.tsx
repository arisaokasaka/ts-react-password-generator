import React from 'react'

interface Props {
  initialValue: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  styles?: string
}

const Length: React.FC<Props> = ({ initialValue, handleChange, styles }) => {
  return (
    <div className={styles}>
      <input
        type="range"
        name="length"
        min="4"
        max="32"
        step="1"
        className="w-full"
        value={initialValue}
        onChange={handleChange}
      />
    </div>
  )
}

export default Length
