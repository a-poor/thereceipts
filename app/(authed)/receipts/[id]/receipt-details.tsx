'use client';

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation';
import { useSubscribe } from 'replicache-react';
import type { ReadTransaction } from 'replicache';
import { useReplicache } from '@/components/ReplicacheContext';
import type { Receipt } from '@/lib/mutations';

const userId = "user42";

export function ReceiptDetails() {
  const params = useParams();
  const receiptId = params.id as string;
  
  const router = useRouter();

  const rep = useReplicache();
  const receipt = useSubscribe(rep, async (tx: ReadTransaction) => {
    const record = await tx.get(`/receipts/${receiptId}`);
    return record as Receipt | null;
  });
  if (receipt === undefined) {
    return (
      <>
        <Link href="/receipts/">Back</Link>
        <div>Loading...</div>
      </>
    );
  }
  if (receipt === null) {
    return (
      <>
        <Link href="/receipts/">Back</Link>
        <div>Not found</div>
      </>
    );
  }
  return (
    <>
      <div>
        <Link href="/receipts/">Back</Link>
      </div>
      <div>
        <button onClick={async () => {
          await rep?.mutate.deleteReceipt({
            userId,
            id: receiptId,
          });
          router.push('/receipts');
        }}>
          Delete
        </button>
      </div>
      <div>
        <h1>Receipt Details</h1>
        <p>Receipt ID: {params.id}</p>
        <p>Name: {receipt.name}</p>
        <p>Amount: {receipt.amountCents * 100}</p>
        <p>Date: {receipt.receiptDate}</p>
        <p>Type: {receipt.receiptType}</p>
        <p>From User: {receipt.fromUser}</p>
        <p>To User: {receipt.toUser}</p>
        <p></p>
        <p>Notes: {receipt.notes}</p>
      </div>
    </>
  );
}

