import { createSignal, createContext, useContext, onMount, onCleanup, createEffect } from 'solid-js';
import type { Accessor, JSXElement } from 'solid-js';
import { Replicache } from 'replicache';
import { LICENSE_KEY } from '~/license';
import { mutators } from '~/mutations';


type ReplicacheWithMuts = Replicache<typeof mutators>;

const ReplicacheContext = createContext<Accessor<ReplicacheWithMuts | undefined>>();

export const useReplicache = () => {
  const r1 = useContext(ReplicacheContext);
  if (!r1) {
    console.error('useReplicache outside of ReplicacheProvider');
    return null;
  }
  const r2 = r1();
  if (!r2) {
    console.error('useReplicache outside of ReplicacheProvider (v2)');
    return null;
  }
  return r2;
};

export default function ReplicacheProvider(props: { children: JSXElement }) {
  const [rep, setRep] = createSignal<ReplicacheWithMuts>();
  createEffect(() => {
    if (rep()) {
      return;
    }
    setRep(new Replicache({
      name: "user42",
      licenseKey: LICENSE_KEY,
      logLevel: 'debug',
      mutators,
    }));
  });
  onCleanup(() => rep()?.close());
  return (
    <ReplicacheContext.Provider value={rep}>
      {props.children}
    </ReplicacheContext.Provider>
  );
}



