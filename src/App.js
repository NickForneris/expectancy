import React, { useEffect, useState } from 'react'

function App() {

  const [exp, setExp] = useState()
  const [chanceProfit, setChanceProfit] = useState()
  const [maxRisk, setMaxRisk] = useState()
  const [maxReward, setMaxReward] = useState(0)
  const [rateReturn, setRateReturn] = useState()

  const handleClick = () => {
    setExp(exp)
    setChanceProfit(chanceProfit)
    setMaxRisk(maxRisk)
    setMaxReward(parseInt((exp + ((1 - chanceProfit) * maxRisk)) / chanceProfit))
  }

  useEffect(() => {
    if (isNaN(rateReturn)) {
      setRateReturn(0)
    } else {
      setRateReturn((maxReward / maxRisk) * 100)
    }
    // eslint-disable-next-line
  }, [maxReward])

  return (
    <div className="text-center">

      <h1>Decision Checks For Expectancy</h1>
      <p>Without formulas, we need to utilize some workarounds to do certain things in the system.<br></br>
        This is my attempt to use our current options to trade opportunities for expectancy. <br></br>
        The following decisions are needed:
      </p>

      <ul className="list-unstyled">
        <li><strong>Necessary Rate of Return</strong></li>
        <li><strong>Opportunity chance of Profit</strong></li>
      </ul>

      <p>Input your desired expectancy per trade. Determine your criteria for Chance of Profit.<br></br>
      Enter some arbitrary number for Max Risk (this is just an input to show the Necessary Rate of Return<br></br>
      is soley dependant on Chance of Profit)
      </p>
      <p><strong>*Please Note:</strong> I assuming every trade ends up at Max Profit or Max Loss</p>

      <div className="container-fluid">
        <div class="row justify-content-center">
          <div className="col-auto">
            <div class="table-responsive p-2">
              <table className="table table-sm">

                <tr>
                  <td className="pb-1">Desired Expectancy ($/trade)</td>
                  <td className="pb-1"><input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={e => setExp(parseInt(e.target.value))}></input></td>
                </tr>

                <tr>
                  <td className="pb-1">Opportunity Chance of Profit (%)</td>
                  <td className="pb-1"><input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={e => setChanceProfit(parseFloat(e.target.value) / 100)}></input></td>
                </tr>

                <tr>
                  <td className="pb-1">Opportunity Max Risk ($)</td>
                  <td className="pb-1"><input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={e => setMaxRisk(parseInt(e.target.value))}></input></td>
                </tr>

                <tr>
                  <td className="pb-1">Opportunity Max Reward ($)</td>
                  <td className="pb-1">{maxReward}</td>
                </tr>

                <tr>
                  <td className="pb-1">Necessary Rate of Return (%)</td>
                  <td className="pb-1">{rateReturn}</td>
                </tr>

                <tr>
                  <td></td>
                  <td><button type="button" className="btn btn-outline-dark btn-sm" onClick={handleClick}>CALCULATE</button></td>
                </tr>

              </table>
            </div>
          </div>
        </div>
      </div>
      <div>
      Formulas:<br></br>
        <code>
          Max Reward = (Desired Expectancy + ((1 - Chance of Profit) * Max Risk)) / Chance of Profit
        </code>
        </div>
        <div>
        <code>
        Necessary Rate of Return = Max Reward / Max Risk
        </code>
        </div>

      </div>

  );
}

export default App;
