import { useState } from "react"

function LikeButton() {
	const [liked, setLiked] = useState(false)
	const [text, setText] = useState("Are you really like me ?")
	function handleLike() {
		setLiked(!liked)
		setText(liked ? "Are you really like me ?" : "Thanks for liking me")
	}
	return (
		<div className="container mt-4" style={{ height: '200px', border: "1px solid black" }}>
			<h4>Like Button</h4>
			<button className="btn btn-sm btn-primary m-1" onClick={handleLike}>
				{liked ? "❤️ Liked" : "🤍 Like"}
			</button>
			<p className="text-center">{text}</p>
		</div>
	)
}

export default LikeButton 