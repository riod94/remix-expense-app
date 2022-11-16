import { useMemo } from "react";

function calculateSummaryStatistics(expenses) {
	const amounts = expenses.map((expense) => +expense.amount);
	const maxAmount = Math.max(...amounts);
	const minAmount = Math.min(...amounts);
	const sum = expenses.reduce((prevVal, curVal) => curVal.amount + prevVal, 0);
	const mean = sum / expenses.length;

	return { minAmount, maxAmount, sum, mean };
}

const formatter = new Intl.NumberFormat("id-ID", {
	style: "currency",
	currency: "IDR",
	minimumFractionDigits: 0,
	maximumFractionDigits: 0,
});

function ExpenseStatistics({ expenses }) {
	const { minAmount, maxAmount, sum, mean } = useMemo(
		() => calculateSummaryStatistics(expenses),
		[expenses]
	);

	return (
		<section>
			<h2>Summary Statistics</h2>
			<dl id="expense-statistics">
				<div>
					<dt>Total</dt>
					<dd>{formatter.format(sum)}</dd>
				</div>
				<div>
					<dt>Average</dt>
					<dd>{formatter.format(mean)}</dd>
				</div>
				<div>
					<dt> Min. Amount</dt>
					<dd>{formatter.format(minAmount)}</dd>
				</div>
				<div>
					<dt>Max. Amount</dt>
					<dd>{formatter.format(maxAmount)}</dd>
				</div>
			</dl>
		</section>
	);
}

export default ExpenseStatistics;
