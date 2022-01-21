import React,{useContext, useState} from "react"
import {v4 as uuidV4} from 'uuid'
import useLocalStorage from '../hooks/useLocalStorage'


const BudgetsContext = React.createContext()

export function useBudgets(){
    return useContext(BudgetsContext);

}

export const BudgetsProvider = ({children})=>{
    const [budgets,setBudget] = useLocalStorage("budget",[])
    const [expenses,setExpenses] = useLocalStorage("expense",[])
    
    function getBudgetExpenses(budgetId){
        return expenses.filter(expense => expense.budgetId===budgetId)
    }

    function addExpense({description, amount , budgetId}){
        setExpenses(prevExpenses => {
            return [...prevExpenses,{id:uuidV4, description, amount, budgetId}]
        })}


    function addBudget({name, max}){
        setBudget(prevBudgets => {
            if(prevBudgets.find(budget => budget.name === name)){
                return prevBudgets
            }
            return [...prevBudgets,{id:uuidV4, name, max}]
        })
    }

    function deleteBudget({id}){
        setBudget(prevBudgets =>{
            prevBudgets.filter(prevBudgets => prevBudgets.id !== id)
        })
    }


    function deleteExpense({id}){
       setExpenses(prevExpenses => {
           prevExpenses.filter(expense => expense.id !== id)
       })

    }

    return (
        <BudgetsContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense
        }}>
            {children}
        </BudgetsContext.Provider>
    )
}