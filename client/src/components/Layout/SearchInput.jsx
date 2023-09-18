import './../../assets/css/layout.css';
import { useSearch } from '../../context/search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate(`/dashboard/search`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='search'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Buscar '
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          />
          <button type='submit'>Buscar produto</button>
        </form>
      </div>
    </>
  );
};

export default Search;
