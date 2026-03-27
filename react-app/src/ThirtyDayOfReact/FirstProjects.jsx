import React, { useEffect, useState } from 'react';
import axios from 'axios';

const numberWithCommas = (n) => n.toLocaleString();

const CountryCard = ({ country }) => {
    const {
        name: { common },
        capital,
        flags: { svg },
        languages,
        population,
        currencies,
    } = country;

    const langString = languages
        ? Object.values(languages).join(', ')
        : '—';

    const currencyNames = currencies
        ? Object.values(currencies)
            .map((c) => c.name)
            .join(', ')
        : '—';

    return (
        <div className="col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm">
                <img
                    src={svg}
                    className="card-img-top"
                    alt={`Flag of ${common}`}
                    style={{ height: 160, objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-center">{common}</h5>
                    <p className="card-text mb-1">
                        <strong>Capital:</strong> {capital?.[0] || '—'}
                    </p>
                    <p className="card-text mb-1">
                        <strong>Languages:</strong> {langString}
                    </p>
                    <p className="card-text mb-1">
                        <strong>Population:</strong> {numberWithCommas(population)}
                    </p>
                    <p className="card-text">
                        <strong>Currency:</strong> {currencyNames}
                    </p>
                </div>
            </div>
        </div>
    );
};

function FirstProjects() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fields = [
            'name',
            'capital',
            'flags',
            'languages',
            'population',
            'currencies',
        ].join(',');

        axios
            .get(`https://restcountries.com/v3.1/all?fields=${fields}`)
            .then((res) => {
                setCountries(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || 'Network error');
                setLoading(false);
            });
    }, []);
    if (loading)
        return (
            <div className="container text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading…</span>
                </div>
            </div>
        );

    if (error)
        return (
            <div className="container py-5">
                <div className="alert alert-danger" role="alert">
                    ⚠️ {error}
                </div>
            </div>
        );

    return (
        <div className="container py-4">
            <h4 className="mb-4 text-center">🌍 World Countries</h4>
            <p className="text-center text-muted mb-4">
                Showing <strong>{countries.length}</strong> countries
            </p>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {countries.map((c) => (
                    <CountryCard key={c.name.common} country={c} />
                ))}
            </div>
        </div>
    );
}

export default FirstProjects