import useVisualMode from '../../hooks/useVisualMode';
import ExpenseTable from './ExpenseTable';
import React, { useState } from 'react';
import LineGraph from './LineGraph';
import '../../sass/expenses.scss';
import '../../sass/login.scss';
import {
	getCategoryName,
	getFirstExpenseByID,
	getCurrenciesOptions
} from '../../helpers/helper_functions';
import {
	toggleClassNameExpenseInput,
	toggleRemoveIncomeButton,
	toggleClassNameBlur,
	toggleRemoveMapview
} from '../../helpers/helper_classnames';

const Expenses = props => {

	// Destructured props
	const {
		addExpense,
		removeExpense
	} = props;

	const [state, setState] = useState({
		date: '',
		amount: 0,
		category_id: 0,
		input: 'disappear',
		goal_amount: 3000000,
		category_name: 'category',
		goal_name: 'Vacation: Iceland',
		currency: props.state.currentCurrency || 'USD',
		exchangeRate: props.state.exchangeRates.rates[props.state.currentCurrency]
	});

	// Adds or removes a class based on state.input
	const removeIncomeButton = toggleRemoveIncomeButton(state)
	const expenseInput = toggleClassNameExpenseInput(state);
	const removeMapview = toggleRemoveMapview(state)
	const blur = toggleClassNameBlur(state);
	const EXPENSES = 'EXPENSES';
	const LINE = 'LINE';

	const { mode, transition, back } = useVisualMode(LINE);

	//gets list of all currencies in api list
	const currencies = getCurrenciesOptions(props.state.currencySymbols)
	const expenseID = getFirstExpenseByID(props.state.expenses)

	// Send input data to backend 
	const submit = input => {
		const expense = {
			id: input.expense_id,
			user_id: input.user_id,
			created_at: input.date,
			amount: input.amount,
			category_id: input.category_id,
			category_name: input.category_name,
			goal_name: input.goal_name,
			goal_amount: input.goal_amount,
			currentCurrency: state.currency
		};
		setState(prev => {
			return {
				...prev,
				date: '',
				amount: 0,
				category_name: 'category',
				category_id: 0,
				input: 'disappear'
			}
		})
		addExpense(expense);
	};

	return (
		<div id='expenses-page'>
			{mode === LINE && (
				<LineGraph
					key='savingGraph'
					back={back}
					user={props.state.user}
					goals={props.state.goals}
					expenses={props.state.expenses}
					dataPoints={props.state.dataPoints}
					transition={transition}
					vacationMode={props.state.vacationMode}
					vacationData={props.vacationData}
					changeCurrency={props.state.changeCurrency}
					currencySymbols={props.state.currencySymbols}
					exchangeRates={props.state.exchangeRates}
					currentCurrency={props.state.currentCurrency}
				/>
			)}
			{mode === EXPENSES && (
				<div id="user-expense-input">
					<ExpenseTable
						key='expenseTable'
						goals={props.state.goals}
						userId={props.state.user}
						expenses={props.state.expenses}
						vacationMode={props.state.vacationMode}
						removeExpense={removeExpense}
						changeCurrency={props.state.changeCurrency}
						currencySymbols={props.state.currencySymbols}
						exchangeRates={props.state.exchangeRates}
						currentCurrency={props.state.currentCurrency}
					/>
					<div id='input-card' className={expenseInput}>
						<form className={"d-flex justify-content-around row row-cols-lg-auto g-3 align-items-center p-3"}>
							<div className="col-12">
								<label
									className="visually-hidden form-select-lg"
									htmlFor="inlineFormInputGroupUsername"
								>
									Amount
								</label>
								<div className="input-group-text form-select-sm w-100">
									<input
										className="form-control form-control-sm w-100"
										list="datalistOptions"
										id="exchange-search"
										value={props.state.currentCurrency}
										onChange={e => {
											e.persist();
											props.state.changeCurrency(e.target.value)
											setState(prev => {
												return {
													...prev,
													currency: e.target.value,
													exchangeRate: props.state.exchangeRates.rates[e.target.value]
												}
											})
										}}
									/>
									<datalist id="datalistOptions">
										{currencies}
									</datalist></div>
							</div>
							<div className="input-group w-25">
								<input
									type="number"
									inputMode="decimal"
									min="0.01"
									step="0.01"
									className="form-control"
									id="inlineFormInputGroupUsername"
									placeholder="Amount"
									onChange={event => {
										event.persist();
										setState(prev => {
											return {
												...prev,
												amount: (event.target.value / props.state.exchangeRates.rates[props.state.currentCurrency]) * 100
											}
										})
									}
									}
								/>
							</div>
							<div className="col-12 expense-input-category">
								<label
									className="visually-hidden"
									htmlFor="inlineFormSelectPref"
								>
									Category
								</label>
								<select
									className="select form-select-lg"
									value={state.category_id}
									onChange={event => {
										event.persist();
										setState(prev => {
											return {
												...prev,
												category_name: getCategoryName(event.target.value),
												category_id: parseInt(event.target.value)
											}
										});
									}}
								>
									<option value="0" disabled>
										Category
									</option>
									<option value="1">Eating Out</option>
									<option value="2">Entertainment</option>
									<option value="3">Fuel</option>
									<option value="4">Groceries</option>
									<option value="5">Income</option>
									<option value="6">Insurance</option>
									<option value="7">Rent</option>
									<option value="8">Savings</option>
									<option value="9">Shopping</option>
									<option value="10">Other</option>
								</select>
							</div>
							<div className="col-lg-3 col-sm-6">
								<label htmlFor="date" className="visually-hidden">
									date
								</label>
								<input
									id="date"
									className="form-control"
									type="date"
									value={state.date}
									onChange={event => {
										event.persist();
										setState(prev => { return { ...prev, date: event.target.value } })
									}}
								/>
								<span id="dateSelected"></span>
							</div>
							<div className="col-12 d-flex align-items-center">
								<button
									type="submit"
									className="btn btn-primary submit text-dark m-1 gradient-custom-3"
									onClick={e => {
										e.preventDefault();
										submit({
											expense_id: expenseID.id + 1 ||
												props.state.expenses.length + 1,
											user_id: props.state.user,
											date: state.date,
											amount: state.amount,
											category_id: state.category_id,
											category_name: state.category_name,
											goal_name: state.goal_name,
											goal_amount: state.goal_amount
										});
									}}
								>
									Submit
								</button>
								<button
									onClick={(e) => {
										e.preventDefault()
										setState(prev => {
											return { ...prev, input: 'disappear' }
										});
									}}
									className='btn btn-danger m-1 cancel'>
									Cancel
								</button>
							</div>
						</form>
					</div>
					<div className={blur}>
					</div>
					<div className="">
						<div className="d-flex column align-items-center justify-content-center text-center">
							<div className='d-flex row justify-content-center align-items-center w-75'>
								<button
									id='add-expense'
									type="submit"
									className={removeIncomeButton}
									onClick={() => {
										setState(prev => {
											return { ...prev, input: 'appear' }
										});
									}}
								>
									Add New
								</button>
								<div className='w-50 d-flex justify-content-center'>
									<button
										name='graph-thumbnail'
										className={removeMapview}>
										<img
											onClick={() =>
												transition(LINE)}
											id='graph-thumbnail' src='../../../chart.png' alt='graph thumbnail' />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
export default Expenses