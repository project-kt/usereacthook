import Hero from "./_components/hero";
import NewHooks from "./_components/new-hooks";
import PopularHooks from "./_components/popular-hooks";
import RecentlyUsedHooks from "./_components/recently-used-hooks";

function Index(): React.JSX.Element {
  return (
    <main>
      <Hero />
      <div className="flex flex-col gap-y-10">
        <RecentlyUsedHooks />
        <NewHooks />
        <PopularHooks />
      </div>
    </main>
  );
}

export default Index;
