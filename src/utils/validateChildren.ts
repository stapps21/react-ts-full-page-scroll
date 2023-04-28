import {
  Children,
  ComponentType,
  ElementType,
  isValidElement,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
} from 'react'

type AllowedChild = ElementType | ElementType[]

const isComponentType = (type: string | JSXElementConstructor<any>): type is ComponentType<any> => {
  return typeof type === 'function'
}

const isAllowedChild = (element: ReactElement, allowedChildren: AllowedChild): boolean => {
  if (Array.isArray(allowedChildren)) {
    return allowedChildren.some((AllowedChildComponent) => {
      if (isComponentType(element.type) && isComponentType(AllowedChildComponent)) {
        return element.type === AllowedChildComponent || element.type.displayName === AllowedChildComponent.displayName
      }
      return element.type === AllowedChildComponent
    })
  }

  if (isComponentType(element.type) && isComponentType(allowedChildren)) {
    return element.type === allowedChildren || element.type.displayName === allowedChildren.displayName
  }

  return element.type === allowedChildren
}

export const validateChildren = (children: ReactNode, allowedChildren: AllowedChild): boolean => {
  let valid = true

  Children.forEach(children, (child) => {
    if (!isValidElement(child) || !isAllowedChild(child, allowedChildren)) {
      valid = false
    }
  })

  return valid
}
