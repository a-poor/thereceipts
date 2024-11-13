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


export default function Page() {
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
      <form id="create-receipt" class="px-4 my-4 flex flex-col gap-2">
        <Field.Root
          class="flex flex-col gap-2"
        >
          <Field.Label>Name</Field.Label>
          <Field.Input name="name" placeholder="Coffee" required />
          <Field.HelperText class="hidden">
            The name of the receipt.
          </Field.HelperText>
        </Field.Root>
        <Field.Root class="flex flex-col gap-2" >
          <Field.Label>Amount</Field.Label>
          <Field.Input name="amount" type="number" step="0.01" min="0" placeholder="5.00" required />
          <Field.HelperText class="hidden">
            The total amount of the receipt.
          </Field.HelperText>
        </Field.Root>
        <Select.Root collection={friendList}>
          <Select.Label>From</Select.Label>
          <Select.Control>
            <Select.Trigger class="flex gap-2">
              <Select.ValueText placeholder="From person" />
              <Select.Indicator>
                <ChevronsUpDownIcon class="size-4" />
              </Select.Indicator>
            </Select.Trigger>
            {/*<Select.ClearTrigger>Clear</Select.ClearTrigger>*/}
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content class="px-4 py-2 bg-gray-100 drop-shadow">
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
          <Select.Label>To</Select.Label>
          <Select.Control>
            <Select.Trigger class="flex gap-2">
              <Select.ValueText placeholder="To person" />
              <Select.Indicator>
                <ChevronsUpDownIcon class="size-4" />
              </Select.Indicator>
            </Select.Trigger>
            {/*<Select.ClearTrigger>Clear</Select.ClearTrigger>*/}
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content class="px-4 py-2 bg-gray-100 drop-shadow">
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
        <TagsInput.Root class="flex flex-col gap-2">
          <TagsInput.Context>
            {(api) => (
              <>
                <TagsInput.Label>Tags</TagsInput.Label>
                <TagsInput.Control class="flex flex-wrap gap-1">
                  <Index each={api().value}>
                    {(value, index) => (
                      <TagsInput.Item index={index} value={value()}>
                        <TagsInput.ItemPreview>
                          <TagsInput.ItemText>{value()}</TagsInput.ItemText>
                          <TagsInput.ItemDeleteTrigger>
                            <XIcon />
                            <span class="sr-only">Remove tag</span>
                          </TagsInput.ItemDeleteTrigger>
                        </TagsInput.ItemPreview>
                        <TagsInput.ItemInput />
                      </TagsInput.Item>
                    )}
                  </Index>
                </TagsInput.Control>
                <div class="flex">
                  <TagsInput.Input
                    placeholder="Add a tag"
                    class="flex-grow"
                  />
                  <TagsInput.ClearTrigger>
                    Clear
                  </TagsInput.ClearTrigger>
                </div>
              </>
            )}
          </TagsInput.Context>
          <TagsInput.HiddenInput />
        </TagsInput.Root>
      </form>
    </main>
  );
}

