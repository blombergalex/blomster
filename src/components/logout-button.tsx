'use client'

import { Button } from '@nextui-org/react'
import { logOut } from '@/actions/log-out'
import { secondaryButtonClasses } from '@/utils/classes'

const LogOutButton = () => {
  return (
    <Button className={secondaryButtonClasses} onClick={() => logOut()}>Log out</Button>
  )
}

export default LogOutButton