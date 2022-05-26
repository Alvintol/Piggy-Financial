import React from 'react'
import ProgressCircle from '../ProgressCircle'
import '../../../sass/vacation.scss'
import {
  getTotalAmount,
  getDaysTillGoal,
  filteredVacationExpenses,
  getGoalByID,
} from '../../../helpers/helper_functions'

const Vacation = props => {
  
  // Destructured props
  const {
    state
  } = props;

  const vacationInfo = getGoalByID(state.goals, state.user)
  const homeTime = getDaysTillGoal(vacationInfo)
  const vacationExpenses = filteredVacationExpenses(
    state.expenses,
    state.user,
    vacationInfo.start_date
  )

  const totalSpentOnVacation = (getTotalAmount(vacationExpenses) * state.exchangeRates.rates[state.currentCurrency]).toFixed(2)

  const dayAllowance = (((vacationInfo.amount * state.exchangeRates.rates[state.currentCurrency]) - totalSpentOnVacation) / 100 / homeTime).toFixed(2);

  const weekAllowance = ((((vacationInfo.amount * state.exchangeRates.rates[state.currentCurrency]) - totalSpentOnVacation) * 7) / 100 / homeTime).toFixed(2);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center text-center goalbox">
        <div className="goal-container">
          <br />
          <table>
            <thead>
              <tr>
                <td>
                  <h1>{vacationInfo.goal_name}</h1>
                </td>
              </tr>
              <tr>
                <td>
                  <h1>
                    {(
                      totalSpentOnVacation / 100
                    ).toFixed(2)}{' '}
                    {state.currentCurrency}/{' '}
                    {(
                      (vacationInfo.amount *
                        state.exchangeRates.rates[state.currentCurrency]) /
                      100
                    ).toFixed(2)}{' '}
                    {state.currentCurrency}
                  </h1>
                </td>
              </tr>
              <tr>
                <td>{homeTime} days until home time</td>
              </tr>
              <tr>
                <td>Advised to spend no more than {dayAllowance}/day</td>
              </tr>
              <tr>
                <td>Advised to spend no more than {weekAllowance}/week</td>
              </tr>
            </thead>
          </table>
          <br />
          <ProgressCircle
            key="vacationCircle"
            total_saved={(totalSpentOnVacation / 100).toFixed(2)}
            goalTotal_cents={((vacationInfo.amount * state.exchangeRates.rates[state.currentCurrency]) / 100).toFixed(2)}
            vacationMode={state.vacationMode}
          />
        </div>
      </div>
    </div>
  )
};

export default Vacation;