import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { ReplicacheProvider } from "~/components/ReplicacheContext";
import { Nav } from "~/components/Nav";
import "./app.css";

export default function App() {
  return (
    <Router
      root={props => (
        <>
          <Suspense>
            <ReplicacheProvider>
              <Nav>
                {props.children}
              </Nav>
            </ReplicacheProvider>
          </Suspense>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
