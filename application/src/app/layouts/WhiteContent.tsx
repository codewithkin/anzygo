import { ReactNode } from "react"

function WhiteContent({children}: {children: ReactNode}) {
  return (
    <article className='bg-white rounded-xl p-8 w-full h-full m-8'>
        {children}
    </article>
  )
}

export default WhiteContent
