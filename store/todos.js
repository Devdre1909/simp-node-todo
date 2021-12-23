import todoApi from '~/api/todo'

export const state = () => ({
  todos: [],
  isLoading: false,
})

export const mutations = {
  update(state, todos) {
    state.todos = todos
  },
  updateLoading(state, status) {
    state.isLoading = status
  },
  updateWithIdAndDate(state, todo) {
    state.todos = state.todos.map((itodo) => {
      if (itodo.id === todo.id) {
        itodo = { ...itodo, ...todo }
      }
      return itodo
    })
  },
  removeTodo(state, todo) {
    const index = state.todos.findIndex((t) => t.id === todo.id)
    state.todos.splice(index, 1)
  },
  addATodo(state, todo) {
    state.todos.unshift(todo)
  },
}

export const actions = {
  async getAllTodos({ commit }) {
    commit('updateLoading', true)
    const req = await todoApi(this.$axios).getAll()
    commit('update', req.body)
    commit('updateLoading', false)
  },
}
