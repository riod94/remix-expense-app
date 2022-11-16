// underscore 3x representasi untuk mengabungkan halaman dalam 1 layout tanpa menambahkan path baru di depannya
import { Outlet } from "@remix-run/react";
import ExpensesHeader from "~/components/navigation/ExpensesHeader";
import expensesStyles from "~/styles/expenses.css";

export default function ExpensesAppLayout() {
	return (
		<>
			<ExpensesHeader />
			<Outlet />
		</>
	);
}

export function links() {
	return [{ rel: "stylesheet", href: expensesStyles }];
}
