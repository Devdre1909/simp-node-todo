<template>
  <div class="todo-wrapper">
    <h3 class="title">
      <span>{{ todo.title }}</span>
      <span
        :class="{
          status: true,
          'status-completed': todo.status,
        }"
        >{{ todo.status ? 'Completed' : 'Not Completed' }}</span
      >
    </h3>
    <p class="description">
      {{ todo.description }}
    </p>
    <div class="todo-footer">
      <ButtonComponent @click="onEdit(todo)"> Edit </ButtonComponent>
      <ButtonComponent
        :is-loading="changingStatus"
        :variant="todo.status ? 'red' : 'green'"
        @click="toggleStatus(todo)"
      >
        {{ todo.status ? 'Mark Not Completed' : 'Mark Complete' }}
      </ButtonComponent>
      <ButtonComponent
        :is-loading="deletingTodo"
        variant="red"
        @click="deleteTodo(todo)"
      >
        Delete
      </ButtonComponent>
    </div>
  </div>
</template>

<script>
import ButtonComponent from '~/components/ButtonComponent'
import todoApi from '~/api/todo'

export default {
  name: 'TodoItem',
  components: {
    ButtonComponent,
  },
  props: {
    todo: {
      type: Object,
      required: true,
    },
    onSelectTodoForEdit: { type: Function, required: true },
  },
  data: () => ({
    changingStatus: false,
    deletingTodo: false,
  }),
  methods: {
    async toggleStatus(todo) {
      this.changingStatus = true
      const req = await todoApi(this.$axios).changeTodoStatus(todo.id, {
        status: !todo.status,
      })
      await this.$store.commit('todos/updateWithIdAndDate', req.body)
      this.changingStatus = false
    },
    async deleteTodo(todo) {
      this.deletingTodo = true
      await todoApi(this.$axios).deleteOnById(todo.id)
      this.$store.commit('todos/removeTodo', todo)
      this.deletingTodo = false
    },
    onEdit(todo) {
      this.onSelectTodoForEdit({ ...todo })
    },
  },
}
</script>

<style scoped>
.todo-wrapper {
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 3px 8px rgb(0 0 0 / 10%);
  margin-bottom: 25px;
}

.title {
  color: #333;
  font-weight: 700;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.description {
  margin-top: 16px;
  font-size: 16px;
  font-weight: 400;
  color: #444;
}

.status {
  color: white;
  font-size: 14px;
  background: goldenrod;
  font-weight: 400;
  padding: 2px 10px;
  border-radius: 12px;
}

.status-completed {
  background: green;
}

.todo-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 15px;
  gap: 10px;
}
</style>
