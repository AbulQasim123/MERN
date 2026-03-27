import { useEffect, useState, useRef } from "react";
import axios from "axios";

const FetchAndAxios = () => {
    const [countries, setCountries] = useState([]);
    const tooltipInstances = useRef([]);

    useEffect(() => {
        fetchCountries();

        // Cleanup function
        return () => {
            // Destroy all tooltip instances on unmount
            tooltipInstances.current.forEach(instance => {
                if (instance && instance.dispose) {
                    instance.dispose();
                }
            });
            tooltipInstances.current = [];
        };
    }, []);

    useEffect(() => {
        // Initialize tooltips only when Bootstrap is available
        if (typeof window !== 'undefined' && window.bootstrap) {
            initializeTooltips();
        }

        // Alternative: Directly use jQuery if Bootstrap is loaded via CDN
        if (typeof window !== 'undefined' && window.$ && window.$.fn.tooltip) {
            $('[data-bs-toggle="tooltip"]').tooltip();
        }
    }, [countries]);

    const initializeTooltips = () => {
        // Clear existing tooltips
        tooltipInstances.current.forEach(instance => {
            if (instance && instance.dispose) {
                instance.dispose();
            }
        });
        tooltipInstances.current = [];

        // Initialize new tooltips
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach((tooltipTriggerEl) => {
            const tooltip = new window.bootstrap.Tooltip(tooltipTriggerEl, {
                boundary: document.body,
                html: true
            });
            tooltipInstances.current.push(tooltip);
        });
    };

    const fetchCountries = async () => {
        try {
            const res = await axios.get("https://countriesnow.space/api/v0.1/countries");
            setCountries(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    // Format cities for tooltip (prevent too long tooltips)
    const formatCitiesTooltip = (cities) => {
        const maxCitiesToShow = 20;
        if (cities.length <= maxCitiesToShow) {
            return cities.join(", ");
        }
        return `${cities.slice(0, maxCitiesToShow).join(", ")}... <br><small>+${cities.length - maxCitiesToShow} more cities</small>`;
    };

    return (
        <div className="container mt-4">
            <h4 className="text-center mb-4">Countries & Cities</h4>

            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Country</th>
                            <th>ISO2</th>
                            <th>ISO3</th>
                            <th>City List (Hover)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {countries.map((country, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{country.country}</td>
                                <td>{country.iso2}</td>
                                <td>{country.iso3}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-link p-0 border-0 text-primary"
                                        data-bs-toggle="tooltip"
                                        data-bs-html="true"
                                        data-bs-placement="right"
                                        title={formatCitiesTooltip(country.cities)}
                                    >
                                        View Cities ({country.cities.length})
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FetchAndAxios;