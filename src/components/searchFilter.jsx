import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/searchFilter.scss';
import { RiArrowDropDownLine } from "react-icons/ri";
import {CiSearch } from "react-icons/ci";
import { ThemeContext } from './countryContext';

function SearchFilter({ onSearch,  onRegionSelect}) {
    const [showDropdown, setShowDropdown] = useState(false);
    const { theme } = useContext(ThemeContext);

  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  const handleRegionSelect = (region) => {
    onRegionSelect(region);
    setShowDropdown(false);
  };
  return (
    <div>
    <div className="flex-search">
    <div className="search">
      <CiSearch size={25} className="search-icon" />
      <input
        type="search"
        className={`search-input ${theme === 'dark' ? 'bgColor' : 'bgLight'}`}
        placeholder="Search for a country"
        onChange={handleInputChange}
      />
    </div>
    <div className="div-region" onClick={() => setShowDropdown(!showDropdown)}>
      <h3>Filter by Region</h3>
      <RiArrowDropDownLine size={29}/>
    </div>
  </div>

  <div className="filter">
    {showDropdown && (
      <div className={`filter-dropdown ${theme === 'dark' ? 'bgColor' : 'bgLight'}`}>
        <div onClick={() => handleRegionSelect("Africa")}>Africa</div>
        <div onClick={() => handleRegionSelect("Americas")}>Americas</div>
        <div onClick={() => handleRegionSelect("Asia")}>Asia</div>
        <div onClick={() => handleRegionSelect("Europe")}>Europe</div>
        <div onClick={() => handleRegionSelect("Oceania")}>Oceania</div>
      </div>
    )}
  </div>

  </div>
  );
}

SearchFilter.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onRegionSelect: PropTypes.func.isRequired,
};

export default SearchFilter;
