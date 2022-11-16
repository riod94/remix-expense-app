import { prisma } from "./database.server";

export function addedExpense(expenseData) {
    return prisma.expense.create({
        data: {
            title: expenseData.title,
            amount: +expenseData.amount,
            date: new Date(expenseData.date)
        }
    })
        .then(res => res)
        .catch(e => console.error(e))
}

export function getExpenses() {
    const expenses = prisma.expense.findMany({ orderBy: { date: 'desc' } })
        .then((res) => res)
        .catch((e) => console.log(e));
    return expenses
}

export function getExpense(id) {
    const expense = prisma.expense.findFirst({ where: { id } })
        .then(res => res)
        .catch(e => console.log(e))
    return expense
}

export function updateExpense(id, expenseData) {
    return prisma.expense.update({
        where: { id },
        data: {
            title: expenseData.title,
            amount: +expenseData.amount,
            date: new Date(expenseData.date)
        }
    })
        .then(res => res)
        .catch(e => console.error(e))
}

export function deleteExpense(id) {
    return prisma.expense.delete({ where: { id } })
        .then(res => res)
        .catch(e => console.error(e))
}