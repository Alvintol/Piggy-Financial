const express = require('express');
const router = express.Router();

module.exports = db => {
	router.get('/goals', (req, res) => {
		db.query(
			`
    SELECT goals.user_id, goals.goal_name, goals.start_date, goals.end_date, goals.amount
    FROM goals
    JOIN users ON user_id = users.id
		WHERE goals.amount > 0;
    `
		)
			.then(data => {
				const goals = data.rows;
				res.json(goals);
			})
			.catch(error => {
				console.log('The error is: ', error);
			});
	});

	router.put('/goals', (req, res) => {
		console.log('req.body.goals', req.body.goals)
		db.query(
			`
    UPDATE goals 
    SET goal_name = $1,
		start_date = $2,
    end_date = $3,
    amount = $4
    WHERE user_id = $5
		AND goals.amount > 0;
    `,
		[req.body.goals.goal_name, req.body.goals.start_date, req.body.goals.end_date, req.body.goals.amount, req.body.goals.user_id]
		)
			.then(data => {
				console.log('DATA!!~', data)
				console.log('DATA.ROWS!!~', data.rows) // this is empty, why?
				const goals = data.rows;
				res.json(goals);
			})
			.catch(error => {
				console.log('The error is: ', error);
			});
	});

	return router;
};
