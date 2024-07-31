import  { useContext, useEffect, useState } from "react";
import Topbar from "./topbar";
import { CountryContext, ThemeContext } from "./countryContext";
import "../styles/about.scss";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function About() {
  const { selectedCountry, error } = useContext(CountryContext);
  const [borderCountries, setBorderCountries] = useState([]);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCountry && selectedCountry.borders) {
      const fetchBorderCountries = async () => {
        try {
          const responses = await Promise.all(
            selectedCountry.borders.map((border) =>
              fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            )
          );
          const data = await Promise.all(responses.map((res) => res.json()));
          setBorderCountries(data.map((country) => country[0]?.name?.common || "N/A"));
        } catch (error) {
          console.error("Error fetching border countries:", error);
        }
      };

      fetchBorderCountries();
    }
  }, [selectedCountry]);

  if (!selectedCountry) {
    return <p>No country selected</p>;
  }

  return (
    <div className={`about home ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      <Topbar />
      <div className="details-container">
        <div className="buttonContainer">
          <button className="backButton" onClick={() => navigate('/')}>
            <IoIosArrowRoundBack className="backIcon" />
            Back
          </button>
        </div>
        {error && <p>Error: {error.message}</p>}
        <div className="country-items">
          <div className="country-img">
            <img
              src={selectedCountry.flags.png}
              className="country-flag"
              alt={`${selectedCountry.name.common} flag`}
            />
          </div>
          <div className="withborder">
            <div className="country-details">
              <div className="country-subdetails">
                <h2>{selectedCountry.name.common}</h2>
                <div className="subdetails">
                  <p>
                    <span>Native name:</span>{" "}
                    {
                      Object.values(selectedCountry.name.nativeName || {})[0]
                        ?.common
                    }
                  </p>
                  <p><span>Population</span>: {selectedCountry.population.toLocaleString()}</p>
                  <p><span>Region:</span> {selectedCountry.region}</p>
                  <p><span>Sub Region:</span> {selectedCountry.subregion}</p>
                  <p>
                    <span>Capital:</span>{" "}
                    {selectedCountry.capital ? selectedCountry.capital[0] : "N/A"}
                  </p>
                </div>
              </div>
              <div className="classTLD">
                <p>
                  <span>Top Level Domain:</span>{" "}
                  {selectedCountry.tld ? selectedCountry.tld[0] : "N/A"}
                </p>
                <p>
                  <span>Currencies:</span>{" "}
                  {selectedCountry.currencies
                    ? Object.values(selectedCountry.currencies)
                        .map((c) => c.name)
                        .join(", ")
                    : "N/A"}
                </p>
                <p>
                  <span>Languages:</span>{" "}
                  {selectedCountry.languages
                    ? Object.values(selectedCountry.languages).join(", ")
                    : "N/A"}
                </p>
              </div>
            </div>
            <div className="borderCountry">
              <h2><span>Border Countries:</span></h2>
              <ul className="country-border">
                {borderCountries.length > 0
                  ? borderCountries.map((borderCountry, index) => (
                      <li key={index} className={`${theme === 'dark' ? 'bgDark' : 'bgLight'}`}>{borderCountry}</li>
                    ))
                  : "N/A"}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
