import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { FullpageContainer, ScrollContent, Page, FixedContent } from '../src'

describe('FullpageContainer', () => {
  it('renders children correctly', () => {
    render(
      <FullpageContainer>
        <ScrollContent>
          <Page index={0}>
            <div data-testid='page-1'>Page 1</div>
          </Page>
          <Page index={1}>
            <div data-testid='page-2'>Page 2</div>
          </Page>
        </ScrollContent>
        <FixedContent>
          <div data-testid='fixed-content'>Fixed content</div>
        </FixedContent>
      </FullpageContainer>,
    )

    const page1 = screen.getByTestId('page-1')
    const page2 = screen.getByTestId('page-2')
    const fixedContent = screen.getByTestId('fixed-content')
    expect(page1).toBeInTheDocument()
    expect(page2).toBeInTheDocument()
    expect(fixedContent).toBeInTheDocument()
  })
})
