import "./styles.css";

import React, { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  // Fetch country data on initial render
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://countries-search-data-prod-812920491762.asia-south1.run.app/countries");
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data); // Set filtered countries to show all initially
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCountries();
  }, []);

  // Handle search input
  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchValue)
    );
    setFilteredCountries(filtered);
  };

  return (
    <div className="App">
      <h1>Country Search</h1>
      <input
        type="text"
        placeholder="Search for a country"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="country-grid">
        {filteredCountries.map((country) => (
          <div className="countryCard" key={country.cca3}>
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
            />
            <p>{country.name.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
