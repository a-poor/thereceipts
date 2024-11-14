import { For, createMemo, createSignal } from 'solid-js';
import { Index, Portal } from 'solid-js/web';
import { A } from '@solidjs/router';
import { ChevronsUpDownIcon, XIcon } from 'lucide-solid';
import { Field } from '@ark-ui/solid/field';
import { DatePicker } from '@ark-ui/solid/date-picker';
//import { NumberInput } from '@ark-ui/solid/number-input';
import { TagsInput } from '@ark-ui/solid/tags-input';
//import { Combobox, createListCollection } from '@ark-ui/solid/combobox';
import { Select, createListCollection } from '@ark-ui/solid/select';
import { RadioGroup } from '@ark-ui/solid/radio-group'
import { useReplicache } from '~/components/ReplicacheContext';
import { nanoid } from 'nanoid';
import { Receipt } from '~/mutations';


const TMP_USER_ID = "user42";

export default function Page() {
  const rep = useReplicache(); 
  const [friends, setFriends] = createSignal(["Me"]);
  const friendList = createListCollection({
    items: [
      "Me",
      "Sandwich",
      "Lauren",
      "Mitch",
    ],
  });

  return (
    <main class="">
      <div class="flex gap-2 px-4 py-4 text-lg font-medium">
        <div>
          <A href="/receipts">
            <XIcon />
            <span class="sr-only">Cancel</span>
          </A>
        </div>
        <h1 class="flex-grow text-center">
          Add Receipt 
        </h1>
        <div>
          <button
            type="submit"
            form="create-receipt"
            class="text-cyan-800 hover:text-cyan-500"
          >
            Save
          </button>
        </div>
      </div>
      <form
        id="create-receipt"
        class="px-4 my-4 flex flex-col gap-5"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);

          const id = nanoid(8);
          const name = formData.get('name') as string;
          const amount = Math.floor(parseFloat(formData.get('amount') as string) * 100);
          const from = formData.get('from') as string;
          const to = formData.get('to') as string;
          const tags = JSON.parse(formData.get('tags') as string) as string[];
          const receiptType = formData.get('receiptType') as "credit" | "debit";
          const receiptDate = formData.get('receiptDate') as string;

          // Define the new receipt
          const newReceipt = {
            id,
            createdBy: TMP_USER_ID,
            createdAt: new Date().toISOString(),
            name,
            amountCents: amount,
            fromUser: from,
            toUser: to,
            tags,
            notes: "",
            receiptType,
            fromRecurringId: null,
            receiptDate,
          } satisfies Receipt;

          console.log("Creating receipt:", newReceipt);
          console.log("is rep null?", rep === null);
          // Add it to the database
          await rep?.mutate.createReceipt(newReceipt);
        }}
      >
        <Field.Root
          class="flex flex-col"
        >
          <Field.Label class="font-medium">
            Name
          </Field.Label>
          <Field.Input
            name="name"
            placeholder="Coffee"
            class="bg-inherit border px-2 py-1 border-cyan-900 rounded-lg"
            required
          />
          {/*<Field.HelperText class="">
            The name of the receipt.
          </Field.HelperText>*/}
        </Field.Root>
        <RadioGroup.Root class="flex flex-col" value="debit">
          <RadioGroup.Label>Framework</RadioGroup.Label>
          <RadioGroup.Indicator />
          <div class="flex gap-2">
            <RadioGroup.Item value="credit" class="has-[:checked]:bg-cyan-700 has-[:checked]:text-white px-2 py-1 rounded-lg">
              <RadioGroup.ItemText>Credit</RadioGroup.ItemText>
              <RadioGroup.ItemControl />
              <RadioGroup.ItemHiddenInput name="receiptType" />
            </RadioGroup.Item>
            <RadioGroup.Item value="debit" class="has-[:checked]:bg-cyan-700 has-[:checked]:text-white px-2 py-1 rounded-lg">
              <RadioGroup.ItemText>Debit</RadioGroup.ItemText>
              <RadioGroup.ItemControl />
              <RadioGroup.ItemHiddenInput name="receiptType" />
            </RadioGroup.Item>
          </div>
        </RadioGroup.Root>
        <Field.Root class="flex flex-col" >
          <Field.Label>Amount</Field.Label>
          <div
              class="border px-2 py-1 border-cyan-900 rounded-lg relative"
          >
            <span class="pr-1">$</span>
            <Field.Input
              name="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="5.00"
              required
              class="bg-inherit absolute inset-0 rounded-lg pl-5"
            />
          </div>
          <Field.HelperText class="hidden">
            The total amount of the receipt.
          </Field.HelperText>
        </Field.Root>
        <Select.Root collection={friendList}>
          <Select.Label>From Person</Select.Label>
          <Select.Control class="w-full">
            <Select.Trigger
              class="w-full flex gap-2 items-center bg-inherit border px-2 py-1 border-cyan-900 rounded-lg"
            >
              <Select.ValueText class="flex-grow text-left" placeholder="Alice" />
              <Select.Indicator>
                <ChevronsUpDownIcon class="size-4" />
              </Select.Indicator>
            </Select.Trigger>
            {/*<Select.ClearTrigger>Clear</Select.ClearTrigger>*/}
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content class="px-4 py-2 bg-white drop-shadow rounded-lg">
                <Select.ItemGroup>
                  <Select.ItemGroupLabel class="text-gray-500">
                    Friends
                  </Select.ItemGroupLabel>
                  <Index each={friendList.items}>
                    {(item) => (
                      <Select.Item item={item()} class="flex gap-2">
                        <Select.ItemText>{item()}</Select.ItemText>
                        <Select.ItemIndicator>&check;</Select.ItemIndicator>
                      </Select.Item>
                    )}
                  </Index>
                </Select.ItemGroup>
              </Select.Content>
            </Select.Positioner>
          </Portal>
          <Select.HiddenSelect name="from" />
        </Select.Root>
        <Select.Root collection={friendList}>
          <Select.Label>To Person</Select.Label>
          <Select.Control class="w-full">
            <Select.Trigger
              class="w-full flex gap-2 items-center bg-inherit border px-2 py-1 border-cyan-900 rounded-lg"
            >
              <Select.ValueText class="flex-grow text-left" placeholder="Bob" />
              <Select.Indicator>
                <ChevronsUpDownIcon class="size-4" />
              </Select.Indicator>
            </Select.Trigger>
            {/*<Select.ClearTrigger>Clear</Select.ClearTrigger>*/}
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content class="px-4 py-2 bg-white drop-shadow rounded-lg">
                <Select.ItemGroup>
                  <Select.ItemGroupLabel class="text-gray-500">
                    Friends
                  </Select.ItemGroupLabel>
                  <Index each={friendList.items}>
                    {(item) => (
                      <Select.Item item={item()} class="flex gap-2">
                        <Select.ItemText>{item()}</Select.ItemText>
                        <Select.ItemIndicator>&check;</Select.ItemIndicator>
                      </Select.Item>
                    )}
                  </Index>
                </Select.ItemGroup>
              </Select.Content>
            </Select.Positioner>
          </Portal>
          <Select.HiddenSelect name="to" />
        </Select.Root>
        <DatePicker.Root>
          <DatePicker.Label>Receipt Date</DatePicker.Label>
          <DatePicker.Control
            class="w-full flex border px-2 py-1 border-cyan-900 rounded-lg"
          >
            <DatePicker.Input name="receiptDate" class="bg-inherit flex-grow" />
            <DatePicker.Trigger class="px-1">📅</DatePicker.Trigger>
            <DatePicker.ClearTrigger>Clear</DatePicker.ClearTrigger>
          </DatePicker.Control>
          <Portal>
            <DatePicker.Positioner>
              <DatePicker.Content class="px-4 py-2 bg-white drop-shadow rounded-lg">
                <DatePicker.YearSelect />
                <DatePicker.MonthSelect />
                <DatePicker.View view="day">
                  <DatePicker.Context>
                    {(context) => (
                      <>
                        <DatePicker.ViewControl>
                          <DatePicker.PrevTrigger>Prev</DatePicker.PrevTrigger>
                          <DatePicker.ViewTrigger>
                            <DatePicker.RangeText />
                          </DatePicker.ViewTrigger>
                          <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
                        </DatePicker.ViewControl>

                        <DatePicker.Table>
                          <DatePicker.TableHead>
                            <DatePicker.TableRow>
                              <Index each={context().weekDays}>
                                {(weekDay) => (
                                  <DatePicker.TableHeader>{weekDay().short}</DatePicker.TableHeader>
                                )}
                              </Index>
                            </DatePicker.TableRow>
                          </DatePicker.TableHead>

                          <DatePicker.TableBody>
                            <Index each={context().weeks}>
                              {(week) => (
                                <DatePicker.TableRow>
                                  <Index each={week()}>
                                    {(day) => (
                                      <DatePicker.TableCell value={day()}>
                                        <DatePicker.TableCellTrigger>
                                          {day().day}
                                        </DatePicker.TableCellTrigger>
                                      </DatePicker.TableCell>
                                    )}
                                  </Index>
                                </DatePicker.TableRow>
                              )}
                            </Index>
                          </DatePicker.TableBody>
                        </DatePicker.Table>
                      </>
                    )}
                  </DatePicker.Context>
                </DatePicker.View>

                <DatePicker.View view="month">
                  <DatePicker.Context>
                    {(context) => (
                      <>
                        <DatePicker.ViewControl>
                          <DatePicker.PrevTrigger>Prev</DatePicker.PrevTrigger>
                          <DatePicker.ViewTrigger>
                            <DatePicker.RangeText />
                          </DatePicker.ViewTrigger>
                          <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
                        </DatePicker.ViewControl>

                        <DatePicker.Table>
                          <DatePicker.TableBody>
                            <Index each={context().getMonthsGrid({ columns: 4, format: 'short' })}>
                              {(months) => (
                                <DatePicker.TableRow>
                                  <Index each={months()}>
                                    {(month) => (
                                      <DatePicker.TableCell value={month().value}>
                                        <DatePicker.TableCellTrigger>
                                          {month().label}
                                        </DatePicker.TableCellTrigger>
                                      </DatePicker.TableCell>
                                    )}
                                  </Index>
                                </DatePicker.TableRow>
                              )}
                            </Index>
                          </DatePicker.TableBody>
                        </DatePicker.Table>
                      </>
                    )}
                  </DatePicker.Context>
                </DatePicker.View>

                <DatePicker.View view="year">
                  <DatePicker.Context>
                    {(context) => (
                      <>
                        <DatePicker.ViewControl>
                          <DatePicker.PrevTrigger>Prev</DatePicker.PrevTrigger>
                          <DatePicker.ViewTrigger>
                            <DatePicker.RangeText />
                          </DatePicker.ViewTrigger>
                          <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
                        </DatePicker.ViewControl>

                        <DatePicker.Table>
                          <DatePicker.TableBody>
                            <Index each={context().getYearsGrid({ columns: 4 })}>
                              {(years) => (
                                <DatePicker.TableRow>
                                  <Index each={years()}>
                                    {(year) => (
                                      <DatePicker.TableCell value={year().value}>
                                        <DatePicker.TableCellTrigger>
                                          {year().label}
                                        </DatePicker.TableCellTrigger>
                                      </DatePicker.TableCell>
                                    )}
                                  </Index>
                                </DatePicker.TableRow>
                              )}
                            </Index>
                          </DatePicker.TableBody>
                        </DatePicker.Table>
                      </>
                    )}
                  </DatePicker.Context>
                </DatePicker.View>
              </DatePicker.Content>
            </DatePicker.Positioner>
          </Portal>
        </DatePicker.Root>
        <TagsInput.Root class="flex flex-col gap-2">
          <TagsInput.Context>
            {(api) => (
              <>
                <TagsInput.Label>Tags</TagsInput.Label>
                <div class="flex gap-2">
                  <TagsInput.Input
                    placeholder="Add a tag"
                    class="bg-inherit flex-grow w-full flex border px-2 py-1 border-cyan-900 rounded-lg"
                  />
                  <TagsInput.ClearTrigger>
                    Clear
                  </TagsInput.ClearTrigger>
                </div>
                <TagsInput.Control class="flex flex-wrap gap-2 min-h-6">
                  <Index each={api().value}>
                    {(value, index) => (
                      <TagsInput.Item index={index} value={value()}>
                        <TagsInput.ItemPreview
                          class="flex gap-1 items-center bg-gray-500 text-white rounded-lg px-2"
                        >
                          <TagsInput.ItemText>{value()}</TagsInput.ItemText>
                          <TagsInput.ItemDeleteTrigger>
                            <XIcon class="size-3" />
                            <span class="sr-only">Remove tag</span>
                          </TagsInput.ItemDeleteTrigger>
                        </TagsInput.ItemPreview>
                        <TagsInput.ItemInput />
                      </TagsInput.Item>
                    )}
                  </Index>
                </TagsInput.Control>
              </>
            )}
          </TagsInput.Context>
          <TagsInput.HiddenInput name="tags" />
        </TagsInput.Root>
      </form>
    </main>
  );
}

