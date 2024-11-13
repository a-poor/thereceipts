import { XIcon } from 'lucide-solid';
import { TextField } from "@kobalte/core/text-field";
import { Search } from "@kobalte/core/search";

export default function Page() {
  return (
    <main class="">
      <div class="flex gap-2 px-4 py-4 text-lg font-medium">
        <div>
          <button>
            <XIcon />
            <span class="sr-only">Cancel</span>
          </button>
        </div>
        <h1 class="flex-grow text-center">
          Add Receipt 
        </h1>
        <div>
          <button type="submit" form="create-receipt" class="text-cyan-800 hover:text-cyan-500">
            Save
          </button>
        </div>
      </div>
      <form id="create-receipt">
        
      </form>
    </main>
  );
}
