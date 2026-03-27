const generateHexColor = () => {
    const digits = "0123456789abcdef";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += digits[Math.floor(Math.random() * 16)];
    }
    return color;
};


export default function HexColors() {
    const colors = Array.from({ length: 30 }, () => generateHexColor());

    return (
        <>
            <h4 className="text-center mt-3">Hexadecimal Colors</h4>
            <div className="d-flex flex-wrap justify-content-center mt-3">
                {colors.map((hex, i) => (
                    <div
                        key={i}
                        style={{
                            background: hex,
                            width: 80,
                            height: 60,
                            margin: 5,
                            borderRadius: 8,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#fff",
                            fontWeight: "bold",
                        }}
                    >
                        {hex}
                    </div>
                ))}
            </div>
        </>
    );
}