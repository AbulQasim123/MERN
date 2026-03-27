import { useState } from "react"


function UserProfile() {
    const [name, setName] = useState("Guest")
    const [age, setAge] = useState(18)

    function GenerateRandomName() {
        const adjectives = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy"]
        const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake"]
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
        const noun = nouns[Math.floor(Math.random() * nouns.length)]
        return adjective + noun
    }

    function GenerateRandomAge() {
        return Math.floor(Math.random() * 100)
    }
  return (
    <div className="container mt-4" style={{ height: '200px', border: "1px solid black"}}>
        <h4>User Profile</h4>
        <p>Name: {name}</p>
        <p>Age: {age}</p>
        <button className="btn btn-sm btn-primary m-1" onClick={() => setName(GenerateRandomName())}>Change Name</button>
        <button className="btn btn-sm btn-primary m-1" onClick={() => setAge(GenerateRandomAge())}>Change Age</button>  
    </div>
  )
}

export default UserProfile