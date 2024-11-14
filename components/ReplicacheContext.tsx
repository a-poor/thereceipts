'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Replicache } from 'replicache';
import { mutators } from '@/lib/mutations';

type M = typeof mutators;

const ReplicacheContext = createContext<Replicache<M> | null>(null);

export function useReplicache() {
  return useContext(ReplicacheContext);
  //const rep = useContext(ReplicacheContext);
  //if (rep === null) {
  //  throw new Error('useReplicache must be used within a ReplicacheProvider');
  //}
  //return rep;
}

export function ReplicacheProvider({ children }: { children: ReactNode }) {
  const [rep, setRep] = useState<Replicache<M> | null>(null);
  useEffect(() => {
    if (rep) {
      return () => { rep.close() };
    }

    // Create a new Replicache instance
    setRep(new Replicache({
      name: "user42",
      licenseKey: process.env.NEXT_PUBLIC_REPLICACHE_LICENSE_KEY!,
      mutators,
      //pushURL: '/api/replicache-push',
      //pullURL: '/api/replicache-pull',
    }));
  }, [rep]);
  return (
    <ReplicacheContext.Provider value={rep}>
      {children}
    </ReplicacheContext.Provider>
  );
}
