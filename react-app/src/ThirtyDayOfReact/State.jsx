import { useState } from "react";

function State() {
    const [count, setCount] = useState(0);
    const [bgColor, setBgColor] = useState("#f7f7f7");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const showDate = (time) => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return `${months[time.getMonth()].slice(0, 3)} ${time.getDate()}, ${time.getFullYear()}`;
    };

    const addOne = () => setCount(count + 1);
    const minusOne = () => setCount(count - 1);
    const toggleLogin = () => setIsLoggedIn(!isLoggedIn);
    const handleTime = () => alert(showDate(new Date()));
    const greetPeople = () => alert("Welcome to 30 Days Of React Challenge, 2025");

    // Background changer
    const changeBackground = () => {
        const colors = ["#f7f7f7", "#d0f0fd", "#ffe6e6", "#e8ffe8", "#fff4d6"];
        const random = Math.floor(Math.random() * colors.length);
        setBgColor(colors[random]);
    };

    const data = {
        welcome: "Welcome to 30 Days Of React",
        title: "Getting Started React",
        subtitle: "JavaScript Library",
        author: { firstName: "Abul", lastName: "Qasim" },
        date: "Nov 27, 2025",
    };

    const techs = ["HTML", "CSS", "JavaScript"];
    const date = new Date();
    const user = { ...data.author, image: "https://avatars.githubusercontent.com/u/64021312?v=4" };

    if (!isLoggedIn) return <button className="btn btn-primary btn-sm" onClick={toggleLogin}>Login</button>;
    return (
        <div className="state" style={{ background: bgColor, padding: "10px" }}>
            <div>
                <Header data={data } toggleLogin={toggleLogin} />
                <Main
                    user={user}
                    techs={techs}
                    handleTime={handleTime}
                    greetPeople={greetPeople}
                    changeBackground={changeBackground}
                    addOne={addOne}
                    minusOne={minusOne}
                    count={count}
                />
                <Footer date={date} />
            </div>
        </div>
    );
}

function Header({ data, toggleLogin }) {
    const { welcome, title, subtitle, date, author: { firstName, lastName } } = data;

    return (
        <header style={headerStyle}>
            <button className="btn btn-danger btn-sm" onClick={toggleLogin}>Logout</button>
            <h4>{welcome}</h4>
            <h5>{title}</h5>
            <h6 style={{ marginBottom: "6px" }}>{subtitle}</h6>
            <p>{firstName} {lastName}</p>
            <small>{date}</small>
        </header>
    );
}

function Main({ techs, user, handleTime, greetPeople, changeBackground, addOne, minusOne, count }) {
    return (
        <main style={mainStyle}>
            <p style={{ fontWeight: "bold" }}>Prerequisites to get started with React:</p>
            <ul>
                <TechList techs={techs} />
            </ul>

            <UserCard user={user} />

            <div style={{ marginTop: "20px" }}>
                <Buttons text="Greet People" onClick={greetPeople} />
                <Buttons text="Show Time" onClick={handleTime} />
                <Buttons text="Change Background" onClick={changeBackground} />
            </div>

            <Count count={count} addOne={addOne} minusOne={minusOne} />
        </main>
    );
}

function Footer({ date }) {
    return (
        <footer style={footerStyle}>
            <p>Copyright {date.getFullYear()}</p>
        </footer>
    );
}

function Count({ count, addOne, minusOne }) {
    return (
        <div style={{ marginTop: "20px" }}>
            <h4>Count : {count}</h4>
            <Buttons className="btn btn-primary btn-sm" text="+1" onClick={addOne} />
            <Buttons className="btn btn-danger btn-sm" text="-1" onClick={minusOne} />
        </div>
    );
}

function TechList({ techs }) {
    return techs.map((tech, index) => (
        <li className="badge bg-primary m-1" key={index}>{tech}</li>
    ));
}

function UserCard({ user: { firstName, lastName, image } }) {
    return (
        <div >
            <img src={image} alt={firstName} style={avatarStyle} />
            <h6>{firstName} {lastName}</h6>
        </div>
    );
}

function Buttons({ text, onClick }) {
    return <button className="btn btn-primary btn-sm m-1" onClick={onClick}>{text}</button>;
}

const headerStyle = { textAlign: "center", marginBottom: "20px" };
const mainStyle = { textAlign: "center" };
const footerStyle = { textAlign: "center", marginTop: "20px", opacity: 0.7 };

const avatarStyle = {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    marginBottom: "10px"
};


export default State;
