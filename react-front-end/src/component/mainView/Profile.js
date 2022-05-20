import React, { useState } from 'react';
import "../../sass/profile.scss";
import useVisualMode from '../../hooks/useVisualMode';
import useApplicationData from '../../hooks/hook';
import {
  getTotalAmount,
  getGoalByID,
  getSavingsByID,
  getUserByID
} from '../../helpers/helper_functions';

export default function Profile(props) {

  const { updateGoals } = useApplicationData();
  const EDIT = 'EDIT';
  const GOAL = 'GOAL';
  const { mode, transition, back } = useVisualMode(GOAL)

  const savingsbyID = getSavingsByID(props.savings, props.userId)
  const totalSaved = getTotalAmount(savingsbyID);
  const goalByID = getGoalByID(props.goals, props.userId);
  const totalGoal = getTotalAmount(goalByID);
  const username = getUserByID(props.users, props.userId)[0].username;

  const [state, setState] = useState({
    user_id: props.userId,
    goal_name: goalByID[0].goal_name,
    start_date: goalByID[0].start_date,
    end_date: goalByID[0].end_date,
    amount: goalByID[0].amount,
  });

  const onChange = () => {
    updateGoals(state)
    transition(GOAL)
  };

  return (
    <section className="vw-100 m-0 row">
      <div className="container p-card">
        <div className="row d-flex justify-content-center h-100">
          <div className="w-50 col-md-12 col-xl-4 m-4">
            <div className="card">
              <div className="card-body text-center">
                <div className="mt-3 mb-4 background">
                  <img src="../../person-icon.jpeg"
                    className="rounded-circle img-fluid" alt='animated-girl-with-glasses' />
                </div>
                <h4 className="mb-2">{username}</h4>
                <p className="job-name mb-4">@Programmer <span className="mx-2">|</span> <a
                  href="#!">Lighthouselabs</a></p>
                <div className="mb-4 pb-2">
                </div>
                <div className="d-flex justify-content-center text-center mt-5 mb-2">
                  <div>
                    <p className="mb-2 h5 total-saved-amount">${(totalSaved / 100).toFixed(2)}</p>
                    <p className="total-saved-text mb-0">Total Saved</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      {mode === EDIT &&
        <div className="chart-align">
          <div className='goal-container'>
            <div className='m-5 card d-flex align-items-center justify-content-center text-center flex-column'>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <td className='d-flex justify-content-center w-100'>
                      <div className="w-50">
                        Goal Name:
                        <input
                          placeholder='GOAL NAME'
                          type="text"
                          id="goalName"
                          className="form-control align-items-center fw-bolder text-center"
                          value={state.goal_name}
                          onChange={(event) => setState({ ...state, goal_name: event.target.value })}
                        />
                        <label className="form-label visually-hidden" htmlFor="goalName">
                          Goal Name
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className='d-flex justify-content-center w-100'>
                      <div className='w-50'>
                      Goal Amount:
                        <input
                          placeholder='GOAL AMOUNT'
                          type="number"
                          id="goalAmount"
                          className="form-control align-items-center fw-bolder text-center"
                          value={state.amount}
                          onChange={(event) => setState({ ...state, amount: parseInt(event.target.value)})}
                        />
                      </div>
                      <label className="form-label visually-hidden" htmlFor="goalAmount">
                        goalAmount
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td className='d-flex justify-content-center w-100'>
                      <div className="w-50 col-lg-3 justify-content-center col-sm-6">
                        Start Date:
                        <label htmlFor="date" className='visually-hidden'>startDate</label>
                        <input
                          placeholder='START DATE'
                          id="date"
                          className="form-control align-items-center fw-bolder text-center"
                          type="date"
                          value={state.start_date}
                          onChange={(event) => setState({ ...state, start_date: event.target.value })}
                        />
                        <span id="dateSelected"></span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className='d-flex justify-content-center w-100'>
                      <div className="w-50 col-lg-3 justify-content-center col-sm-6">
                        End Date:
                        <label htmlFor="date" className='visually-hidden'>endDate</label>
                        <input
                          placeholder='END DATE'
                          id="date"
                          className="form-control align-items-center fw-bolder text-center"
                          type="date"
                          value={state.end_date}
                          onChange={(event) => setState({ ...state, end_date: event.target.value })}
                        />
                        <span id="dateSelected"></span>
                      </div>
                    </td>
                  </tr>
                </thead>
              </table>
              <div>
                <button onClick={onChange} className='btn btn-primary mb-3 m-1'>
                  Confirm
                </button>

                <button onClick={() => back()} className='btn btn-danger mb-3 m-1'>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      }
      {mode === GOAL &&
        <div className="chart-align">
          <div className='goal-container'>
            <div className='m-5 card d-flex align-items-center justify-content-center text-center flex-column'>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <td>
                      <h3>
                        Saving for: {goalByID[0].goal_name}
                      </h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>
                        Aiming for: ${(totalGoal / 100).toFixed(2)}
                      </h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>
                        Current start date:
                        <br />
                        <span className='fw-bold'>
                          {goalByID[0].start_date}
                        </span>
                      </h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>
                        Current end date:
                        <br />
                        <span className='fw-bold'>
                          {goalByID[0].end_date}
                        </span>
                      </h3>
                    </td>
                  </tr>
                </thead>
              </table>
              <button
                className='btn btn-info mb-3'
                onClick={() => transition(EDIT)}
              >
                EDIT
              </button>
            </div>
          </div>
        </div>
      }
    </section>
  )
}