import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Trash3, Trophy, House, Award } from 'react-bootstrap-icons'

export default function LeaderBoard() {
    const [data, setData] = useState([])

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("leaderboard")) || []
        // Remove duplicates based on name, score, and timestamp
        const uniqueData = stored.filter((item, index, self) =>
            index === self.findIndex(t => (
                t.name === item.name &&
                t.score === item.score &&
                t.timestamp === item.timestamp
            ))
        )
        setData(uniqueData)
    }, [])

    const clearBoard = () => {
        if (window.confirm("Are you sure you want to clear the leaderboard? This action cannot be undone.")) {
            localStorage.removeItem("leaderboard")
            setData([])
        }
    }

    const getMedal = (index) => {
        switch (index) {
            case 0: return <Trophy color="gold" size={20} />
            case 1: return <Award color="silver" size={20} />
            case 2: return <Award color="#CD7F32" size={20} />
            default: return <span className="text-muted">{index + 1}</span>
        }
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-primary text-white py-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <h2 className="fw-bold mb-0">
                                    <Trophy className="me-2" />
                                    Leaderboard
                                </h2>
                                <span className="badge bg-light text-primary fs-6">
                                    Total Entries: {data.length}
                                </span>
                            </div>
                        </div>

                        <div className="card-body p-0">
                            {data.length === 0 ? (
                                <div className="text-center py-5">
                                    <div className="mb-3">
                                        <Trophy size={64} className="text-muted" />
                                    </div>
                                    <h4 className="text-muted mb-3">No Scores Yet!</h4>
                                    <p className="text-muted mb-4">Be the first to play the quiz and make it to the top!</p>
                                    <Link to="/" className="btn btn-primary btn-lg">
                                        Play Now
                                    </Link>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th className="ps-4">Rank</th>
                                                <th>Player</th>
                                                <th>Score</th>
                                                <th>Percentage</th>
                                                <th>Date & Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((entry, index) => (
                                                <tr key={`${entry.name}-${entry.timestamp || entry.date}`}
                                                    className={index < 3 ? 'table-warning' : ''}>
                                                    <td className="ps-4 fw-bold">
                                                        <div className="d-flex align-items-center gap-2">
                                                            {getMedal(index)}
                                                            <span>{index + 1}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <div className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                                                                style={{ width: '36px', height: '36px' }}>
                                                                {entry.name.charAt(0).toUpperCase()}
                                                            </div>
                                                            <span className="fw-semibold">{entry.name}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="badge bg-success rounded-pill fs-6">
                                                            {entry.score}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <div className="progress flex-grow-1 me-2" style={{ height: '6px' }}>
                                                                <div className="progress-bar bg-info"
                                                                    style={{ width: `${entry.percentage}%` }}></div>
                                                            </div>
                                                            <span className="fw-bold">{entry.percentage}%</span>
                                                        </div>
                                                    </td>
                                                    <td className="text-muted">
                                                        <small>{entry.date}</small>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                        <div className="card-footer bg-light py-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <button
                                    className="btn btn-danger"
                                    onClick={clearBoard}
                                    disabled={data.length === 0}
                                >
                                    <Trash3 className="me-2" />
                                    Clear Leaderboard
                                </button>

                                <Link to="/" className="btn btn-primary">
                                    <House className="me-2" />
                                    Back to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}