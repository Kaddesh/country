import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from './topbar';
import { CountryContext, ThemeContext } from './countryContext';
import '../styles/home.scss';
import SearchFilter from './searchFilter';

const Home = () => {
  const { countries, setCountries, setSelectedCountry, error, setError, loading, setLoading } = useContext(CountryContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setCountries(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [setCountries, setError, setLoading]);

  const handleSearch = async (term) => {
    setLoading(true);
    try {
      const response = term === ''
        ? await fetch('https://restcountries.com/v3.1/all')
        : await fetch(`https://restcountries.com/v3.1/name/${term}`);

      if (!response.ok) {
        throw new Error('Country not found');
      }
      const result = await response.json();
      setCountries(result);
    } catch (error) {
      setCountries([]);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegionSelect = async (region) => {
    setLoading(true);
    try {
      const response = await fetch(`https://restcountries.com/v3.1/region/${region}`);
      if (!response.ok) {
        throw new Error('Region not found');
      }
      const result = await response.json();
      setCountries(result);
    } catch (error) {
      setCountries([]);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    navigate('/about');
  };

  return (
    <div className={`home ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      <Topbar />
      <SearchFilter onSearch={handleSearch} onRegionSelect={handleRegionSelect} />
      <div className="data-container">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {countries.length > 0 ? (
          <ul className="countries-list " >
            {countries.map((country) => (
              <li key={country.cca3} className={`${theme === 'dark' ? 'bgColor' : ''}`} onClick={() => handleCountryClick(country)}>
                <div className="img-container">
                  <img src={country.flags.png} className="img-flag" alt={`${country.name.common} flag`} />
                </div>
                <div className="country-common">
                  <h3>{country.name.common}</h3>
                  <p><span>Population:</span> {country.population.toLocaleString()}</p>
                  <p><span>Region:</span> {country.region}</p>
                  <p><span>Capital:</span> {country.capital ? country.capital[0] : 'N/A'}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          !loading && !error && <p>No countries found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
