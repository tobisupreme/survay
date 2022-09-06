import { useState } from 'react'

const Header = () => (
  <div>
    <h1>give feedback</h1>
  </div>
)

const Button = ({ onClick, text }) => (
  <>
    <button onClick={onClick}>{text}</button>
  </>
)

const StatisticLine = ({ text, value }) => {
  if (text === 'positive') {
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const good = props.bigProp.subs[0]
  const goodKey = Object.keys(good)[0]
  const neutral = props.bigProp.subs[1]
  const neutralKey = Object.keys(neutral)[0]
  const bad = props.bigProp.subs[2]
  const badKey = Object.keys(bad)[0]
  const all = props.bigProp.subs[3]
  const allKey = Object.keys(all)[0]

  if (all[allKey] < 1) {
    return (
      <div>
        <h4>No feedback given</h4>
      </div>
    )
  }

  return (
    <>
      <h1>{props.bigProp.title}</h1>
      <table>
        <tbody>
          <StatisticLine text={goodKey} value={good[goodKey]} />
          <StatisticLine text={neutralKey} value={neutral[neutralKey]} />
          <StatisticLine text={badKey} value={bad[badKey]} />
          <StatisticLine text="all" value={all[allKey]} />
          <StatisticLine text="average" value={all[allKey] / 3} />
          <StatisticLine text="positive" value={(good[goodKey] * 100) / all[allKey]} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    increaseAll()
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    increaseAll()
  }

  const handleBad = () => {
    setBad(bad + 1)
    increaseAll()
  }

  const increaseAll = () => {
    setAll(all + 1)
  }

  const bigProp = {
    title: 'statistics',
    subs: [{ good: good }, { neutral: neutral }, { bad: bad }, { all: all }],
  }

  return (
    <div>
      <Header />
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <Statistics bigProp={bigProp} />
    </div>
  )
}

export default App
