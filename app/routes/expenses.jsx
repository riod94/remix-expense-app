import { Outlet } from "@remix-run/react";
import expensesStyles from '~/styles/expenses.css'

// Shared => Expenses Layout
export default function ExpensesLayout() {
	return (
		<main>
			<h1>Expenses Layout</h1>
			<Outlet />
		</main>
	);
}

export function links() {
	return [{ rel: "stylesheet", href: expensesStyles }];
}
