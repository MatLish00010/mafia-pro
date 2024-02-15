import {useContext} from 'react';
import {NavLink} from 'react-router-dom';

import {SessionContext} from '@/context/SessionContext.ts';
import useLogOut from '@/hooks/auth/useLogOut.tsx';
import {cn} from '@/lib/utils.ts';
import {Button} from '@/ui/button.tsx';
import {ModeToggle} from '@/ui/mode-toggle.tsx';

const getClassName = (isActive: boolean) =>
  cn([...[isActive && 'border-b-foreground border-b-2'], 'text-foreground ']);

const Header = () => {
  const session = useContext(SessionContext);
  const {loading, logOut} = useLogOut();
  return (
    <header className="bg-background mb-5">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <nav>
          <ul className="flex gap-4">
            <NavLink to={`/`} className={({isActive}) => getClassName(isActive)}>
              Home
            </NavLink>
            <NavLink to={`/rating`} className={({isActive}) => getClassName(isActive)}>
              Rating
            </NavLink>
            {session && (
              <>
                <NavLink to={`/games`} className={({isActive}) => getClassName(isActive)}>
                  Games
                </NavLink>
                <NavLink to={`/players`} className={({isActive}) => getClassName(isActive)}>
                  Players
                </NavLink>
              </>
            )}
          </ul>
        </nav>
        <ul className="flex gap-4 items-center">
          {!session ? (
            <>
              <NavLink to={`/signIn`} className={({isActive}) => getClassName(isActive)}>
                SignIn
              </NavLink>
              <NavLink to={`/signUp`} className={({isActive}) => getClassName(isActive)}>
                SignUp
              </NavLink>
            </>
          ) : (
            <Button onClick={logOut} disabled={loading}>
              Log Out
            </Button>
          )}

          <ModeToggle />
        </ul>
      </div>
    </header>
  );
};

export default Header;
