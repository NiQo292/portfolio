import TextUpDown from "@/components/animations/TextUpDown";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <TextUpDown>
        <h1 className="text-3xl text-red-500">Hello, world!</h1>
      </TextUpDown>
    </main>
  );
}
