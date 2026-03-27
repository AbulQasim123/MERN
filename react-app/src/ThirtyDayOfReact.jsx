import React from "react";
import NumberGenerator from "./ThirtyDayOfReact/NumberGenerator";
import HexColors from "./ThirtyDayOfReact/HexColors";
import PopulationChart from "./ThirtyDayOfReact/PopulationChart";
import Country from "./ThirtyDayOfReact/Country";
import State from "./ThirtyDayOfReact/State";
import SeasonBackground from "./ThirtyDayOfReact/SeasonBackground";
import TimeBackground from "./ThirtyDayOfReact/TimeBackground";
import Events from "./ThirtyDayOfReact/Events";
import Forms from "./ThirtyDayOfReact/Forms";
import UncontrolledInput from "./ThirtyDayOfReact/UncontrolledInput";
import ThirdPartyPackages from "./ThirtyDayOfReact/ThirdPartyPackages";
import HOC from "./ThirtyDayOfReact/HOC";
import ReactRouter from "./ThirtyDayOfReact/ReactRouter";
import FetctAndAxios from "./ThirtyDayOfReact/FetctAndAxios";
import FirstProjects from "./ThirtyDayOfReact/FirstProjects";


function ThirtyDayOfReact() {
    return (
        <>
            <div
                className="container mt-4 p-4 rounded shadow"
                style={{ background: "#fff", border: "1px solid black" }}
            >
                <h4 className="text-center mb-3">30 Days Of React</h4>

                <div className="row">
                    <div className="col-md-6">
                        <NumberGenerator />
                    </div>
                    <div className="col-md-6">
                        <HexColors />
                    </div>
                    <div className="col-md-6">
                        <PopulationChart />
                    </div>
                    <div className="col-md-6">
                        <Country />
                        <State />
                    </div>
                    <div className="col-md-6">
                        <SeasonBackground />
                        <TimeBackground />
                        <Events />
                        <HOC />
                    </div>
                    <div className="col-md-6">
                        <Forms />
                    </div>
                    <div className="col-md-6">
                        <UncontrolledInput />
                    </div>
                    <div className="col-md-6">
                        <ThirdPartyPackages />
                    </div>
                    <div className="col-md-12">
                        <FirstProjects />
                    </div>
                    <div className="col-md-12">
                        <ReactRouter />
                    </div>
                    <div className="col-md-12">
                        <FetctAndAxios />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ThirtyDayOfReact;
