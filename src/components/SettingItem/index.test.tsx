import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SettingItem from './index'

test('displays Title', () => {
  render(<SettingItem title={'Test Title'} onOff={false} />)
  expect(screen.getByText('Test Title')).toBeInTheDocument()
})
