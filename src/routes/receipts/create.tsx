import { For, createMemo, createSignal } from 'solid-js';
import { Index, Portal } from 'solid-js/web';
import { A } from '@solidjs/router';
import { XIcon } from 'lucide-solid';
import { Field } from '@ark-ui/solid/field';
import { DatePicker } from '@ark-ui/solid/date-picker';
//import { NumberInput } from '@ark-ui/solid/number-input';
import { TagsInput } from '@ark-ui/solid/tags-input';
import { Combobox, createListCollection } from '@ark-ui/solid/combobox';


export default function Page() {
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
      <form id="create-receipt" class="px-4 my-4">
        <Field.Root
          name="name"
          class="flex flex-col gap-2"
        >
          <Field.Label>Name</Field.Label>
          <Field.Input required />
          <Field.HelperText>
            The name of the receipt.
          </Field.HelperText>
        </Field.Root>
        <Field.Root
          name="amount"
          class="flex flex-col gap-2"
        >
          <Field.Label>Amount</Field.Label>
          <Field.Input type="number" step="0.01" min="0" required />
          <Field.HelperText>
            The total amount of the receipt.
          </Field.HelperText>
        </Field.Root>
        <TagsInput.Root class="flex flex-col gap-2">
          <TagsInput.Context>
            {(tagsInput) => (
              <>
                <TagsInput.Label>Tags</TagsInput.Label>
                <TagsInput.Control>
                  {tagsInput.value?.map((value, index) => (
                    <TagsInput.Item key={index}> index={index} value={value}>
                      <TagsInput.ItemPreview>
                        <TagsInput.ItemText>{value}</TagsInput.ItemText>
                        <TagsInput.ItemDeleteTrigger>
                          <XIcon />
                          <span class="sr-only">Remove tag</span>
                        </TagsInput.ItemDeleteTrigger>
                      </TagsInput.ItemPreview>
                      <TagsInput.ItemInput />
                    </TagsInput.Item>
                  ))}
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

