import { createSignal } from "solid-js";
import { A } from "@solidjs/router";

import { Replicache } from 'replicache';
import { LICENSE_KEY } from '~/license';


export default function Home() {
  const rep = createSignal(() => {
    return new Replicache({
      name: "user42",
      licenseKey: LICENSE_KEY,
      logLevel: 'debug',
    });
  })[0];
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Hello world!
      </h1>
    </main>
  );
}
