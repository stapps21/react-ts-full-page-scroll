import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import { FullpageContainer, Page, ScrollContent } from '../src'

describe('Common render', () => {
  it('renders without crashing', () => {
    render(
      <FullpageContainer>
        <ScrollContent>
          <Page index={0}>1</Page>
          <Page index={1}>2</Page>
        </ScrollContent>
      </FullpageContainer>,
    )
  })
})
