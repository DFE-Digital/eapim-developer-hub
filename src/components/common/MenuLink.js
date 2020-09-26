import React, { Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default ({ href, parentClass, children }) => {
  const router = useRouter()

  let className = parentClass || ''
  if (router.pathname.includes(href)) className = `${className} govuk-header__navigation-item--active`

  return (
    <Fragment>
      <li className={className}>
        <Link href={href} as={href} passHref>{React.cloneElement(children)}</Link>
      </li>
    </Fragment>
  )
}
