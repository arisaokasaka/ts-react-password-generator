import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Label from './index'

test('displays title and count', () => {
  render(<Label title={'Test Title'} count={'2'} />)
  expect(screen.getByText('Test Title')).toBeInTheDocument()
  expect(screen.getByText('2')).toBeInTheDocument()
})
