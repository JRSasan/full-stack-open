import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ feedback }) => {
  console.log("feedback", feedback)

  const [good, neutral, bad, allfeedback] = feedback

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

  if (allfeedback === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <table>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={allfeedback} />
      <StatisticLine text="average" value={averageFeedback()} />
      <StatisticLine text="positive" value={positivePercent()} />
    </table>      
  )
}

const StatisticLine = ( { text, value }) => (
  <tbody>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  </tbody>
)



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allfeedback, setAll] = useState(0)

  const feedback = [good, neutral, bad, allfeedback]

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

  return (
    <div>
    <h1>give feedback</h1>
    <Button handleClick={handleGoodClick} text='good' />
    <Button handleClick={handleNeutralClick} text='neutral' />
    <Button handleClick={handleBadClick} text='bad' />
    <h1>statistics</h1>
    <Statistics feedback={feedback}/>
    </div>
  )
}

export default App

