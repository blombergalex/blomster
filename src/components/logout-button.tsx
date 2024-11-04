'use client'

import { Button } from '@nextui-org/react'
import { logOut } from '@/actions/log-out'
import { logOutButtonClasses } from '@/utils/classes'

const LogOutButton = () => {
  return (
    <Button className={logOutButtonClasses} onClick={() => logOut()}>Log out</Button>
  )
}

export default LogOutButton