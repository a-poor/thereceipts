'use client';

import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
//import { useSubscribe } from 'replicache-react';
//import type { ReadTransaction } from 'replicache';
import { useReplicache } from '@/components/ReplicacheContext';
import type { Receipt } from '@/lib/mutations';

const userId = "user42";
const friends = [
  {id: "user43", name: "Alice"},
  {id: "user44", name: "Bob"},
  {id: "user45", name: "Charlie"},
];

export function CreateReceiptForm() {
  const router = useRouter();
  const rep = useReplicache();
  //const friends = useSubscribe(
  //  rep,
  //  async (tx: ReadTransaction) => {},
  //  {},
  //);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    // Parse the form and it's fields
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const amountCents = Math.floor(parseFloat(formData.get("amountCents") as string) * 100);
    const receiptType = formData.get("receiptType") as "credit" | "debit";
    const fromUser = formData.get("fromUser") as string;
    const toUser = formData.get("toUser") as string;
  
    // Generate some fields
    const id = nanoid();
    const createdBy = userId;
    const createdAt = new Date().toISOString();

    // Format the new receipt data
    const newReceipt = {
      id,
      createdBy,
      createdAt,
      amountCents,
      receiptDate: createdAt, // TODO - Change me
      name,
      notes: "",
      tags: [],
      fromUser,
      toUser,
      receiptType,
      fromRecurringId: null,
    } satisfies Receipt;

    // Create the receipt
    rep?.mutate.createReceipt(newReceipt);

    // Redirect to the receipts page
    router.push("/receipts");
  }
  return (
    <form onSubmit={handleSubmit} className="max-w-4xl flex flex-col">
      <label>
        Name:
        <input type="text" name="name" required />
      </label>
      <label>
        Amount:
        <input type="number" name="amountCents" required />
      </label>
      <label>
        Type:
        <select name="receiptType" required>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>
      </label>
      <label>
        From User:
        <select name="fromUser" required>
          <option value={userId}>Me</option>
          {friends.map(friend => (
            <option key={friend.id} value={friend.id}>{friend.name}</option>
          ))}
        </select>
      </label>
      <label>
        To User:
        <select name="toUser" required>
          <option value={userId}>Me</option>
          {friends.map(friend => (
            <option key={friend.id} value={friend.id}>{friend.name}</option>
          ))}
        </select>
      </label>
      <button type="submit">Create Receipt</button>
    </form>
  );
}

