import React from 'react'

type LinksProps = {} & React.ComponentProps<"a">

const Link = ({children,...rest}:LinksProps) => {
  return (
    <a className='text-black hover:underline cursor-pointer ' {...rest}>
        {children}
    </a>
  )
}

export default Link