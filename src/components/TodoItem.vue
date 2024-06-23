<template>
  <li class="todo-item">
    <div class="todo-content">
      <input type="checkbox" :checked="todo.isCompleted" @change="toggleComplete" class="todo-checkbox" />
      <span :class="{ 'todo-text': true, 'completed': todo.isCompleted }">{{ todo.text }}</span>
    </div>
    <div class="todo-actions">
      <button @click="editTodo" class="edit-btn">編輯</button>
      <button @click="deleteTodo" class="delete-btn">刪除</button>
    </div>
    <div v-if="isEditing" class="edit-container">
      <input type="text" v-model="editingTodo" class="edit-input" />
      <button @click="saveTodo" class="save-btn">確認修改</button>
    </div>
  </li>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  todo: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  isEditing: {
    type: Boolean,
    required: true
  }
})
const editingTodo = ref(props.todo.text)
const emits = defineEmits(['delete-todo', 'edit-todo', 'save-todo', 'toggle-complete'])

const deleteTodo = () => {
  emits('delete-todo', props.index)
}
const editTodo = () => {
  emits('edit-todo', props.index)
}
const saveTodo = () => {
  emits('save-todo', props.index, editingTodo.value)
}
const toggleComplete = () => {
  emits('toggle-complete', props.index)
}
</script>

<style scoped>
.todo-item {
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.todo-content {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.todo-checkbox {
  margin-right: 1rem;
}

.todo-text {
  font-size: 1.1rem;
  color: #2c3e50;
}

.completed {
  text-decoration: line-through;
  color: #7f8c8d;
}

.todo-actions {
  display: flex;
  gap: 0.5rem;
}

.edit-btn,
.delete-btn,
.save-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-btn {
  background-color: #2ecc71;
  color: white;
}

.edit-btn:hover {
  background-color: #27ae60;
}

.delete-btn {
  background-color: #e74c3c;
  color: white;
}

.delete-btn:hover {
  background-color: #c0392b;
}

.edit-container {
  width: 100%;
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}

.edit-input {
  flex-grow: 1;
  padding: 0.5rem;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  font-size: 1rem;
}

.save-btn {
  background-color: #3498db;
  color: white;
}

.save-btn:hover {
  background-color: #2980b9;
}
</style>
