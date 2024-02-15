import {Session} from '@supabase/supabase-js';
import {useEffect, useState} from 'react';

import {supabase} from '@/providers/supabaseClient.ts';
import {getSession} from '@/requests/session';

const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    getSession().then(session => setSession(session));

    const {
      data: {subscription},
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    session,
  };
};

export default useSession;
