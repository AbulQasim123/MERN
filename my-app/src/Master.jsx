import TechList from "./TechList";
import UserCard from "./UserCard";
import Button from "./Button";
const buttonStyles = {
    backgroundColor: '#61dbfb',
    padding: 10,
    border: 'none',
    borderRadius: 5,
    margin: 3,
    cursor: 'pointer',
    fontSize: 18,
    color: 'white',
}

const Master = ({ user, techs, greetPeople, handleTime }) => (
    <main>
        <div className='main-wrapper'>
            <p>Prerequisite to get started react.js:</p>
            <ul>
                <TechList techs={techs} />
            </ul>
            <UserCard user={user} />
            <Button text="Greet People" onclick={greetPeople} style={buttonStyles} />
            <Button text="Show Time" onclick={handleTime} style={buttonStyles} />
        </div>
    </main>
)

export default Master;