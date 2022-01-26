import { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { Container } from "react-bootstrap";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import BudgetCard from "./components/BudgetCard";
import {useBudgets } from "./contexts/BudgetsContext";

function App() {
  const [showAddBudgetgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const {budgets,getBudgetExpenses} = useBudgets()

  return(
    <>
  <Container className="my-4">
    <Stack direction="horizontal" gap='2' className="mb-4">
      <h1 className="me-auto">Budgets</h1>
      <Button variant="primary" onClick={()=> setShowAddBudgetModal(true)}>Add Budget</Button>
      <Button variant="outline-primary" onClick={()=>setShowAddExpenseModal(true)} >Add Expense</Button>
    </Stack>
    <div style={{display:'grid', gridTemplateColumns:"repeat(auto-fill, minmax(300px,1fr))",gap:"1rem",alignItems:"flex-start"}}>
      
      {budgets.map(budget =>{
        const amount = getBudgetExpenses(budget.id).reduce((total,expense)=> total + expense.amount,0) 
       return  (
          <BudgetCard 
            key={budget.id}
            name={budget.name} 
            amount={amount} 
            max={budget.max}/>
    
          )
      })}
    </div>
  </Container>
  <AddBudgetModal show = {showAddBudgetgetModal} handleClose={() => setShowAddBudgetModal(false)}/>
  <AddExpenseModal show = {showAddExpenseModal} 

      handleClose={() => setShowAddExpenseModal(false)}

    />
  </>
  );
}

export default App;
