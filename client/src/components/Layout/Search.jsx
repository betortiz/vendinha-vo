import './../../assets/css/layout.css';

const Search = () => {
  return (
    <>
      <div className='search'>
        <form>
          <input type='text' placeholder='Buscar '/>
          <button type='submit'>
            Buscar produto
          </button>
        </form>
      </div>
    </>
  );
};

export default Search;
