import React, { useState, useMemo } from 'react'

function MemoParent() {
	const [count, setCount] = useState(0)

	const user = useMemo(() => ({ name: "Qasim", age: 24 }), []);
	console.log('Parent Rendored')
	return (
		<div>
			<h4>Parent Count : {count}</h4>
			<button className="btn btn-primary btn-sm" onClick={() => setCount(count + 1)}>Increase Count</button>
			<Child user={user} />
		</div>
	)
}

const Child = React.memo(({ user }) => {
	console.log("Child Rendered")
	return <h4>User : {user.name} </h4>
})

export default MemoParent