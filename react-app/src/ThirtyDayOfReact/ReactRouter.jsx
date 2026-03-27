import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink,
    Navigate,
    useParams,
} from "react-router-dom";

// ---------------- Pages ----------------

const Home = () => <h4 className="mb-4">Welcome Home</h4>;
const About = () => <h4 className="mb-4">About Us</h4>;
const Contact = () => <h4 className="mb-4">Contact Us</h4>;
const NotFound = () => <h4 className="text-danger">Page Not Found</h4>;

// ------------ Dummy Data --------------

const challenges = [
    {
        name: '30 Days Of Python',
        description:
            '30 Days of Python challenge is a step by step guide to learn Python in 30 days.',
        status: 'completed',
        days: 30,
        level: 'Beginners to Advanced',
        duration: '20 Nov 2019 - 20 Dec 2019',
        slug: 'pyhton',
        url:
            'https://github.com/https://https://github.com/AbulQasim/30-Days-Of-Python.com/AbulQasim/30-Days-Of-JavaScript/30-Days-Of-React',
        author: {
            firstName: 'AbulQasim',
            lastName: 'Ansari',
        },
    },
    {
        name: '30 Days Of JavaScript',
        description:
            '30 Days of JavaScript challenge is a step by step guide to learn JavaScript in 30 days.',
        status: 'completed',
        days: 30,
        level: 'Beginners to Advanced',
        duration: '1 Jan 2020 - 30 Jan 2020',
        slug: 'javascript',
        url: 'https://github.com/AbulQasim/30-Days-Of-JavaScript',
        author: {
            firstName: 'AbulQasim',
            lastName: 'Ansari',
        },
    },
    {
        name: '30 Days Of React',
        description:
            '30 Days of React challenge is a step by step guide to learn React in 30 days.',
        status: 'ongoing',
        days: 30,
        level: 'Beginners to Advanced',
        duration: '1 Oct 2020- 30 Oct 2020',
        slug: 'react',
        url: 'https://github.com/AbulQasim/30-Days-Of-React',
        author: {
            firstName: 'AbulQasim',
            lastName: 'Ansari',
        },
    },
    {
        name: '30 HTML and CSS',
        description:
            '30 Days of HTML and CSS challenge is a step by step guide to learn HTML and CSS in 30 days.',

        status: 'coming',
        days: 30,
        level: 'Beginners to Advanced',
        duration: '',
        slug: 'html-and-css',
        url: '',
        author: {
            firstName: 'AbulQasim',
            lastName: 'Ansari',
        },
    },
    {
        name: '30 ReactNative',
        description:
            '30 Days of ReactNative challenge is a step by step guide to learn ReactNative in 30 days.',
        status: 'coming',
        days: 30,
        level: 'Beginners to Advanced',
        duration: '',
        slug: 'reactnative',
        url: '',
        author: {
            firstName: 'AbulQasim',
            lastName: 'Ansari',
        },
    },
    {
        name: '30 Data Analysis',
        description:
            '30 Days of Data Analysis challenge  is a step by step guide to learn about data, data visualization and data analysis in 30 days.',
        status: 'coming',
        days: 30,
        level: 'Beginners to Advanced',
        duration: '',
        slug: 'data-analysis',
        url: '',
        author: {
            firstName: 'AbulQasim',
            lastName: 'Ansari',
        },
    },
    {
        name: '30 Machine Learning',
        description:
            '30 Days of Machine learning challenge  is a step by step guide to learn data cleaning, machine learning models and predictions in 30 days.',
        status: 'coming',
        days: 30,
        level: 'Beginners to Advanced',
        duration: '',
        slug: 'machine-learning',
        url: '',
        author: {
            firstName: 'AbulQasim',
            lastName: 'Ansari',
        },
    },
]

// ---------- Single Challenge Box ---------

const Challenge = ({ challenge }) => {
    const {
        name,
        description,
        days,
        level,
        duration,
        author: { firstName, lastName }
    } = challenge;

    return (
        <div className="card shadow-sm mt-4">
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>

                <p className="mb-1"><strong>Level:</strong> {level}</p>
                <p className="mb-1"><strong>Author:</strong> {firstName} {lastName}</p>

                {duration && <small className="text-muted">{duration}</small>}

                <div className="mt-2">
                    <span className="badge bg-primary">Days: {days}</span>
                </div>
            </div>
        </div>
    );
};

// -------------- Challenges Page ---------------------

const Challenges = () => {
    const { slug } = useParams();
    const challenge = challenges.find((c) => c.slug === slug);

    return (
        <div className="container mt-4">
            <h4 className="mb-4">30 Days of Challenges</h4>

            {/* Challenge Menu */}
            <div className="row">
                <div className="col-md-4">
                    <ul className="list-group">
                        {challenges.map(({ name, slug }) => (
                            <NavLink
                                key={slug}
                                to={`/challenges/${slug}`}
                                className="list-group-item list-group-item-action"
                            >
                                {name}
                            </NavLink>
                        ))}
                    </ul>
                </div>

                <div className="col-md-8">
                    {!slug && (
                        <h4 className="text-muted mt-3">Choose any challenge from left side</h4>
                    )}

                    {slug && challenge ? (
                        <Challenge challenge={challenge} />
                    ) : (
                        slug && <h4 className="text-danger mt-3">Challenge not found</h4>
                    )}
                </div>
            </div>
        </div>
    );
};

// ---------------- Navbar ---------------------

const Navbar = ({ username }) => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">React Router Demo</NavLink>

            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/about">About</NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/contact">Contact</NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to={`/user/${username}`}>User</NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/challenges">Challenges</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

// ---------------- User Page --------------------

const User = ({ isLoggedIn, handleLogin }) => {
    const { username } = useParams();

    return (
        <div className="container mt-4">
            {isLoggedIn ? (
                <>
                    <h5>Welcome {username}</h5>
                    <p>You can now access all challenges</p>
                </>
            ) : (
                <p>Please login to access the content</p>
            )}

            <button
                className="btn btn-primary mt-3"
                onClick={handleLogin}
            >
                {isLoggedIn ? "Logout" : "Login"}
            </button>
        </div>
    );
};

// ---------------- Login Page -----------------------

const Welcome = ({ isLoggedIn, handleLogin }) => (
    <div className="container mt-4">
        <h3>{isLoggedIn ? "Welcome to Dashboard" : "Please Login"}</h3>

        <button className="btn btn-success mt-3" onClick={handleLogin}>
            {isLoggedIn ? "Logout" : "Login"}
        </button>
    </div>
);

// ===================== MAIN ROUTER =====================

export default function ReactRouter() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [firstName] = useState("AbulQasim");

    const handleLogin = () => setIsLoggedIn(!isLoggedIn);

    return (
        <Router>
            <Navbar username={firstName} />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                <Route
                    path="/user/:username"
                    element={
                        <User isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
                    }
                />

                <Route
                    path="/login"
                    element={
                        <Welcome isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
                    }
                />

                {/* Protected Route */}
                <Route
                    path="/challenges/:slug?"
                    element={
                        isLoggedIn ? <Challenges /> : <Navigate to="/user/AbulQasim" />
                    }
                />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}
