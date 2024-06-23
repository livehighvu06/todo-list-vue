import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({ todos: [] }),
  actions: {
    addTodo(text) {
      this.todos = [...this.todos, { id: Date.now(), text, isCompleted: false }]
    },
    updateTodo(index, newTaskName) {
      if (this.todos[index]) {
        this.todos[index].text = newTaskName
      }
    },
    deleteTodo(index) {
      this.todos = this.todos.filter((_, i) => i != index)
    },
    toggleComplete(index) {
      if (this.todos[index]) {
        this.todos[index].isCompleted = !this.todos[index].isCompleted
      }
    }
  }
})
