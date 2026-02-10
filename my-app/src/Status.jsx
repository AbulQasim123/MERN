const Status = (props) => {
    let status = props.status ? 'Old Enough to drive' : 'Too young for drive';
    return <p style={{ color: 'blue' }}>{status}</p>;
}

export default Status;