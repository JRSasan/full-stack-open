import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ feedback, text }) => {
  console.log(feedback, text)
  return (
    <div>
      {text} {feedback}
    </div>
  )
}



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allfeedback, setAll] = useState(0)

  const handleGoodClick = () => {
    setGood(good+1)
    setAll(allfeedback+1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral+1)
    setAll(allfeedback+1)
  }
  const handleBadClick = () => {
    setBad(bad+1)
    setAll(allfeedback+1)
  }

  const averageFeedback = () => {
    let average
    if (bad !== 0) {
      average = (good - bad) / allfeedback
    } else if (neutral !==0) {
      average = good / allfeedback
    } else {
      average = good
    }

    return average
  }

  const positivePercent = () => {
    let percentage = 0 
    if (good !==0) {
      percentage = (good/allfeedback) * 100
    }
    
    return percentage + ' %'
  }

  return (
    <div>
    <h1>give feedback</h1>
    <Button handleClick={handleGoodClick} text='good' />
    <Button handleClick={handleNeutralClick} text='neutral' />
    <Button handleClick={handleBadClick} text='bad' />
    <h1>statistics</h1>
    <Statistics feedback={good} text='good' />
    <Statistics feedback={neutral} text='neutral' />
    <Statistics feedback={bad} text='bad' />
    <Statistics feedback={allfeedback} text='all' />
    <Statistics feedback={averageFeedback()} text='average' />
    <Statistics feedback={positivePercent()} text='positive' />
    </div>
  )
}

export default App

