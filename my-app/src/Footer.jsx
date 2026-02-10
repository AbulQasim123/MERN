const Footer = ({ copyRight }) => {
    return (
        <footer>
            <div className='footer-wrapper'>
                <p>copyright {copyRight.getFullYear()}</p>
            </div>
        </footer>
    )
}

export default Footer
