import useToggle from "./hooks/useToggle"
function ToggleTest() {
	const [isOpen, toggleOpen] = useToggle();
	const [isTest, toggleTest] = useToggle();
	return (
		<div>
			<div>
				<button className="btn btn-primary btn-sm" onClick={toggleOpen}>Toggle</button>
				{isOpen && <p>Hello, this is visiable</p>}
			</div>
			<div>
				<button className="btn btn-primary btn-sm" onClick={toggleTest}>Toggle Test</button>
				{isTest && <p>Hello, this is visiable</p>}
			</div>
		</div>
	)
}

export default ToggleTest