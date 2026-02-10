function Country({ index, country: { name, city } }) {
    return (
        <tr>
            <td>{index}</td>
            <td>{name}</td>
            <td>{city}</td>
        </tr>
    );
}

export default Country;
