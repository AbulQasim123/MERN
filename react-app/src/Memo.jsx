import WithoutUseMemo from "./WithoutUseMemo";
import WithUseMemo from "./WithUseMemo";
import MemoParent from "./MemoParent";

function Memo() {
    return (
        <div className="container mt-4 p-4 rounded shadow" style={{ maxWidth: "500px", background: "#fff", border: "1px solid black" }}>
            <h4 className="text-center mb-3">use Memo</h4>

            <MemoParent />
            {/* <WithUseMemo /> */}
            {/* <WithoutUseMemo /> */}
        </div>
    )
}

export default Memo