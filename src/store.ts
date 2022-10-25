import { makeAutoObservable } from "mobx";

// Standard interface and functions
export interface Todo {
  id: number;
  text: string;
  done: boolean;
}
//Define methods
const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);

const addTodo = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    text,
    done: false,
  },
];

// MobX implementation
class Store {
  todos: Todo[] = [];
  newTodo: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  addTodo() {
    this.todos = addTodo(this.todos, this.newTodo);
    this.newTodo = "";
  }

  removeTodo(id: number) {
    this.todos = removeTodo(this.todos, id);
  }

  load(url: string) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => (this.todos = data));
  }
}

const store = new Store();
export default store;
