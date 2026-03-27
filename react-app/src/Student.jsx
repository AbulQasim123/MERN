import { useState } from "react"
function Student() {
    const [student, setStudent] = useState({
        name: "John Doe",
        age: 20,
        city: "Delhi"
    });

    function randomCity() {
        const cities = ["Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore"];
        return cities[Math.floor(Math.random() * cities.length)];
    }

    function randomAge() {
        return Math.floor(Math.random() * 100);
    }

    function randomName() {
        const adjectives = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy"];
        const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake"];
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        return adjective + noun;
    }

    const changeCity = () => {
        let result = confirm("Are you sure you want to change the Student details?")
        if (result) {
            setStudent({
                name: randomName(),
                age: randomAge(),
                city: randomCity()
            })
            alert("Student details changed Successfully")
        } else {
            alert("Student details not changed")
        }
    }


    return (
        <div className="container mt-4" style={{ height: '200px', border: "1px solid black" }}>
            <h4>Student Details</h4>
            <p className="">Name:- {student.name}</p>
            <p className="">Age:- {student.age}</p>
            <p className="">City:- {student.city}</p>
            <button className="btn btn-sm btn-primary m-1" onClick={changeCity}>Change Student Details</button>
        </div>
    )
}

export default Student