import './App.css'
import React, { useState } from 'react'

interface ClickedProps {
  clientX: number
  clientY: number
}
 

function App() {
  const [clickedPoints, setClickedPoints] = useState<ClickedProps[]>([])
  const [undoPoints, setUndoPoints] = useState<ClickedProps[]>([])

  function getCordenates(e: React.MouseEvent<HTMLElement>) {
    const { clientX, clientY} = e

    setClickedPoints([...clickedPoints, { clientX, clientY }])
  }

  function handleUndo() {
    const newClickedPoint = [...clickedPoints]
    const undoPoint = newClickedPoint.pop()
    setClickedPoints(newClickedPoint)
    if (!undoPoint) return 
    setUndoPoints([...undoPoints, undoPoint])
  }

  function handleRedo() {
    const newUndoPoints = [...undoPoints]
    const redoPoint = newUndoPoints.pop()
    setUndoPoints(newUndoPoints)
    if (!redoPoint) return 
    setClickedPoints([...clickedPoints, redoPoint])

  }

  return(
    <>
    <button disabled={clickedPoints.length === 0} onClick={handleUndo}>
      Undo
    </button>
    <button disabled={undoPoints.length === 0} onClick={handleRedo}>
      Redo
    </button>
    <div className='App' onClick={getCordenates}>
      {clickedPoints.map((clickedPoint, index) => {
        return (
          <div
            key={index}
            style={{
                left: clickedPoint.clientX -6, 
                top:clickedPoint.clientY -7,
                position: 'absolute',
                borderRadius: '50%',
                background: 'red',
                width: '10px',
                height: '10px' 
                }}
          >
            
          </div>
        )
      })}
    </div>
    </>
  )
 }

export default App