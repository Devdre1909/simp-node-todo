<template>
  <div class="container">
    <ModalComponent
      :title="isEditing ? 'Edit Todo' : 'Create Todo'"
      :open.sync="modalOpen"
      @close="closedModal"
    >
      <form
        @submit.prevent="
          () => {
            isEditing ? editTodo() : createTodo()
          }
        "
      >
        <div class="form">
          <label>Title</label>
          <input
            v-model="todo.title"
            required
            type="text"
            placeholder="Title"
          />
        </div>
        <div class="form">
          <label>Description</label>
          <textarea v-model="todo.description" rows="4"></textarea>
        </div>
        <div class="form">
          <ButtonComponent
            type="submit"
            :is-loading="creatingTodo || editingTodo"
          >
            {{ isEditing ? 'Update' : 'Save' }}
          </ButtonComponent>
        </div>
      </form>
    </ModalComponent>
    <h1 class="title" style="margin-bottom: 20px">
      <span>Simple Todo</span>
      <ButtonComponent @click="modalOpen = true">Add Todo</ButtonComponent>
    </h1>
    <div>
      <template v-if="loadingTodos">
        <p>Loading...</p>
      </template>
      <template v-else>
        <TodoItem
          v-for="t in todos"
          :key="t.id"
          :on-select-todo-for-edit="onSelectTodoForEdit"
          :todo="t"
        />
      </template>
    </div>
  </div>
</template>

<script>
import TodoItem from '~/components/TodoItem'
import ModalComponent from '~/components/ModalComponent'
import ButtonComponent from '~/components/ButtonComponent'
import todoApi from '~/api/todo'
export default {
  name: 'IndexPage',
  components: {
    TodoItem,
    ModalComponent,
    ButtonComponent,
  },
  data: () => ({
    modalOpen: false,
    creatingTodo: false,
    isEditing: false,
    editingTodo: false,
    todo: {
      title: '',
      description: '',
    },
  }),
  computed: {
    todos() {
      return this.$store.state.todos.todos
    },
    loadingTodos() {
      return this.$store.state.todos.isLoading
    },
  },
  created() {
    this.$store.dispatch('todos/getAllTodos')
  },
  methods: {
    closedModal() {
      this.todo = {}
      this.isEditing = false
    },
    async createTodo() {
      this.creatingTodo = true
      const req = await todoApi(this.$axios).create(this.todo)
      this.$store.commit('todos/addATodo', req.body)
      this.creatingTodo = false
      this.modalOpen = false
      this.todo = { title: '', description: '' }
    },
    async editTodo() {
      this.editingTodo = true
      const req = await todoApi(this.$axios).updateOneById(
        this.todo.id,
        this.todo
      )
      this.$store.commit('todos/updateWithIdAndDate', req.body)
      this.editingTodo = false
      this.isEditing = false
      this.modalOpen = false
      this.todo = { title: '', description: '' }
    },
    onSelectTodoForEdit(todo) {
      this.todo = todo
      this.isEditing = true
      this.modalOpen = true
    },
  },
}
</script>

<style>
.container {
  max-width: 80%;
  width: 80%;
  margin: 0 auto;
  padding: 22px 16px;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
