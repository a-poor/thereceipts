import type { WriteTransaction } from 'replicache';

/**
  * A Receipt represents a *transaction* between two users.
  */
export type Receipt = {
  /** A unique ID for the receipt. */
  id: string;

  /** The ID of the user who created the receipt. */
  createdBy: string;

  /** The timestamp when the receipt was created. */
  createdAt: string;

  /** The receipt amount in cents. (Whole number) */
  amountCents: number;

  /** The date of the receipt. */
  receiptDate: string;

  /** The name of the receipt. (Short desc) */
  name: string;

  /** Optional additional notes. */
  notes: string;

  /** Optional tags for the receipt. */
  tags: string[];

  /**
    * The user who the receipt (either credit or debit)
    * is directed *from*.
    */
  fromUser: string;

  /**
    * The user who the receipt (either credit or debit)
    * is directed *to*.
    */
  toUser: string;

  /**
    * The type of "receipt" being logged.
    *
    * It can either be a "credit" or "debit" -- where a "credit" is
    * money being sent from the `fromUser` to the `toUser`, and a
    * "debit" is money that's owed to the `fromUser` to the `toUser`.
    */
  receiptType: "credit" | "debit";

  /**
    * The ID of the recurring event that "created" this receipt.
    */
  fromRecurringId: string | null;
};

export type CronExp = 
  | CronLiteral
  | CronAny
  | CronRange
  | CronStep
  | CronList
  ;

export type CronLiteral = { type: "literal", value: number };

export type CronAny = { type: "any" };

export type CronRange = { type: "range", start: number, end: number };

export type CronStep = { type: "step", step: number, value: CronAny | CronRange };

export type CronList = { type: "list", values: number[] };

export type CronRule = {
  year: CronExp;
  month: CronExp;
  dayOfMonth: CronExp;
  day: CronExp;
  dayOfWeek: CronExp;
};

export type RecurringEvent = {
  /** A unique ID for the recurring event. */
  id: string;

  /** The ID of the user who created the recurring event. */
  createdBy: string;

  /** The name of the recurring event. */
  name: string;

  /** Optional notes about the recurring event. */
  notes: string;
  
  /** The amount of the receipt in cents (whole number). */
  amountCents: number;
  
  /** The timestamp when the recurring event was created. */
  createdAt: string;

  /** Optional string tags for the recurring event. */ 
  tags: string[];

  /** The start date of the recurring event. */
  startDate: string;

  /** The (optional) end date of the recurring event. */
  endDate: string | null;

  /** The type of "receipt" being logged. */
  receiptType: "credit" | "debit";

  /** The user who the receipt (either credit or debit) is directed *from*. */
  fromUser: string;

  /** The user who the receipt (either credit or debit) is directed *to*. */
  toUser: string;

  /** The cron rule for when the recurring event should be triggered. */
  cron: CronRule;
};

export type AddFriendArgs = {
};

export const addFriend = async (tx: WriteTransaction, args: AddFriendArgs) => {
  console.log("addFriend", args);
};

export type RemoveFriendArgs = {
};

export const removeFriend = async (tx: WriteTransaction, args: RemoveFriendArgs) => {
  console.log("addFriend", args);
};

export type CreateReceiptArgs = {
  id: string;
  createdBy: string;
  createdAt: string;
  name: string;
  receiptType: "credit" | "debit";
  fromUser: string;
  toUser: string;
  amountCents: number;
  receiptDate: string;
  notes: string;
  tags: string[];
};

export const createReceipt = async (tx: WriteTransaction, args: CreateReceiptArgs) => {
  console.log("createReceipt", args);
};

export type UpdateReceiptArgs = {
};

export const updateReceipt = async (tx: WriteTransaction, args: UpdateReceiptArgs) => {
  console.log("updateReceipt", args);
};

export type DeleteReceiptArgs = {
};

export const deleteReceipt = async (tx: WriteTransaction, args: DeleteReceiptArgs) => {
  console.log("deleteReceipt", args);
};

export type CreateRecurringArgs = {
};

export const createRecurring = async (tx: WriteTransaction, args: CreateRecurringArgs) => {
  console.log("createRecurring", args);
};

export type UpdateRecurringArgs = {
};

export const updateRecurring = async (tx: WriteTransaction, args: UpdateRecurringArgs) => {
  console.log("updateRecurring", args);
};

export type DeleteRecurringArgs = {
};

export const deleteRecurring = async (tx: WriteTransaction, args: DeleteRecurringArgs) => {
  console.log("deleteRecurring", args);
};


/** Export all of the mutators for use in the Replicache client. */ 
export const mutators = {
  addFriend,
  removeFriend,
  createReceipt,
  updateReceipt,
  deleteReceipt,
  createRecurring,
  updateRecurring,
  deleteRecurring,
};

