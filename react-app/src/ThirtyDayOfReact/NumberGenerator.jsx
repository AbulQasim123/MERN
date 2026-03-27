
const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};


export default function NumberGenerator() {
    const numbers = Array.from({ length: 32 }, (_, i) => i);
    return (
        <>
            <h4 className="text-center mt-3">Number Generator</h4>
            <div className="d-flex flex-wrap justify-content-center mt-3">
                {numbers.map((num, i) => {
                    let bg =
                        num % 2 === 0 ? "#21bf73" : "#f7dc5c";
                    if (isPrime(num)) bg = "#fd5e53";

                    return (
                        <div
                            key={i}
                            style={{
                                background: bg,
                                width: 80,
                                height: 60,
                                margin: 5,
                                borderRadius: 8,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: 28,
                                color: "#fff",
                                fontWeight: "bold",
                            }}
                        >
                            {num}
                        </div>
                    );
                })}
            </div>
        </>
    );
}