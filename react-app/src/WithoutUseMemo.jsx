import { useState } from 'react'

function WithoutUseMemo() {
    const [count , setCount] = useState(0)
    const [text , setText] = useState("")

    const expensiveCalculation = () => {
        console.log("Running expensive calculation...")
        let total = 0;
        for(let i = 0; i < 100000000; i++){
            total += i;
        }

        return total;
    }

    const result = expensiveCalculation();

  return (
    <div>
        <h4>Result : {result}</h4>
        <button className='btn btn-primary btn-sm mb-2' onClick={() => setCount(count + 1)}>Increase Count</button>
        <input className='form-control' type="text" value={text} 
        onChange={(e) => setText(e.target.value)}  />
        <p>Count : {count}</p>
    </div>
  )
}

export default WithoutUseMemo