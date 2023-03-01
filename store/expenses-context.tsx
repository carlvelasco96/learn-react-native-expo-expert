import React, { createContext, ReactNode, useReducer } from "react";

export type Expense = {
  id?: string;
  description: string;
  amount: number;
  date: Date;
};

const DUMMY_EXPENSES: Expense[] = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-01-05"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 18.59,
    date: new Date("2022-02-18"),
  },
  {
    id: "e6",
    description: "Another book",
    amount: 18.59,
    date: new Date("2023-02-26"),
  },
];

type ExpensesContextType = {
  expenses: Expense[];
  addExpense: ({ description, amount, date }: Expense) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, { description, amount, date }: Expense) => void;
};

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: (expense: Expense) => {},
  deleteExpense: (id: string) => {},
  updateExpense: (id: string, expense: Expense) => {},
});

type Props = {
  children: ReactNode;
};
type State = Expense[];
type Action = {
  type: "ADD" | "UPDATE" | "DELETE";
  payload: Expense | string | { id: string; data: Expense };
};

function expensesReducer(state: State, action: Action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      const newExpense = { ...(action.payload as Expense), id };
      return [newExpense, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex((expense: Expense) => {
        return (
          expense.id === (action.payload as { id: string; data: Expense }).id
        );
      });
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = {
        ...updatableExpense,
        ...(action.payload as { id: string; data: Expense }).data,
      };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense: Expense) => {
        return expense.id !== (action.payload as string);
      });
    default:
      return state;
  }
}

const ExpensesContextProvider = ({ children }: Props) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData: Expense) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id: string) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id: string, expenseData: Expense) {
    dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
  }

  const value: ExpensesContextType = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
