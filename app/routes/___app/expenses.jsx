import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { FaJs, FaPlus } from "react-icons/fa";
import { ExpensesList } from "~/components/expenses";
import { getExpenses } from "~/data/expenses.server";

// Shared => Expenses Layout
export default function ExpensesLayout() {
	const expenses = useLoaderData();
	const hasExpenses = expenses.length > 0;

	return (
		<>
			<Outlet />
			<main>
				<section id="expenses-actions">
					<Link to="add">
						<FaPlus /> <span>Add Expenses</span>
					</Link>
					<a href="/expenses/raw">
						<FaJs /> Load Raw Data
					</a>
				</section>
				{hasExpenses && <ExpensesList expenses={expenses} />}
				{!hasExpenses && (
					<section>
						<p>No Expenses Found</p>
					</section>
				)}
			</main>
		</>
	);
}

export async function loader() {
	const expenses = await getExpenses();
	return json(expenses);
}
