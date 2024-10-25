'use client'

import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@heroicons/react/16/solid'

const ThemeSwitcher = () => {
  const {resolvedTheme, setTheme} = useTheme();

  const handleClick = () =>{
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return(
    <button 
      onClick={handleClick} 
      className='flex items-center justify-center rounded-lg p-2 bg-transparent border-1 border-foreground w-fit'
    >
      {resolvedTheme === 'dark' ? (
        <SunIcon className='size-5' />
      ) : (
        <MoonIcon className='size-5 '/>
      )}
    </button>
  )
};

export default ThemeSwitcher;