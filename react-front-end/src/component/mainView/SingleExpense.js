import React from 'react';
import "../../sass/expenses.scss";
import classNames from 'classnames';

const SingleExpense = props => {

  // Destructured props
  const {
    id,
    amount,
    created_at,
    removeExpense,
    category_name,
    toggleClass
  } = props;
  
  // Adds a class based on what the expense is categorized
  const tableClass = classNames('d-flex justify-content-around position-relative', {
    'table-warning': toggleClass === 'Savings',
    'table-danger': toggleClass === 'Expense',
    'table-success': toggleClass === 'Income'
  });

  // Deletes an expense from the database
  const removesExpense = id => {
    removeExpense(id);
  }
  
  return (
    <tr key={id} id={id} className={tableClass}>
      <td className='textalign'>{created_at}</td>
      <td className='textalign'>{category_name}</td>
      <td className='textalign'>{'$' + (amount / 100).toFixed(2)}</td>
      <td
      data-id={id}
      className='expense-button'
      onClick={() => removesExpense(id)}
      >
        Remove
      </td>
    </tr>
  )
};

export default SingleExpense;