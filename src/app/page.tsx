import Search from "./components/search";

export default function Home() {
  return (
    <div>
      <p className="text-center font-monospace fs-1">
        Enter You Favourite Internet Name to check its availability
      </p>
      <Search />
    </div>
  );
}
