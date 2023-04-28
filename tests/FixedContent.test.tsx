import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { FixedContent } from '../src'

describe('FixedContent', () => {
  it('renders children correctly', () => {
    render(<FixedContent>Fixed content</FixedContent>)

    const fixedContentText = screen.getByText('Fixed content')
    expect(fixedContentText).toBeInTheDocument()
  })
})
