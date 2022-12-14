import { useState } from 'react'
import './App.css'

interface TCell {
  row: number
  column: number
}

function App() {
  const [board, setBoard] = useState([
    [0, 1, 3, 4], //0
    [0, 1, 3, 5], //1
    [2, 2, 5, 4], //2
  ])

  const [isReveled, setIsReveled] = useState(
    new Array(board.length)
      .fill('')
      .map(() => new Array(board[0].length).fill(false))
  )

  const [firstClick, setFirstClick] = useState<TCell | undefined>() //1

  function handleSelectCard(rowIndex: number, columnsIndex: number) {
    if (isReveled[rowIndex][columnsIndex]) return
    const chooseNumber = board[rowIndex][columnsIndex] //3
    const newIsReveled = [...isReveled]
    newIsReveled[rowIndex][columnsIndex] = true
    setIsReveled(newIsReveled)

    if (firstClick) {
      const firstClicked = board[firstClick.row][firstClick.column]

      if (chooseNumber !== firstClicked) {
        setTimeout(() => {
          newIsReveled[rowIndex][columnsIndex] = false
          newIsReveled[firstClick.row][firstClick.column] = false
          setIsReveled([...newIsReveled])
        }, 1000)
      } else {
        const youWon = isReveled.flat().every((element) => element)
        if (youWon) {
          setTimeout(() => alert('Você Ganhou'))
        }
      }

      setFirstClick(undefined)
    } else {
      setFirstClick({
        row: rowIndex,
        column: columnsIndex,
      })
    }
  }

  return (
    <div className='App'>
      <div className='grid'>
        {board.map((row, rowIndex) => (
          <div className='row' key={rowIndex}>
            {row.map((number, columnsIndex) => (
              <div
                className={
                  'column ' +
                  (isReveled[rowIndex][columnsIndex] ? 'isClicked' : '')
                }
                key={columnsIndex}
                onClick={() => handleSelectCard(rowIndex, columnsIndex)}
              >
                {isReveled[rowIndex][columnsIndex] ? number : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
