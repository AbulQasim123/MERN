import Country from './Country';

function Countries({ countries }) {
    return (
        <div className='container'>
            <h4 className='text-center'>Countries With Cities</h4>
            <table className="table table-bordered table-hover table-striped text-center">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Country</th>
                        <th>City</th>
                    </tr>
                </thead>
                <tbody>
                    {countries.map((country, index) => (
                        <Country key={country.name} index={index + 1} country={country} />
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3">Total Countries: {countries.length}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default Countries;
