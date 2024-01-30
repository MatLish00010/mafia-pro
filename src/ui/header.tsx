import {NavLink} from 'react-router-dom';

import {cn} from '@/lib/utils.ts';
import {ModeToggle} from '@/ui/mode-toggle.tsx';

const getClassName = (isActive: boolean) =>
  cn([...[isActive && 'border-b-foreground border-b-2'], 'text-foreground ']);

const Header = () => {
  return (
    <header className="bg-background">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <nav>
          <ul className="flex gap-4">
            <NavLink to={`/`} className={({isActive}) => getClassName(isActive)}>
              Home
            </NavLink>
            <NavLink to={`/games`} className={({isActive}) => getClassName(isActive)}>
              Games
            </NavLink>
            <NavLink to={`/players`} className={({isActive}) => getClassName(isActive)}>
              Players
            </NavLink>
            <NavLink to={`/rating`} className={({isActive}) => getClassName(isActive)}>
              Rating
            </NavLink>
          </ul>
        </nav>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
