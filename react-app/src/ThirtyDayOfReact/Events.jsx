import { useState } from "react";

function Events() {
    const [state, setState] = useState({
        firstName: "",
        message: "",
        key: ""
    });

    // Click event
    const handleClick = () => {
        setState((prev) => ({
            ...prev,
            message: "Welcome to the world of events"
        }));
    };

    // Mouse move event
    const handleMouseMove = () => {
        console.log("Mouse is moving on the button");
    };

    // Copy event
    const handleCopy = () => {
        alert("You cannot copy this text!");
    };

    // Key press event
    const handleKeyPress = (e) => {
        setState((prev) => ({
            ...prev,
            key: `Last key pressed: ${e.key}`
        }));
    };

    // Blur event
    const handleBlur = () => {
        alert("Input field lost focus (blur event triggered)");
    };

    // Form change event
    const handleChange = (e) => {
        setState((prev) => ({
            ...prev,
            firstName: e.target.value
        }));
    };

    // Form submit event
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Form submitted! Name: ${state.firstName}`);
    };

    return (
        <div>
            <h4 className="text-center mb-3">Welcome to the World of Events</h4>

            {/* Click */}
            <button className="btn btn-primary btn-sm m-1" onClick={handleClick}>Click Me</button>

            {/* Mouse Move */}
            <button className="btn btn-primary btn-sm" onMouseMove={handleMouseMove}>Move mouse on me</button>

            {/* Copy */}
            <p onCopy={handleCopy}>
                Check copy right permission by copying this text
            </p>

            <p>{state.message}</p>
            <p>{state.key}</p>

            {/* Key Press */}
            <label>Test for onKeyPress Event: </label>
            <input type="text" className="form-control" onKeyPress={handleKeyPress} />
            <br />

            {/* Blur */}
            <label>Test for onBlur Event: </label>
            <input type="text" className="form-control" onBlur={handleBlur} />
            <br />

            {/* FORM */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name: </label>
                    <input
                        onChange={handleChange}
                        name="firstName"
                        className="form-control mb-3"
                        value={state.firstName}
                    />
                </div>

                <div>
                    <input className="btn btn-primary btn-sm" type="submit" value="Submit" />
                </div>
            </form>
        </div>
    );
}

export default Events;
