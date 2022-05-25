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

  const vacation = getGoalByID(props.goals, props.userId);

  const filteredExpensesById =
    props.vacationMode ?
      filteredVacationExpenses(props.expenses, props.userId, vacation.start_date) :
      getExpensesById(props.expenses, props.userId);

  const expenses = filteredExpensesById.map(expense => {
    const categoryName = getCategoryName(expense.category_id);

    const classname = prop => {
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
        vacationMode={props.vacationMode}
        removeExpense={props.removeExpense}
        category_name={expense.category_name || categoryName}
        classname={classname(expense.category_name || categoryName)}
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