const generateHexColor = () => {
    const str = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += str[Math.floor(Math.random() * 16)];
    }
    return color;
};

function ColorGenerator() {
    const colors = Array.from({ length: 6 }, generateHexColor);

    return (
        <div className="container my-5">
            {colors.map((color, index) => (
                <div
                    key={index}
                    className="rounded-3 text-center fw-bold py-3 mb-3"
                    style={{ backgroundColor: color, color: "white" }}>
                    {color}
                </div>
            ))}
        </div>
    );
}

export default ColorGenerator;
