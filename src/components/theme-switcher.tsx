'use client'

import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@heroicons/react/16/solid'
import { useState, useEffect } from 'react';

const ThemeSwitcher = () => {
  const {resolvedTheme, setTheme} = useTheme();

  const [mounted, SetMounted] = useState<boolean>(false);
  useEffect(() => SetMounted(true)
, [])

  const handleClick = () =>{
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return(
    <button 
      onClick={handleClick} 
      className='flex items-center justify-center rounded-lg p-2 transition bg-gray-600 w-fit'
    >
      {resolvedTheme === 'dark' ? (
        <SunIcon className='size-5 transition text-black hover:text-white ' />
      ) : (
        <MoonIcon className='size-5 transition hover:text-black'/>
      )}
    </button>
  )
};

export default ThemeSwitcher;