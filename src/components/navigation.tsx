import {Accordion, AccordionItem} from '@nextui-org/react'
import Link from 'next/link'

import React from 'react'

const Navigation = () => {
  return (
    <Accordion>
        <AccordionItem>
            <Link href='/'>Home</Link>
        </AccordionItem>
  </Accordion> 
  )
}

export default Navigation
