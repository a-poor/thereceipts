import { useReplicache } from '~/components/ReplicacheContext';


export const useProfile = () => {
  const rep = useReplicache();
  if (!rep) {
    throw new Error('Replicache not found');
  }
};

export const useFriendList = () => {
  const rep = useReplicache();
  if (!rep) {
    throw new Error('Replicache not found');
  }
};


export const useFriend = () => {
  const rep = useReplicache();
  if (!rep) {
    throw new Error('Replicache not found');
  }
};

export const useReceiptList = () => {
  const rep = useReplicache();
  if (!rep) {
    throw new Error('Replicache not found');
  }
};

export const useReceipt = () => {
  const rep = useReplicache();
  if (!rep) {
    throw new Error('Replicache not found');
  }
};


