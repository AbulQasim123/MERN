
const Button = ({ onClick, text, style }) => {
    return (
        <button onClick={onClick} style={style}>
            {text}
        </button>
    );
};

const buttonWithStyles = (WrappedComponent, name = "default") => {
    const colors = [
        {
            name: "default",
            backgroundColor: "#e7e7e7",
            color: "#000000",
        },
        {
            name: "react",
            backgroundColor: "#61dbfb",
            color: "#ffffff",
        },
        {
            name: "success",
            backgroundColor: "#4CAF50",
            color: "#ffffff",
        },
        {
            name: "info",
            backgroundColor: "#2196F3",
            color: "#ffffff",
        },
        {
            name: "warning",
            backgroundColor: "#ff9800",
            color: "#ffffff",
        },
        {
            name: "danger",
            backgroundColor: "#f44336",
            color: "#ffffff",
        },
    ];

    const { backgroundColor, color } = colors.find((c) => c.name === name);

    const buttonStyles = {
        backgroundColor,
        padding: "10px 45px",
        border: "none",
        borderRadius: 3,
        margin: 3,
        cursor: "pointer",
        fontSize: "1.25rem",
        color,
    };

    return (props) => {
        return <WrappedComponent {...props} style={buttonStyles} />;
    };
};


const DefaultButton = buttonWithStyles(Button);
const ReactButton = buttonWithStyles(Button, "react");
const InfoButton = buttonWithStyles(Button, "info");
const WarningButton = buttonWithStyles(Button, "warning");
const DangerButton = buttonWithStyles(Button, "danger");
const SuccessButton = buttonWithStyles(Button, "success");


const HOC = () => {
    return (
        <div className="App">
            <h4 className="text-center mb-3">Higher Order Components</h4>

            <Button text="No Style" onClick={() => alert("I am not styled yet")} />

            <DefaultButton
                text="Styled Button"
                onClick={() => alert("Default styled button")}
            />
            <ReactButton text="React" onClick={() => alert("React Color Button")} />
            <InfoButton text="Info" onClick={() => alert("Info style")} />
            <SuccessButton text="Success" onClick={() => alert("Success!")} />
            <WarningButton text="Warning" onClick={() => alert("Warning!!!")} />
            <DangerButton text="Danger" onClick={() => alert("Danger Zone")} />
        </div>
    );
};

export default HOC;
    