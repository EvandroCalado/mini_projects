import Link from 'next/link';

import { Logo } from '../logo';
import { ToggleTheme } from '../toggle-theme';

export const Header = () => {
  return (
    <>
      <header className='fixed left-0 right-0 z-20 p-5'>
        <div className='relative mx-auto flex max-w-7xl items-center justify-between rounded-xl border border-primary/30 bg-muted/50 p-5 backdrop-blur-md'>
          <Logo />

          <nav className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-4 font-semibold text-muted-foreground'>
            <Link
              href='/'
              className='transition-colors duration-150 hover:text-primary'
            >
              Home
            </Link>
            <Link
              href='/'
              className='transition-colors duration-150 hover:text-primary'
            >
              Dashboard
            </Link>
            <Link
              href='/'
              className='transition-colors duration-150 hover:text-primary'
            >
              Blog
            </Link>
          </nav>

          <ToggleTheme />
        </div>
      </header>

      <div className='h-32 w-full' />
    </>
  );
};
