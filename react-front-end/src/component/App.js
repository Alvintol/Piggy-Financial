import React from 'react';
import '../sass/app.scss';
import Login from './Login';
import Signup from './Signup';
import Main from './mainView/Main';
import useApplicationData from '../hooks/hook';
import useVisualMode from '../hooks/useVisualMode';

const App = () => {
  const {
    state,
    addExpense,
    loginUser,
    updateGoals,
    removeExpense,
    removeGoal,
    changeTab,
    changeCurrency,
    signupUser
  } = useApplicationData();

  // Views
  const LOGIN = 'LOGIN';
  const SIGNUP = 'SIGNUP';
  const SHOW = 'SHOW';

  const { mode, transition, back } = useVisualMode(
    state.user ?
      SHOW :
      LOGIN
      );

  return (
    <div className="app overflow-hidden">

      {mode === LOGIN && <Login
        key='login'
        users={state.users}
        loginUser={loginUser}
        transition={transition}
      />}

      {mode === SIGNUP && <Signup
        key='signup'
        back={back}
        transition={transition}
        signupUser={signupUser}
      />}

      {mode === SHOW && <Main
        key='main'
        back={back}
        state={state}
        changeTab={changeTab}
        removeGoal={removeGoal}
        addExpense={addExpense}
        updateGoals={updateGoals}
        removeExpense={removeExpense}
        changeCurrency={changeCurrency}
      />}
    </div>
  );
};

export default App;