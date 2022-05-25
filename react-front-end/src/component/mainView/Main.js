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

  const PROFILE = 'PROFILE';
  const SAVINGS = 'SAVINGS';
  const EXPENSES = 'EXPENSES';
  const VACATION = 'VACATION';
  const { transition } = useVisualMode(props.state.tab);
  
  return (
    <div>
      <TopNav
        key='topnav'
        users={props.users}
        userId={props.userId}
        savings={props.savings}
      />
      {props.state.tab === PROFILE && <Profile
        key='profile'
        users={props.users}
        goals={props.goals}
        userId={props.userId}
        incomes={props.incomes}
        savings={props.savings}
        removeGoal={props.removeGoal}
        updateGoals={props.updateGoals}
        vacationMode={props.state.vacationMode}
        exchangeRates={props.state.exchangeRates}
        currentCurrency={props.state.currentCurrency}
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
        changeTab={props.changeTab}
        vacationMode={props.state.vacationMode}
      />
    </div>
  );
};

export default Main;