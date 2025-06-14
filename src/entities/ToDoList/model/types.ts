export type ToDoType = {
  id?: number;
  user_id: string;
  category_id: number;
  content: string;
  date: string;
  is_important: boolean;
  is_checked: boolean;
};
