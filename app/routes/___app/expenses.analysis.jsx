import { json } from "@remix-run/node";
import { Link, useCatch, useLoaderData } from "@remix-run/react";
import { Chart, ExpenseStatistics } from "~/components/expenses";
import Error from "~/components/util/Error";
import { getExpenses } from "~/data/expenses.server";

export default function ExpensesAnalysisPage() {
	const expenses = useLoaderData();

	return (
		<main>
			<Chart expenses={expenses} />
			<ExpenseStatistics expenses={expenses} />
		</main>
	);
}

export async function loader() {
	const expenses = await getExpenses();
	if (!expenses || expenses.length == 0) {
		throw json(
			{
				message: "Could not load expenses for the requested analysis",
			},
			{
				status: 404,
				statusText: "Expenses Not Found",
			}
		);
	}
	return json(expenses);
}

export function CatchBoundary() {
	const caught = useCatch();

	return (
		<main title={caught.statusText}>
			<Error title={caught.statusText}>
				<p>
					{caught.data?.message ||
						"Something went wrong. Please try again later"}
				</p>
				<p>
					Back to <Link>Home</Link>.
				</p>
			</Error>
		</main>
	);
}
