import { useState, forwardRef, useImperativeHandle } from "react"

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
  const [visible, setVisible] = useState(false)

  const handleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      show: () => setVisible(true),
      hide: () => setVisible(false),
      toggle: () => setVisible(v => !v)
    }
  })

  return (
    <div>
      <div>
        {!visible && <button onClick={handleVisibility}>{buttonLabel}</button>}
      </div>
      {visible && (
        <div>
          {children}
          <button onClick={handleVisibility}>cancel</button>
        </div>
      )}      
    </div>
  )
})

export default Togglable