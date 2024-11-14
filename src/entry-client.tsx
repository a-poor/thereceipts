// @refresh reload
import { mount, StartClient } from "@solidjs/start/client";
import ReplicacheProvider from "./components/ReplicacheContext";

mount(() => (
  <ReplicacheProvider>
    <StartClient />
  </ReplicacheProvider>
), document.getElementById("app")!);

