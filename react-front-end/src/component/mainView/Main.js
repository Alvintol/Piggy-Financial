import React from 'react';
import '../../sass/main.scss';
import TopNav from './TopNav';
import BotNav from './BotNav';
import Profile from './Profile';
import Savings from './Savings';
import Expenses from './Expenses';
import Vacation from '../mainView/Vacation/Vacation';
import useVisualMode from '../../hooks/useVisualMode';

const Main = props => {

  //destructured props
  const {
    state,
    changeTab,
    removeGoal,
    updateGoals, 

  } = props;

  const PROFILE = 'PROFILE';
  const SAVINGS = 'SAVINGS';
  const EXPENSES = 'EXPENSES';
  const VACATION = 'VACATION';
  const { transition } = useVisualMode(state.tab);
  
  return (
    <div>
      <TopNav
        key='topnav'
        users={state.users}
        userId={state.user}
      />
      {state.tab === PROFILE && <Profile
        key='profile'
        state={state}
        removeGoal={removeGoal}
        updateGoals={updateGoals}
      />}
      {state.tab === SAVINGS && <Savings
        key='savings'
        state={state}
        updateGoals={updateGoals}
      />}
      {state.tab === EXPENSES && <Expenses
        key='expenses'
        state={state}
        addExpense={props.addExpense}
        removeExpense={props.removeExpense}
      />}
      {state.tab === VACATION && <Vacation
        key='vacation'
        goals={props.goals}
        userId={props.userId}
        savings={props.savings}
        expenses={props.expenses}
        vacationMode={props.vacationMode}
        exchangeRates={props.state.exchangeRates}
        currentCurrency={props.state.currentCurrency}
      />}
      <BotNav
        key='botnav'
        transition={transition}
        changeTab={changeTab}
        vacationMode={state.vacationMode}
      />
    </div>
  );
};

export default Main;