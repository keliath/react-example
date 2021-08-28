import Card from "../UI/Card";
import "./Expenses.css";
import ExpensesFilter from "./ExpenseFilter";
import { useState } from "react";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";

function NewExpense(props) {
  const [filter, setFilter] = useState("2020");

  const saveExpenseFilterHandler = (filterData) => {
    // console.log(filterData);
    setFilter(filterData);
  };

  const filteredExpenses = props.items.filter((expense) => {
    return expense.date.getFullYear().toString() === filter;
  });
  // console.log(filteredExpenses);

  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filter}
        onSaveExpenseFilter={saveExpenseFilterHandler}
      />
      <ExpensesChart expenses={filteredExpenses} />
      <ExpensesList items={filteredExpenses} />
    </Card>
  );
}

export default NewExpense;
