import { useState } from "react";

function SeasonBackground() {
    const [season, setSeason] = useState("");

    const seasonColors = {
        Autumn: "#d35400",
        Winter: "#3498db",
        Spring: "#2ecc71",
        Summer: "#f1c40f"
    };

    const changeSeason = (s) => {
        setSeason(s);
        document.body.style.background = seasonColors[s];
    };

    return (
        <div style={{ padding: "20px" }}>
            <h4 className="text-center mb-3">Select Season</h4>

            <button className="btn btn-primary btn-sm m-1" onClick={() => changeSeason("Autumn")}>Autumn</button>
            <button className="btn btn-primary btn-sm m-1" onClick={() => changeSeason("Winter")}>Winter</button>
            <button className="btn btn-primary btn-sm m-1" onClick={() => changeSeason("Spring")}>Spring</button>
            <button className="btn btn-primary btn-sm m-1" onClick={() => changeSeason("Summer")}>Summer</button>

            {season && <h5>Season Selected: {season}</h5>}
        </div>
    );
}

export default SeasonBackground;
