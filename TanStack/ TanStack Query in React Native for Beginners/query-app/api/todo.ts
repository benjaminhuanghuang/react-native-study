const API_URL = process.env.EXPO_PUBLIC_API_URL;

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_URL}/todos`);
  const data = await response.json();
  return data;
}
