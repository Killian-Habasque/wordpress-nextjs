export default function SearchForm({ searchTerm, setSearchTerm, handleSearch }) {
    return (
      <div className="my-4">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          />
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400"
          >
            Rechercher
          </button>
        </form>
      </div>
    );
  }
  