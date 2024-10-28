'use client'

import { Button } from '@nextui-org/react'
import { logOut } from '@/actions/log-out'

const LogOutButton = () => {
  return (
    <Button onClick={() => logOut()}>Log out</Button>
  )
}

export default LogOutButton