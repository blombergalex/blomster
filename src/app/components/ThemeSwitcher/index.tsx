'use client'

import { useEffect, useState } from 'react' 
import { useTheme } from 'next-themes'
import { Button } from '@nextui-org/button'

export default function Themeswitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();  

  useEffect(() => {
    setMounted(true)
  }, []);

  if (!mounted) return null;

  const getButtonStyles = (currentTheme: string) => {
    switch (currentTheme) {
      case 'light':
        return 'bg-background border-primary-300 text-primary-300'; // Light theme: neon green (as per your config)
      case 'dark':
        return 'bg-background border-primary text-primary'; // Dark theme: neon pink
      case 'modern':
        return 'bg-primary-300 text-primary hover:text-primary-foreground'; // Modern theme: neon purple
      default:
        return 'bg-primary text-foreground'; // Default to primary and foreground colors
    }
  }

  return ( 
    <div className='flex gap-4 px-3'>
      <Button 
        size='sm' 
        variant='ghost' 
        className={getButtonStyles(theme ?? 'dark')} 
        onClick={() => setTheme('light')}
      >
        Light 
      </Button>
      <Button 
        size='sm' 
        variant='ghost' 
        className={getButtonStyles(theme ?? 'dark')} 
        onClick={() => setTheme('dark')}
      >
        Dark
      </Button>
      <Button 
        size='sm' 
        variant='ghost' 
        className={getButtonStyles(theme ?? 'dark')} 
        onClick={() => setTheme('modern')}
      >
        Modern
      </Button>
    </div>
  );
};
