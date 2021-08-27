import Card from "../UI/Card";
import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";
import ExpensesFilter from "./ExpenseFilter";
import { useState } from "react";

function NewExpense(props) {
  const [filter, setFilter] = useState("2020");

  const saveExpenseFilterHandler = (filterData) => {
    // console.log(filterData);
    setFilter(filterData);
  };

  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filter}
        onSaveExpenseFilter={saveExpenseFilterHandler}
      />
      <ExpenseItem
        title="hardcoded"
        amount={props.items[0].amount}
        date={props.items[0].date}
      ></ExpenseItem>
      <ExpenseItem
        title={props.items[1].title}
        amount={props.items[1].amount}
        date={props.items[1].date}
      ></ExpenseItem>
      <ExpenseItem
        title={props.items[2].title}
        amount={props.items[2].amount}
        date={props.items[2].date}
      ></ExpenseItem>
      <ExpenseItem
        title={props.items[3].title}
        amount={props.items[3].amount}
        date={props.items[3].date}
      ></ExpenseItem>
    </Card>
  );
}

export default NewExpense;
