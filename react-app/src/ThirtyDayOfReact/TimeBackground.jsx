import { useState } from "react";

function TimeBackground() {
    const [time, setTime] = useState("");

    const timeColors = {
        Morning: "#ffeaa7",
        Noon: "#74b9ff",
        Evening: "#fdcb6e",
        Night: "#2d3436"
    };

    const changeTime = (t) => {
        setTime(t);
        document.body.style.background = timeColors[t];
    };

    return (
        <div style={{ padding: "20px" }}>
            <h4 className="text-center mb-3">Select Time of the Day</h4>

            <button className="btn btn-primary btn-sm m-1" onClick={() => changeTime("Morning")}>Morning</button>
            <button className="btn btn-primary btn-sm m-1" onClick={() => changeTime("Noon")}>Noon</button>
            <button className="btn btn-primary btn-sm m-1" onClick={() => changeTime("Evening")}>Evening</button>
            <button className="btn btn-primary btn-sm m-1" onClick={() => changeTime("Night")}>Night</button>

            {time && <h5>Time Selected: {time}</h5>}
        </div>
    );
}

export default TimeBackground;
