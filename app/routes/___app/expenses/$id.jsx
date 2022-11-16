import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { ExpenseForm } from "~/components/expenses";
import Modal from "~/components/util/Modal";
import { deleteExpense, updateExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";

export default function ExpensesDetailPage() {
	const navigate = useNavigate();

	const closeHandler = () => {
		navigate("..");
	};

	return (
		<Modal onClose={closeHandler}>
			<ExpenseForm />
		</Modal>
	);
}

export async function action({ params, request }) {
	try {
		if (request.method == "PATCH") {
			const formData = await request.formData();
			const expenseData = Object.fromEntries(formData);

			validateExpenseInput(expenseData);

			await updateExpense(params.id, expenseData);
		}
		if (request.method == "DELETE") {
			await deleteExpense(params.id);
			return {expenseId: params.id}
		}
	} catch (error) {
		return error;
	}
	return redirect("/expenses");
}
