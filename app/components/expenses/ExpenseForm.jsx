import {
	Form,
	Link,
	useActionData,
	useMatches,
	useParams,
	useTransition,
} from "@remix-run/react";

function ExpenseForm() {
	const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
	const errors = useActionData();
	const transition = useTransition();
	const isSubmitting = transition.state === "submitting";

	const params = useParams();
	const matches = useMatches();
	const expenses = matches.find(
		(match) => match.id == "routes/___app/expenses"
	).data;
	const expenseData = expenses.find((expense) => expense.id === params.id);

	const defaultValue = {
		title: expenseData?.title || null,
		amount: expenseData?.amount || null,
		date: expenseData?.date || "",
	};

	const formMethod = expenseData ? "patch" : "post";

	if (params.id && !expenseData) {
		throw new Response()
	}

	return (
		<Form method={formMethod} className="form" id="expense-form">
			<p>
				<label htmlFor="title">Expense Title</label>
				<input
					type="text"
					id="title"
					name="title"
					defaultValue={defaultValue.title}
				/>
			</p>

			<div className="form-row">
				<p>
					<label htmlFor="amount">Amount</label>
					<input
						type="number"
						id="amount"
						name="amount"
						defaultValue={defaultValue.amount}
					/>
				</p>
				<p>
					<label htmlFor="date">Date</label>
					<input
						type="date"
						id="date"
						name="date"
						max={today}
						required
						defaultValue={new Date(defaultValue.date).toLocaleDateString(
							"en-CA"
						)}
					/>
				</p>
			</div>
			{errors && (
				<ul>
					{Object.values(errors).map((error) => (
						<li key={error}>
							<span>{error}</span>
						</li>
					))}
				</ul>
			)}
			<div className="form-actions">
				<button disabled={isSubmitting}>
					{isSubmitting ? "Saving..." : "Save Expense"}
				</button>
				<Link to="..">Cancel</Link>
			</div>
		</Form>
	);
}

export default ExpenseForm;
