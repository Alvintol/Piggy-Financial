import React from 'react';
import "../../sass/signup.scss"
import SingleExpense from './SingleExpense';
import {
  filteredVacationExpenses,
  getCategoryName,
  getExpensesById,
  getGoalByID
} from '../../helpers/helper_functions';

const ExpenseTable = props => {

  // Destructured props
  const {
    state,
    removeExpense,
  } = props;

  const vacation = getGoalByID(state.goals, state.user);

  const filteredExpensesById =
    state.vacationMode ?
      filteredVacationExpenses(state.expenses, state.user, vacation.start_date) :
      getExpensesById(state.expenses, state.user);

  const expenses = filteredExpensesById.map(expense => {
    const categoryName = getCategoryName(expense.category_id);

    const toggleClass = prop => {
      switch (prop) {
        case 'Income': return 'Income';
        case 'Savings': return 'Savings';
        default: return 'Expense';
      };
    };

    return (
      <SingleExpense
        id={expense.id}
        key={expense.id}
        amount={expense.amount}
        created_at={expense.created_at}
        removeExpense={removeExpense}
        category_name={expense.category_name || categoryName}
        toggleClass={toggleClass(expense.category_name || categoryName)}
      />
    )
  });


  return (
    <table className="table table-striped table-hover">
      <thead className='gradient-custom-4 fs-5 fw-bolder'>
        <tr className='d-flex justify-content-around'>
          <td>Date</td>
          <td>Category</td>
          <td>Amount</td>
        </tr>
      </thead>
      <tbody
        id='expense-table'
        className='list-group infinite-scroll fw-bold'>
        {expenses}
      </tbody>
    </table>
  );
};

export default ExpenseTable;