function Child({ handleClick }) {
    console.log("Child Rendered")
    return <button className="btn btn-sm btn-primary" onClick={handleClick}>Child Button</button>
}

export default Child