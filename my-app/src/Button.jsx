const Button = ({ text, onclick, style }) => {
    return (
        <button style={style} onClick={onclick}>
            {text}
        </button>
    )
}

export default Button;