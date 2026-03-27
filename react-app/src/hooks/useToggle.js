import { useState } from "react"
function useToggle(initiateVAlue = false) {
	const [value, setValue] = useState(initiateVAlue)
	const toggle = () => setValue(prev => !prev)
	return [value, toggle]
}

export default useToggle