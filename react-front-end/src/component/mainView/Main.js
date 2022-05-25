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

  } = props;

  const PROFILE = 'PROFILE';
  const SAVINGS = 'SAVINGS';
  const EXPENSES = 'EXPENSES';
  const VACATION = 'VACATION';
  const { transition } = useVisualMode(props.state.tab);
  
  return (
    <div>
      <TopNav
        key='topnav'
        users={state.users}
        userId={state.user}
      />
      {props.state.tab === PROFILE && <Profile
        key='profile'
        state={state}
        removeGoal={props.removeGoal}
        updateGoals={props.updateGoals}
      />}
      {props.state.tab === SAVINGS && <Savings
        key='savings'
        goals={props.goals}
        userId={props.userId}
        incomes={props.incomes}
        savings={props.savings}
        updateGoals={props.updateGoals}
      />}
      {props.state.tab === EXPENSES && <Expenses
        key='expenses'
        state={props.state}
        goals={props.goals}
        userId={props.userId}
        expenses={props.expenses}
        dataPoints={props.dataPoints}
        addExpense={props.addExpense}
        vacationMode={props.vacationMode}
        removeExpense={props.removeExpense}
        changeCurrency={props.changeCurrency}
        vacationData={props.alvinVacationSpent}
        exchangeRates={props.state.exchangeRates}
        currencySymbols={props.state.currencySymbols}
        currentCurrency={props.state.currentCurrency}
      />}
      {props.state.tab === VACATION && <Vacation
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