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
  

const Feedback = ({mainText, handleGood, handleNeutral, handleBad}) => 
  <div>
    <h1>{mainText}</h1>
    <CustomBtn title={'good'} onClick={handleGood}/>
    <CustomBtn title={'neutral'} onClick={handleNeutral}/>
    <CustomBtn title={'bad'} onClick={handleBad}/>
  </div>

const CustomParagraph = ({title, feedbackCounter}) => <p style={{ margin: 0 }}> {title} {feedbackCounter} {title === "positive" ? "%" : ""}</p>

const Statistics = ({title, good, neutral, bad, all, average, positive}) =>
  <div>
    <h1>{title}</h1>
    <CustomParagraph title={"good"} feedbackCounter={good}/>
    <CustomParagraph title={"neutral"} feedbackCounter={neutral}/>
    <CustomParagraph title={"bad"} feedbackCounter={bad}/>
    <CustomParagraph title={"all"} feedbackCounter={all}/>
    <CustomParagraph title={"average"} feedbackCounter={average}/>
    <CustomParagraph title={"positive"} feedbackCounter={positive}/>
  </div>

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
