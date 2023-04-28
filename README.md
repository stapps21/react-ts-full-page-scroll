# react-ts-full-page-scroll

![npm-typescript]
[![License][github-license]][github-license-url]

**⚠️ WARNING: This library is in active development and is not production-ready. Major changes are coming. It will be released on NPM once it's production-ready.**

A React library that enables smooth full-screen scrolling with support for keyboard, mouse, and touch events.

[**Live Demo**](https://stapps21.github.io/react-ts-full-page-scroll/)

## Features

- Full-screen scrolling
- Keyboard, mouse, and touch support
- Fixed and scrollable content
- Customizable scrolling duration and easing functions
- TypeScript support

## Installation

**Note: This library is not yet available on NPM.**

You can clone the repository and build it manually:

```bash
git clone https://github.com/stapps21/react-ts-full-page-scroll.git
cd react-ts-full-page-scroll
npm install
npm run build
```

## Usage

Here's an example of how to use the library:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { FixedContent, FullpageContainer, Page, ScrollContent } from 'react-ts-full-page-scroll';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <FullpageContainer>
      <ScrollContent>
        <Page index={0}>Page 1</Page>
        <Page index={1}>Page 2</Page>
        <Page index={2}>Page 3</Page>
      </ScrollContent>
      <FixedContent>HEADER</FixedContent>
    </FullpageContainer>
  </React.StrictMode>,
);
```

For a more complex example, check out the `/example` directory.

## API

### FullpageContainer

The `FullpageContainer` component is the main container for your full-page scrolling content. It should wrap both `ScrollContent` and `FixedContent` components.

### ScrollContent

The `ScrollContent` component is a container for the scrollable pages. It should contain one or more `Page` components.

### Page

The `Page` component represents a single scrollable page. It accepts an `index` prop to define the order of the pages. // !defined indexes are ignored and get removed in future release!

### FixedContent

The `FixedContent` component is a container for any content that should remain fixed while scrolling through the pages.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the library. If you have any questions or suggestions, don't hesitate to reach out.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

[github-license]: https://img.shields.io/github/license/stapps21/react-ts-full-page-scroll
[github-license-url]: https://github.com/stapps21/react-ts-full-page-scroll/blob/master/LICENSE
[npm-typescript]: https://img.shields.io/npm/types/my-react-typescript-package