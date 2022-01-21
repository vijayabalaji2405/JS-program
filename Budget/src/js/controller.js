// import { Transaction, transactionType } from "src/js/model.js";
import { Transaction, transactionType } from "./model";

import AddTransactionView from "./Views/AddTransactionView";
import BalanceView from "./Views/BalanceView";
import ExpenseTrackerView from "./Views/ExpenseTrackerView";
import IncomeTrackerView from "./Views/IncomeTrackerView";

const getTransactionsFromLS = (type) => {
  return JSON.parse(localStorage.getItem(type) || "[]");
};

const saveTransactionInLS = (transaction) => {
  let data = getTransactionsFromLS(transaction.type);
  if (Array.isArray(data)) {
    data.push(transaction);
    localStorage.setItem(transaction.type, JSON.stringify(data));
  }
};

const controlAddTransaction = (e) => {
  e.preventDefault();
  const { amount, type } = AddTransactionView;
  const newTran = new Transaction(type, amount);
  saveTransactionInLS(newTran);
  AddTransactionView.clearForm();
  BalanceView.render(calculateTotalBalance());

  if (newTran.type === transactionType.EXPENSE) {
    ExpenseTrackerView.pushTransactionInContainer(newTran);
  } else {
    IncomeTrackerView.pushTransactionInContainer(newTran);
  }
};

const calculateTotalBalance = () => {
  let expense = getTransactionsFromLS(transactionType.EXPENSE);
  let income = getTransactionsFromLS(transactionType.INCOME);
  let total = 0;
  if (Array.isArray(expense) && Array.isArray(income)) {
    income.forEach((inc) => {
      total += inc.value;
    });

    expense.forEach((ex) => {
      total -= ex.value;
    });
  }
  return total;
};

//Sorting Increas LS list
const HandleSortInc = (a, b) => {
  if (a.value < b.value) return -1;
  else if (a.value > b.value) return 1;
  return 0;
};

//Sorting Decreasing
const HandlesortDec = (a, b) => {
  if (a.value > b.value) return -1;
  else if (b.value < a.value) return 1;
  return 0;
};

const sortAmoutnInc = (type, flag) => {
  const list = getTransactionsFromLS(type);
  if (Array.isArray(list)) {
    if (!flag) list.sort(HandleSortInc);
    else list.sort(HandlesortDec);
  }
  return list;
};

const controlFilterSelect = (e) => {
  console.log(e.target.id);
  if (e.target.id === "income_filter") {
    if (e.target.value === "amount+") {
      const list = sortAmoutnInc(transactionType.INCOME);
      IncomeTrackerView.render(list);
    } else if (e.target.value === "amount-") {
      const list = sortAmoutnInc(transactionType.INCOME, true);
      IncomeTrackerView.render(list);
    } else {
      IncomeTrackerView.render(getTransactionsFromLS(transactionType.INCOME));
    }
  } else {
    if (e.target.value === "amount+") {
      const list = sortAmoutnInc(transactionType.EXPENSE);
      ExpenseTrackerView.render(list);
    } else if (e.target.value === "amount-") {
      const list = sortAmoutnInc(transactionType.EXPENSE, true);
      ExpenseTrackerView.render(list);
    } else {
      ExpenseTrackerView.render(getTransactionsFromLS(transactionType.EXPENSE));
    }
  }
};

const init = () => {
  AddTransactionView.addSubmitHandler(controlAddTransaction);
  BalanceView.render(calculateTotalBalance());
  ExpenseTrackerView.render(getTransactionsFromLS(transactionType.EXPENSE));
  IncomeTrackerView.render(getTransactionsFromLS(transactionType.INCOME));
  IncomeTrackerView.addFilterChangeListener(controlFilterSelect);
  ExpenseTrackerView.addFilterChangeListener(controlFilterSelect);
};
init();
