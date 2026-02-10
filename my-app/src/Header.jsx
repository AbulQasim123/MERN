
const Header = ({ data: { welcome, title, subtitle, author: { firstName, lastName }, date } }) => {
    // const welcome = 'Welcome to 30 Days Of React'
    // const title = 'Getting Started React'
    // const subtitle = 'JavaScript Library'
    // const author = {
    //     firstName: 'AbulQasim',
    //     lastName: 'Ansari',
    // }
    // const date = '03 Jan 2001'

    return (
        <header>
            <div className='header-wrapper'>
                <h1 style={{ textAlign: 'center' }}>{welcome}</h1>
                <h2>{title}</h2>
                <h3>{subtitle}</h3>
                <p>{firstName} {lastName}</p>
                <small>{date.toString()}</small>
            </div>
        </header>
    )
}

export default Header
