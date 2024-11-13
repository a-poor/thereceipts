import { useParams } from "@solidjs/router";

export default function Home() {
  const { id } = useParams(); 
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Receipt: {id}
      </h1>
    </main>
  );
}
