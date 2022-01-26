import { Modal, Button, Stack } from 'react-bootstrap';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../contexts/BudgetsContext';
import { currencyFormatter } from '../utils';

export default function ViewExpensesModal({budgetId, handleClose}) {

    const {getBudgetExpenses, budgets, deleteBudget, deleteExpense} = useBudgets()
    const expenses =  getBudgetExpenses(budgetId)

    const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find(b => b.id === budgetId)

console.log(budget);

  return (
    <Modal show={budgetId != null } onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack directional="horizontal" gap='2'>
                        <div>Expense - {budget?.name}</div>
                        {budgetId !== UNCATEGORIZED_BUDGET_ID &&(
                            <Button
                                size='sm'
                                 variant='outline-danger'
                                 onClick={()=> {
                                     deleteBudget(budget)
                                     handleClose()
                                 }}

                            >Delete</Button>
                        )}
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    {expenses.map(expense =>(
                        <Stack direction='horizontal' key={expense.id} gap="2">
                            <div className="me-auto fs-4">{expense.description}</div>
                            <div className="fs-4">{currencyFormatter.format(expense.amount)}</div>
                            <Button
                            onClick={()=> deleteExpense(expense)}
                             variant='outline-danger' size='sm'>&times;</Button>
                        </Stack>
                    ))}
            </Modal.Body>
    </Modal>
  )
}
