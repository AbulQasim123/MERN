// import '../styles/header.scss'
import headerStyles from '../styles/header.module.scss'
const { header, 'header-wrapper': headerWrapper } = headerStyles
import moment from 'moment'
import {
    TiSocialLinkedinCircular,
    TiSocialGithubCircular,
    TiSocialTwitterCircular,
} from 'react-icons/ti'
// function Header() {
//     return (
//         <header>
//             <div className='header-wrapper'>
//                 <h3>30 Days Of React</h3>
//                 <h4>Getting Started React</h4>
//                 <h5>JavaScript Library</h5>
//                 <p>Instructor: Asabeneh Yetayeh</p>
//                 <small>Oct 15, 2020</small>
//             </div>
//         </header>
//     )
// }

function Header() {
    return (
        <header className={header}>
            <div className={headerWrapper}>
                <h3>30 Days Of React</h3>
                <h4>Getting Started React</h4>
                <h5>JavaScript Library</h5>
                <p>Instructor: Asabeneh Yetayeh</p>
                <small>Oct 15, 2020</small>
            </div>
        </header>
    )
}

const Footer = () => (
    <footer>
        <div className='fw-bold fs-1 text-primary'>
            <TiSocialLinkedinCircular />
            <TiSocialGithubCircular />
            <TiSocialTwitterCircular />
        </div>
        <div className='App'>
            <h4>How to use moment</h4>
            <p>This challenge was started {moment('2020-10-01').fromNow()}</p>
            <p>The challenge will be over in {moment('2020-10-30').fromNow()}</p>
            <p>Today is {moment(new Date()).format('MMMM DD, YYYY HH:mm')}</p>
        </div>
        <div>
            <small> Copyright &copy; {new Date().getFullYear()} </small>
        </div>
    </footer>
)
function ThirdPartyPackages() {
    return (
        <div className="container mt-4">
            <h4 className="text-center mb-3">Third Party Packages</h4>
            <hr />
            <Header />
            <Footer />
        </div>
    )
}

export default ThirdPartyPackages