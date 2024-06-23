<template>
  <div class="todo-container">
    <h1 class="title">待辦事項</h1>
    <div class="input-container">
      <input type="text" v-model="newTodo" placeholder="新增待辦事項" class="todo-input" />
      <button @click="addTodo" class="add-btn">新增</button>
    </div>
    <ul class="todo-list">
      <TodoItem v-for="(todo, index) in todos" :key="todo.id" :isEditing="editingIndex === index" :todo="todo"
        :index="index" @delete-todo="deleteTodo" @edit-todo="editTodo" @save-todo="saveTodo"
        @toggle-complete="toggleComplete" />
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../stores/todoStore'
import { storeToRefs } from 'pinia'
import TodoItem from './TodoItem.vue'

const todoStore = useTodoStore()
const { todos } = storeToRefs(todoStore)
const newTodo = ref('')
const editingIndex = ref(-1)

const addTodo = () => {
  const trimmedTodo = newTodo.value.trim()
  if (trimmedTodo) {
    todoStore.addTodo(trimmedTodo)
    newTodo.value = ''
  }
}

const editTodo = (index) => {
  editingIndex.value = index
}

const saveTodo = (index, newTaskName) => {
  todoStore.updateTodo(index, newTaskName)
  editingIndex.value = -1
}

const deleteTodo = (index) => {
  todoStore.deleteTodo(index)
}

const toggleComplete = (index) => {
  todoStore.toggleComplete(index)
}
</script>

<style scoped>
.todo-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.input-container {
  display: flex;
  margin-bottom: 1.5rem;
}

.todo-input {
  flex-grow: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px 0 0 8px;
  font-size: 1rem;
  outline: none;
}

.add-btn {
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
  white-space: nowrap;
}

.add-btn:hover {
  background-color: #2980b9;
}

.todo-list {
  list-style-type: none;
  padding: 0;
}
</style>
