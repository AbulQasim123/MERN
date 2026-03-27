import { useState } from 'react';
import Select from 'react-select';
import { countriesData } from '../data/countries';

function Country() {
    const [selectedOption, setSelectedOption] = useState(null);

    const options = countriesData.map(country => ({
        value: country.name,
        label: country.name,
        capital: country.capital,
        population: country.population,
        languages: country.languages
    }));

    const handleChange = (option) => {
        setSelectedOption(option);
    };

    return (
        <div style={{ margin: '20px', width: '350px' }}>
            <h4 className='text-center mb-3'>Select Countries</h4>

            <Select
                options={options}
                value={selectedOption}
                onChange={handleChange}
                isSearchable
                isClearable
                placeholder="Select a country..."
            />

            {selectedOption && (
                <div style={{
                    marginTop: '20px',
                    padding: '15px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    background: '#f9f9f9'
                }}>
                    <p>
                        <strong>Country:</strong> {selectedOption.label}
                    </p>
                    <p>
                        <strong>Capital:</strong> {selectedOption?.capital}
                    </p>
                    <p>
                        <strong>Population:</strong> {selectedOption?.population.toLocaleString()}
                    </p>
                    <p>
                        <strong>Languages:</strong> {selectedOption?.languages.join(", ")}
                    </p>
                </div>
            )}
        </div>
    );
}

export default Country;
