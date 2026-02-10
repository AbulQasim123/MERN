import React from 'react'

function TechList() {
    const techs = ['HTML', 'CSS', 'JAVASCRIPT']
    return (
        <ul>
            {techs.map((tech) => (
                <li key={tech}>{tech}</li>
            ))}
        </ul>
    )
}

export default TechList
