import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'

function App({ strikes }) {

  const strikeList = [50, 45, 40, 35, 30, 25, 20, 15, 10, 5]
  const [exp, setExp] = useState()
  const [chanceProfit, setChanceProfit] = useState()
  const [maxRisk, setMaxRisk] = useState()
  const [maxReward, setMaxReward] = useState(0)
  const [rateReturn, setRateReturn] = useState()
  const [shortStrikes, setShortStrikes] = useState('Pick Short Strikes')
  const [longStrikes, setLongStrikes] = useState('Pick Long Strikes')

  const selectShortStrike = (e) => {
    setShortStrikes(e)
  }

  const selectLongStrike = (e) => {
    setLongStrikes(e)
  }

  const handleClick = () => {
    console.log(exp, maxRisk, shortStrikes, longStrikes)
    setExp(exp)
    setMaxRisk(maxRisk)
    setRateReturn(Math.round((exp + ((longStrikes / 100) * maxRisk)) / ((maxRisk * (1 - (shortStrikes / 100)))) * 100))
  }


  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="text-left">

        <h1>Decision Checks For Expectancy (Iron Condors)</h1>
        <p>Without formulas, we need to utilize some workarounds to do certain things in the system.
          This is my attempt to use our current options to trade opportunities for expectancy.
          The following decisions are needed:
        </p>

        <ul className="list-unstyled">
          <li><strong>Short Strike Deltas</strong></li>
          <li><strong>Long Strike Deltas</strong></li>
          <li><strong>Max Risk per Position</strong></li>
          <li><strong>Rate of Return</strong></li>
        </ul>

        <ul className="list-unstyled">
          <li><strong>1. Input your desired expectancy per trade</strong> <em>(Target expectancy - not used in bot)</em></li>
          <li><strong>2. Select your strikes</strong> <em>(This is the opportunity you will look for within bot)</em></li>
          <li><strong>3. Input your desired max risk for the position</strong> <em>(This is the position size you will use when opening the position "Up to 'X' in risk")</em></li>
          <li><strong>4. Result: Necessary Rate of Return for desired expectancy</strong> <em>(This is the rate of return to use within bot)</em></li>
        </ul>

        <p><strong>*Please Note:</strong> I assume every trade ends up at Max Profit or Max Loss</p>

        <div className="table-responsive p-2 expand">
          <table className="table">
            <tbody>

              <tr>
                <td className="pb-1">Desired Expectancy ($/trade)</td>
                <td className="pb-1"><input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={(e) => setExp(parseInt(e.target.value))}></input></td>
              </tr>

              <tr>
                <td className="pb-1">Opportunity Max Risk ($)</td>
                <td className="pb-1"><input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={e => setMaxRisk(parseInt(e.target.value))}></input></td>
              </tr>

              <tr>
                <td className="pb-1">Short Strikes</td>
                <td className="pb-1 align-middle" >
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="short" className="pb-1 align-middle" >
                      {shortStrikes}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {strikeList.map((e) =>
                        <Dropdown.Item href="#/action-1" key={e} eventKey={e} title={shortStrikes} onClick={(e) => selectShortStrike(parseInt(e.target.textContent))}>{e}</Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>

              <tr>
                <td className="pb-1">Long Strikes</td>
                <td className="pb-1 align-middle" >
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="short" className="pb-1 align-middle" >
                      {longStrikes}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {strikeList.map((e) =>
                        <Dropdown.Item href="#/action-1" key={e} eventKey={e} title={longStrikes} onClick={(e) => selectLongStrike(parseInt(e.target.textContent))}>{e}</Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>

              <tr>
                <td className="pb-1">Necessary Rate of Return (%)</td>
                <td className="pb-1">{rateReturn}</td>
              </tr>

              <tr>
                <td></td>
                <td><button type="button" className="btn btn-outline-dark btn-sm" onClick={handleClick}>CALCULATE</button></td>
              </tr>
            </tbody>
          </table>
          <div>
          Formulas:<br></br>
          <code>
            ** Max Profit = Rate of Return * Max Risk<br></br>
            ** Chance Max Profit = 1 - Chance ITM<br></br>
            ** Expectancy =  ((Rate of Return * Max Risk)*(1 - Chance ITM))-(Max Risk*Chance Max Loss)<br></br>
            ** Rate of Return = (Desired Expectancy + (Max Risk * Chance Max Loss)) / ((Max Risk * (1 - Chance ITM))
          </code>
        </div>
        </div>
      </div>
    </div>

  );
}

export default App;
