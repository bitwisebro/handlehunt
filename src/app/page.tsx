export default function Home() {
  return (
    <div>
      <p className="text-center font-monospace fs-1">
        Enter You Favourite Internet Name to check its availability
      </p>
      <form className="d-flex">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}
