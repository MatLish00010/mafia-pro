import {HamburgerMenuIcon} from '@radix-ui/react-icons';
import {useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';
import {NavLink} from 'react-router-dom';

import useLogOut from '@/hooks/auth/useLogOut.tsx';
import useMediaQuery from '@/hooks/screen/useMediaQuery.ts';
import useProfile from '@/hooks/useProfile';
import {cn} from '@/lib/utils.ts';
import {Button} from '@/ui/button.tsx';
import {ModeToggle} from '@/ui/mode-toggle.tsx';
import {Separator} from '@/ui/separator.tsx';
import {Sheet, SheetContent, SheetTrigger} from '@/ui/sheet.tsx';

const getClassName = (isActive: boolean) =>
  cn([...[isActive && 'border-b-foreground border-b-[1px]'], 'text-foreground ']);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const {data, isLoading} = useProfile();
  const {loading, logOut} = useLogOut();
  const queryClient = useQueryClient();

  const showForClubAdmin = data?.role === 'CLUB_ADMIN' || data?.role === 'ADMIN';

  const onClickItemNav = () => {
    setIsOpen(false);
  };

  const onLogOut = async () => {
    logOut().then(() => queryClient.invalidateQueries({queryKey: ['profile']}));
  };

  return (
    <header className="bg-background mb-5 ">
      <div className="container mx-auto min-h-[70px] py-4 flex justify-between items-center">
        {isDesktop ? (
          <>
            <nav>
              <ul className="flex gap-4">
                <NavLink to={`/`} className={({isActive}) => getClassName(isActive)}>
                  Home
                </NavLink>
                <NavLink to={`/rating`} className={({isActive}) => getClassName(isActive)}>
                  Rating
                </NavLink>
                <NavLink to={`/games`} className={({isActive}) => getClassName(isActive)}>
                  Games
                </NavLink>
                {showForClubAdmin && (
                  <NavLink to={`/club`} className={({isActive}) => getClassName(isActive)}>
                    Club
                  </NavLink>
                )}
              </ul>
            </nav>
            {!isLoading && (
              <ul className="flex gap-4 items-center">
                {!data ? (
                  <>
                    <NavLink to={`/signIn`} className={({isActive}) => getClassName(isActive)}>
                      Sign In
                    </NavLink>
                    <NavLink to={`/signUp`} className={({isActive}) => getClassName(isActive)}>
                      Sign Up
                    </NavLink>
                  </>
                ) : (
                  <Button onClick={onLogOut} disabled={loading}>
                    Log Out
                  </Button>
                )}

                <ModeToggle />
              </ul>
            )}
          </>
        ) : (
          <Sheet open={isOpen} onOpenChange={open => setIsOpen(open)}>
            <SheetTrigger onClick={() => setIsOpen(true)}>
              <HamburgerMenuIcon className="h-4 w-4" />
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col gap-5">
              <nav>
                <ul className="flex flex-col gap-3 max-w-max">
                  <li>
                    <NavLink
                      onClick={onClickItemNav}
                      to={`/`}
                      className={({isActive}) => getClassName(isActive)}>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={onClickItemNav}
                      to={`/rating`}
                      className={({isActive}) => getClassName(isActive)}>
                      Rating
                    </NavLink>
                  </li>

                  <NavLink
                    onClick={onClickItemNav}
                    to={`/games`}
                    className={({isActive}) => getClassName(isActive)}>
                    Games
                  </NavLink>
                  {showForClubAdmin && (
                    <NavLink
                      to={`/club`}
                      onClick={onClickItemNav}
                      className={({isActive}) => getClassName(isActive)}>
                      Club
                    </NavLink>
                  )}
                </ul>
              </nav>
              {!isLoading && (
                <ul className="flex flex-col gap-2 max-w-max">
                  {!data ? (
                    <>
                      <li>
                        <NavLink
                          onClick={onClickItemNav}
                          to={`/signIn`}
                          className={({isActive}) => getClassName(isActive)}>
                          Sign In
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={onClickItemNav}
                          to={`/signUp`}
                          className={({isActive}) => getClassName(isActive)}>
                          Sign Up
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Button
                        onClick={() => {
                          onLogOut();
                          onClickItemNav();
                        }}
                        disabled={loading}>
                        Log Out
                      </Button>
                    </li>
                  )}
                  <li>
                    <ModeToggle />
                  </li>
                </ul>
              )}
            </SheetContent>
          </Sheet>
        )}
      </div>
      <Separator />
    </header>
  );
};

export default Header;
