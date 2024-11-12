import { Replicache } from 'replicache';
import { LICENSE_KEY } from '~/license';

export const rep = new Replicache({
  name: "user42",
  licenseKey: LICENSE_KEY,
});

