const Numbers = ({ numbers, skills }) => {
    return (
        <div>
            <ul>
                {numbers.map((num, index) => (
                    <li key={index}>{num}</li>
                ))}
            </ul>

            <h3>Skills</h3>
            <ul>
                {skills.map(([skill, level], index) => (
                    <li key={index}>
                        {skill} – Level {level}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Numbers;
