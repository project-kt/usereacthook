import Hero from "./_components/hero";
import NewHooks from "./_components/new-hooks";

function Index(): React.JSX.Element {
  return (
    <main>
      <Hero />
      <div className="flex flex-col gap-y-10">
        <NewHooks />
      </div>
    </main>
  );
}

export default Index;
