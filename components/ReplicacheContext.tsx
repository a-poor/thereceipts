'use client';

import { createContext, useState, useEffect } from 'react';
import { Replicache } from 'replicache';
import { mutators } from '@/lib/mutations';

const ReplicacheContext = createContext(null);

export function useReplicache() {
  const rep = useContext(ReplicacheContext);
  if (rep === null) {
    throw new Error('useReplicache must be used within a ReplicacheProvider');
  }
  return rep;
}

export function ReplicacheProvider({children}) {
  const [rep, setRep] = useState<Replicache | null>(null);
  useEffect(() => {
    if (rep) {
      return;
    }
    const r = new Replicache({
      name: "user42",
      licenseKey: process.env.NEXT_PUBLIC_REPLICACHE_LICENSE_KEY!,
      mutators,
      //pushURL: '/api/replicache-push',
      //pullURL: '/api/replicache-pull',
    });
    setRep(r);
  }, [rep]);
  return (
    <ReplicacheContext.Provider value={rep}>
      {children}
    </ReplicacheContext.Provider>
  );
}
