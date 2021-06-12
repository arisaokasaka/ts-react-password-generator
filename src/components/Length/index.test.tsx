import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Length from './index'

test('function is to be called', async () => {
  const handleChangeMock = jest.fn
  render(<Length initialValue={'2'} handleChange={handleChangeMock} />)
  await fireEvent.click(screen.getByRole('slider'))
  expect(handleChangeMock).toBeCalled
})
