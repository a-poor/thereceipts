'use client';

import Link from 'next/link'
import { useSubscribe } from 'replicache-react';
import type { ReadTransaction } from 'replicache';
import { useReplicache } from '@/components/ReplicacheContext';
import type { Receipt } from '@/lib/mutations';

//const userId = "user42";

export function ListReceipts() {
  const rep = useReplicache();
  const receipts = useSubscribe(
    rep,
    async (tx: ReadTransaction) => {
      //const records = await tx.scan({prefix: `/receipts/`}).values().toArray();
      const records = await tx.scan().values().toArray();
      return records.map((v) => v as Receipt);
    },
    {
      default: [] as Receipt[],
    },
  );
  return (
    <>
      <Link href="/receipts/create">Create Receipt</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>From</th>
            <th>To</th>
            <th>Type</th>
            <th>Date</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map(r => (
            <tr key={r.id}>
              <th><Link href={`/receipts/${r.id}`}>{r.name}</Link></th>
              <th>{r.amountCents / 100}</th>
              <th>{r.fromUser}</th>
              <th>{r.toUser}</th>
              <th>{r.receiptType}</th>
              <th>{r.receiptDate}</th>
              <th>
                <button onClick={() => rep?.mutate.deleteReceipt({id: r.id})}>
                  Delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
