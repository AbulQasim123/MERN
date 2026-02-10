export default function QuestionCard({
    question,
    options,
    onSelect,
    selectedOption,
    correctAnswer
}) {
    const getButtonClass = (option) => {
        if (!selectedOption) return "btn btn-outline-primary"

        if (option === correctAnswer) {
            return "btn btn-success"
        } else if (option === selectedOption && option !== correctAnswer) {
            return "btn btn-danger"
        } else {
            return "btn btn-outline-secondary"
        }
    }

    return (
        <div className="card shadow-lg border-0 mb-4">
            <div className="card-header bg-white border-bottom-0 pt-4">
                <h3 className="fw-bold text-dark">{question}</h3>
            </div>
            <div className="card-body p-4">
                <div className="row g-3">
                    {options.map((opt, i) => (
                        <div className="col-12" key={i}>
                            <button
                                className={`${getButtonClass(opt)} w-100 py-3 text-start`}
                                onClick={() => onSelect(opt)}
                                disabled={selectedOption !== null}
                            >
                                <div className="d-flex align-items-center">
                                    <div className="me-3">
                                        {String.fromCharCode(65 + i)}.
                                    </div>
                                    <div className="flex-grow-1">{opt}</div>
                                    {selectedOption && opt === correctAnswer && (
                                        <div className="ms-2">✓</div>
                                    )}
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}