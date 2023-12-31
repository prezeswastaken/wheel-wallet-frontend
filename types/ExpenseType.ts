export type Expense = {
  id: number;
  user_id: number;
  car_id: number;
  car_model: string;
  name: string;
  cost: number;
  date: string;
  planned: boolean;
  created_at: string;
  updated_at: string;
};

export type ExpenseCreateData = {
  name: string;
  cost: number;
  date: string;
  planned: boolean;
  car_id: number;
};

export type ExpenseEditData = {
  name: string;
  cost: number;
  date: string;
  planned: boolean;
};
