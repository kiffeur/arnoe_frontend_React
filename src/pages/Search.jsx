import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchResults from '../components/SearchResults';

const Search = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <SearchResults />
      </main>
      <Footer />
    </div>
  );
};

export default Search;
