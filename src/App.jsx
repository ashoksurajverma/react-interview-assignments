import { useState, useEffect, useRef } from 'react'

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const formateTime = (ms) => {
    const minutes = Math.floor(ms / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((ms %60000)/ 1000).toString().padStart(2, '0');
    const milliseconds = Math.floor((ms % 1000)/ 10).toString().padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
  }
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev + 10);
      }, 10)
    }
    return () => {
      clearInterval(intervalRef.current);
    }
  }, [isRunning])

  const handleStart = () => {
    setIsRunning(true);
  }
  const handleStop = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setIsRunning(false);
  }
  const handleReset = () => {
    setTime(0);
    clearTimeout(intervalRef.current);
  }
  const handlePause = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  }

  return (
    <>
      <div className="App">
        <h1>Stopwatch</h1>
        <p>{formateTime(time)}</p>  
        <div className='actions'>
          <button onClick={handleStart}> start</button>
          <button onClick={handleStop}> stop</button>
          <button onClick={handleReset}> reset</button>
          <button onClick={handlePause}> pause</button>

        </div>
      </div>
    </>
  )
}

export default App
