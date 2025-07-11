import { useState } from "react"
const CustomBtn = ({title, onClick}) => 
  <>
    <style>
      {`
        .btn{
          margin-right: 5px;
          background-color: #ffffff;
          border: 1px solid #ccc;
          border-radius: 5px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
          font-weight: bold;
        }

        .btn:active{
          background-color: #e0e0e0;
        }
      `}
    </style>
    <button onClick={onClick} className="btn">
      {title}
    </button> 
  </>
  

const Feedback = ({mainText, handleGood, handleNeutral, handleBad}) => {
  const buttons = [
    { title: "good", funcLink: handleGood },
    { title: "neutral", funcLink: handleNeutral },
    { title: "bad", funcLink: handleBad }
  ]

  return (
    <div>
      <h1>{mainText}</h1>
      {
        buttons.map(({title, funcLink}) => <CustomBtn key={title} title={title} onClick={funcLink}/>)
      }      
    </div>
  )

}
  
const StatisticLine = ({title, feedbackCounter}) => {
  const isPercentage  = title === "positive"

  return (
    <tr style={{margin: 0}}>
      <td>{title}</td>
      <td>{feedbackCounter} {isPercentage && "%"}</td>
    </tr>
  )
}

const Statistics = ({title, good, neutral, bad, all, average, positive}) =>{
  const stats = [
    { title: "good", value: good },
    { title: "neutral", value: neutral },
    { title: "bad", value: bad },
    { title: "all", value: all },
    { title: "average", value: average },
    { title: "positive", value: positive },
  ]
  
  return(
    <>
      <h1>{title}</h1>
      {
        all > 0 ? (
          <table>
            <tbody>
              {
                stats.map(({title, value}) => <StatisticLine key={title} title={title} feedbackCounter={value} />)
              }
            </tbody>
          </table>
        ) : <p>No feedback given</p>
      }
    </>      
  )
}
  

const App = () => {
  const [goodFeedbackCount, setGoodFeedback] = useState(0)
  const [neutralFeedbackCount, setNeutralFeedback] = useState(0)
  const [badFeedbackCount, setBadFeedback] = useState(0)

  const handleGoodFeedback = () => setGoodFeedback(prev => prev + 1)
  const handleNeutralFeedback = () => setNeutralFeedback(prev => prev + 1)
  const handleBadFeedback = () => setBadFeedback(prev => prev + 1)

  const all = goodFeedbackCount + neutralFeedbackCount + badFeedbackCount
  const average = all === 0 ? 0 : (goodFeedbackCount - badFeedbackCount)/all
  const positive = all === 0 ? 0 : (goodFeedbackCount/all) * 100

  return(
    <>
      <Feedback mainText={"give feedback"} handleGood={handleGoodFeedback} handleNeutral={handleNeutralFeedback} handleBad={handleBadFeedback}/>
      <Statistics title={"statistics"} good={goodFeedbackCount} neutral={neutralFeedbackCount} bad={badFeedbackCount} all={all} average={average} positive={positive}/>
    </>
  )
}

export default App
