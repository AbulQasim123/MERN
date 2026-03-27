const tenHighestPopulation = [
    { country: "World", population: 7693165599 },
    { country: "India", population: 1463865525 },
    { country: "China", population: 1416096094 },
    { country: "United States", population: 323947000 },
    { country: "Indonesia", population: 258705000 },
    { country: "Brazil", population: 206135893 },
    { country: "Pakistan", population: 194125062 },
    { country: "Nigeria", population: 186988000 },
    { country: "Bangladesh", population: 161006790 },
    { country: "Russia", population: 146599183 },
    { country: "Japan", population: 126960000 },
];

export default function PopulationChart() {
    const maxPop = tenHighestPopulation[0].population;

    return (
        <>
            <h4 className="text-center mt-3">World Population</h4>
            <p className="text-center">Ten most populated countries</p>

            <div className="mt-4" style={{ width: "80%", margin: "auto" }}>
                {tenHighestPopulation.map((item, i) => {
                    const barWidth = (item.population / maxPop) * 100;

                    return (
                        <div
                            key={i}
                            className="d-flex align-items-center mb-2"
                            style={{ fontSize: 18 }}
                        >
                            <div style={{ width: 120, fontWeight: "bold" }}>
                                {item.country.toUpperCase()}
                            </div>

                            <div
                                style={{
                                    height: 30,
                                    width: `${barWidth}%`,
                                    background: "#f5a623",
                                    marginRight: 10,
                                    borderRadius: 5,
                                }}
                            ></div>

                            <div>{item.population.toLocaleString()}</div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}