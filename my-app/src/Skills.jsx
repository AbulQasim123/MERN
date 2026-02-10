const Skills = (props) => {
    const skillList = props.skills.map((skill, index) => <li key={index}>{skill}</li>);
    return (
        <div>
            <h3>Skills</h3>
            <ul>
                {skillList}
            </ul>
        </div>
    );
}

export default Skills;