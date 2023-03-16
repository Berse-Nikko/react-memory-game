import { useState } from "react"

let game = [
  1, 2, 3, 4, 5, 6, 6, 5, 4, 3, 2, 1, 7, 8, 9, 0, 7, 8, 9, 0, 2, 2, 1, 1,
]

const iniArray = Array.from({ length: 24 }, (i) => false)

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const App = () => {
  const [index, setIndex] = useState([])
  const [board, setBoard] = useState(iniArray)
  const [randomGame, setRandomGame] = useState(game)
  const [checking, setChecking] = useState(false)

  const handleClicked = (pos, num) => {
    const newBoard = [...board]
    newBoard[pos] = true
    setBoard(newBoard)
    index.push(pos)
    if (index.length === 2) {
      setChecking(true)
      console.log(checking)
      sleep(500).then(() => {
        const newBoard = [...board]
        if (num === randomGame[index[0]]) {
          newBoard[pos] = true
          newBoard[index[0]] = true
          setBoard(newBoard)
        } else {
          newBoard[index[0]] = false
          setBoard(newBoard)
        }
        setIndex([])
        setChecking(false)
      })
    }
  }

  const handleReset = () => {
    setIndex([])
    setBoard(iniArray)
    setRandomGame(randomGame.sort(() => Math.random() - 0.5))
  }

  return (
    <>
      <h1>Memory Game</h1>
      <div className="board">
        {board.map((value, index) => {
          if (value === true) {
            return (
              <div className="num" key={index}>
                <h2>{randomGame[index]}</h2>
              </div>
            )
          } else {
            return (
              <div
                className={`num ${checking && "checking"}`}
                key={index}
                onClick={() => handleClicked(index, randomGame[index])}
              >
                <h2 className="empty"> </h2>
              </div>
            )
          }
        })}
      </div>
      <div className="btn-container">
        <button className="btn" onClick={handleReset}>
          {board.every((elem) => elem) ? "Play Again" : "Reset"}
        </button>
      </div>
    </>
  )
}
export default App
