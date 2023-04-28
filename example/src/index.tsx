import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { FixedContent, FullpageContainer, Page, ScrollContent, useFullpageContext } from 'react-ts-full-page-scroll'

const enum CHANGE_PAGE {
  PREVIOUS,
  NEXT,
}

const Header = () => {
  const { activePage } = useFullpageContext()

  return (
    <header>
      <div>Page: {activePage + 1}/4</div>
    </header>
  )
}

const ButtonFirstPage = () => {
  const { setActivePage } = useFullpageContext()

  return (
    <div className='btn' onClick={() => setActivePage(0)}>
      Go to first page
    </div>
  )
}

const ButtonChangePage = ({ changePage, text }: { changePage: CHANGE_PAGE; text: string }) => {
  const { activePage, setActivePage } = useFullpageContext()

  const nextPage = activePage + (changePage === CHANGE_PAGE.NEXT ? 1 : -1)

  return (
    <div className='btn' onClick={() => setActivePage(nextPage)}>
      {text}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FullpageContainer>
      <ScrollContent>
        <Page className='page' index={0}>
          <div>
            <h1>react-ts-full-page-scroll</h1>
            <h2>Use mousewheel, keyboard arrows, or touch to scroll</h2>
          </div>
        </Page>
        <Page className='page' index={1}>
          <div>
            <h1>PAGE 2</h1>
            <ButtonChangePage changePage={CHANGE_PAGE.NEXT} text='Next Page' />
          </div>
        </Page>
        <Page className='page' index={2}>
          <div>
            <span>Animate when the page first loads</span>
            <h1 className='anim-me'>Hello!</h1>
          </div>
        </Page>
        <Page className='page' index={3}>
          <ButtonFirstPage />
        </Page>
      </ScrollContent>
      <FixedContent>
        <Header />
      </FixedContent>
    </FullpageContainer>
  </React.StrictMode>,
)
