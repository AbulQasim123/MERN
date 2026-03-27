import useForm from "./hooks/useForm"

function LoginForm() {
	const initialValues = {
		email: "",
		password: ""
	}

	const onSubmit = (values) => {
		console.log(`Form Data: ${JSON.stringify(values)}`)
	}

	const {
		values,
		handleChange,
		handleSubmit,
		resetForm
	} = useForm(initialValues, onSubmit)
	return (
		<form onSubmit={handleSubmit}>
			<input
				type="email"
				name="email"
				className="form-control mb-2"
				placeholder="Email"
				value={values.email}
				onChange={handleChange}
			/>
			<input
				type="password"
				name="password"
				className="form-control mb-2"
				placeholder="Password"
				value={values.password}
				onChange={handleChange}
			/>
			<button className="btn btn-primary btnn-sm m-1" type="submit">Submit</button>
			<button className="btn btn-primary btnn-sm" onClick={resetForm}>Reset</button>

		</form>
	)
}

export default LoginForm