import React, { useEffect, useState } from "react";
import "./styles.css";

const API_URL =
  "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const filteredCountries = countries.filter((country) =>
    country.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="countries-container">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div key={country.code} className="countryCard">
              <img src={country.png} alt={`${country.common} flag`} />
              <h2>{country.name}</h2>
            </div>
          ))
        ) : (
          <p>No matching countries found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
