import { useState, useEffect, useEffectEvent } from "react"
function AutoSaveForm() {
	const [formData, setFormData] = useState({ name: "", email: "" })
	const saveData = useEffectEvent(() => {
		console.log(`Form Data ${JSON.stringify(formData)}`)
	})

	useEffect(() => {
		const interval = setInterval(() => {
			saveData();
		}, 10000)

		return () => clearInterval(interval)
	}, [])

	return (
		<div className="row col-md-3">
			<form>
				<input type="text" className="form-control m-3" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

				<input type="email" className="form-control m-3" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
			</form>
		</div>
	)
}

export default AutoSaveForm