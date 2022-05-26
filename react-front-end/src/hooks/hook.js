import { useState, useEffect } from 'react';
import { getNewList, getUserByEmail } from '../helpers/helper_functions';
// import { useCookies } from 'react-cookie';
import axios from 'axios';

const useApplicationData = () => {
  const [state, setState] = useState({
    tab: 'PROFILE',
    username: '',
    // email: '',
    user: '',
    users: [],
    goals: [],
    savings: [],
    expenses: [],
    dataPoints: [],
    vacationMode: false,
    currentCurrency: 'USD',
    currencySymbols: {},
    exchangeRates: {},
  });

  // started implementing cookies
  // const [ cookies, setCookie, removeCookie ] = useCookies(['email']);

  // Adds a user to database
  const signupUser = (username, email, password) => {
    const users = [
      {
        username,
        email,
        password,
      },
      ...state.users,
    ];

    const newUsers = {
      username,
      email,
      password,
    };

    return axios
      .post(`http://localhost:8081/api/register`, newUsers)
      .then(res => {
        setState(prev => {
          return { ...prev, users }
        })
        console.log('signupUser not reached. res--> ', res);
      });
  };

  // Sets user ID to state based on who is logged in
  const setUser = user => setState(prev => {
    return { ...prev, user };
  });

  // Retrieves user's relevant data
  const loginUser = (email, password) => {
    // setCookie('email', email, { path: '/'});
    const users = {
      email,
      password,
    };

    const user = getUserByEmail(email, state.users);
    return Promise.all([
      axios.get(`http://localhost:8081/api/dataPoints`),
      axios.post(`http://localhost:8081/api/login`, users),
    ])
      .then(() =>
        setState(prev => {
          return { ...prev, user: user.id }
        })
      )
  };

  // Changes the main view of the app on bot nav click
  const changeTab = tab =>
    setState(prev => {
      return { ...prev, tab }
    })

  // Changes current desired currency rate
  const changeCurrency = currency =>
    setState(prev => {
      return { ...prev, currentCurrency: currency }
    });

  // Updates user edited goal
  const updateGoals = (goalID, goals) => {

    const updatedGoal = state.goals.map(item =>
      !Array.isArray(item) && item.id === goalID ?
        item = {
          ...item,
          goal_name: goals.goal_name,
          amount: parseInt(goals.totalGoals) * 100,
          start_date: goals.start_date,
          end_date: goals.end_date
        }
        : item
    );

    // If Vacation Mode is activated swap the savings views to budget
    goals.vacation === 'ON' ?
      setState(prev => {
        return { ...prev, tab: 'VACATION', goals: updatedGoal, vacationMode: true }
      }) :
      setState(prev => {
        return { ...prev, goals: updatedGoal }
      })

    return axios
      .put(`http://localhost:8081/api/goals`, {
        goals
      })
      .then(res => {
        console.log('Function updateGoals not reached. res--> ', res);
      })
  };

  // Deletes an expense from database
  const removeExpense = expenseID => {

    const newExpenseList = getNewList(state.expenses, expenseID);
    const newSavingList = getNewList(state.savings, expenseID);
    const newDataPoints = getNewList(state.dataPoints, expenseID)

    return axios
      .delete(`http://localhost:8081/api/delete`, {
        data: { id: expenseID }
      })
      .then(() => {
        setState(prev => {
          return {
            ...prev,
            expenses: newExpenseList,
            savings: newSavingList,
            dataPoints: newDataPoints
          }
        })
      })
  };

  // Deletes a goal from database
  const removeGoal = goalID => {
    const newGoalList = state.goals.map((goal, index) =>
      goal.id === goalID ?
        state.goals.splice(index, 1) :
        goal
    );

    return axios
      .delete(`http://localhost:8081/api/delete`, {
        data: { id: goalID }
      })
      .then(() => {
        setState(prev => {
          return {
            ...prev,
            goals: newGoalList
          }
        })
      })
  };

  // Adds an expense to database
  const addExpense = expense => {
    const expenses = [
      {
        id: expense.id,
        user_id: expense.user_id,
        created_at: expense.created_at,
        amount: (expense.amount),
        category_id: expense.category_id,
        category_name: expense.category_name,
      },
      ...state.expenses,
    ];

    const savings = [
      {
        id: expense.id,
        user_id: expense.user_id,
        created_at: expense.created_at,
        amount: (expense.amount),
        category_id: expense.category_id,
      },
      ...state.savings,
    ];

    const dataPoints = [
      ...state.dataPoints,
      {
        id: expense.id,
        user_id: expense.user_id,
        category_id: expense.category_id,
        x: expense.created_at,
        y: expense.amount,
      }
    ];

    // Updates local state of changed data
    setState(prev => {
      return {
        ...prev,
        expenses,
        savings,
        dataPoints,
        currentCurrency: expense.currentCurrency
      };
    });

    return axios
      .put(`http://localhost:8081/api/expenses`, {
        expense
      })
      .then(res => {
        console.log('Function updateGoals not reached. res--> ', res);
      });
  };

  useEffect(() => {
    const apiGoals = 'http://localhost:8081/api/goals';
    const apiUsers = 'http://localhost:8081/api/users';
    const apiSavings = 'http://localhost:8081/api/savings';
    const apiExpenses = 'http://localhost:8081/api/expenses';
    const apiDataPoints = 'http://localhost:8081/api/dataPoints';
    const apiCurrencySymbols = 'https://api.currencyfreaks.com/currency-symbols';
    const apiExchangeRates = `https://api.currencyfreaks.com/latest?apikey=${process.env.REACT_APP_APIKEY}`;

    Promise.all([
      axios.get(apiGoals),
      axios.get(apiUsers),
      axios.get(apiSavings),
      axios.get(apiExpenses),
      axios.get(apiDataPoints),
      axios.get(apiCurrencySymbols),
      axios.get(apiExchangeRates),
    ])
      .then(all => {
        setState((prev) => ({
          ...prev,
          goals: all[0].data,
          users: all[1].data,
          savings: all[2].data,
          expenses: all[3].data,
          dataPoints: all[4].data,
          currencySymbols: all[5].data,
          exchangeRates: all[6].data,
        }));
      })
      .catch(error => {
        console.log('We got a hook err! -->', error);
      })
  }, []);

  return {
    state,
    setUser,
    addExpense,
    loginUser,
    updateGoals,
    removeExpense,
    removeGoal,
    changeTab,
    signupUser,
    changeCurrency,
    // removeCookie
  };
};

export default useApplicationData;