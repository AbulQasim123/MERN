// import './App.css'
import Header from './Header'
import showDate from './showDate'
import Master from './Master'
import Footer from './Footer'
import Skills from './Skills'
import Age from './Age'
import Weight from './Weight'
import Status from './Status'
import FrontEndTech from './FrontEndTech'
import Subscribe from './Subscribe'
import ColorGenerator from './ColorGenerator'
import Numbers from './Numbers'
import Countries from './Countries'

function App() {
    const data = {
        welcome: 'Welcome to 30 Days Of React',
        title: 'Getting Started React',
        subtitle: 'JavaScript Library',
        author: {
            firstName: 'AbulQasim',
            lastName: 'Ansari',
        },
        date: new Date(),
    }

    const date = new Date;
    const techs = ['HTML', 'CSS', 'JavaScript']

    const handleTime = () => {
        alert(showDate(new Date()));
        console.log("I understood, I can learn ReactJS");
    }

    const greetPeople = () => {
        alert('Welcome to 30 Days Of React Challenge, 2020');
        console.log("I understood, I can learn ReactJS, I need to Practice More");
    }

    const numbers = [1, 2, 3, 4, 5];

    const skills = [
        ['HTML', 10],
        ['CSS', 7],
        ['JavaScript', 9],
        ['React', 8],
    ]

    const countries = [
        { name: 'India', city: 'Mumbai' },
        { name: 'Finland', city: 'Helsinki' },
        { name: 'Sweden', city: 'Stockholm' },
        { name: 'Denmark', city: 'Copenhagen' },
        { name: 'Norway', city: 'Oslo' },
        { name: 'Iceland', city: 'Reykjavík' },
        { name: 'Estonia', city: 'Tallinn' },
    ]


    return (
        <div className='app'>
            <Header data={data} />
            <Master user={data.author} techs={techs} greetPeople={greetPeople} handleTime={handleTime} />
            <Age age={25} />
            <Weight weight={50} />
            <Status status={true} />
            <Skills skills={['HTML', 'CSS', 'JavaScript']} />
            <Footer copyRight={date} />
            <div>
                <h1>Numbers List</h1>
                {[1, 2, 3, 4, 5]}
            </div>
            <Numbers numbers={numbers} skills={skills} />
            {/* Horizontal Line For Break Code */}
            <hr className='text-danger border-5' />
            <FrontEndTech />
            <Subscribe />
            <ColorGenerator />
            <Countries countries={countries} />
        </div>
    )
}

export default App
