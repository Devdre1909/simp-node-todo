import { errorResponse, successResponse } from '~/api/response'

/**
 * @param $axios {import('axios').AxiosInstance}
 */
const todoApi = ($axios) => ({
  async getAll() {
    try {
      const req = await $axios.get('/todo')
      return successResponse(req)
    } catch (e) {
      return errorResponse(e)
    }
  },
  async getOnById(todoId) {
    try {
      const req = await $axios.get(`/todo/${todoId}`)
      return successResponse(req)
    } catch (e) {
      return errorResponse(e)
    }
  },
  async create({ title = '', description = '', isCompleted = false }) {
    const payload = { title, description, status: isCompleted }
    try {
      const req = await $axios.post('todo', payload)
      return successResponse(req)
    } catch (e) {
      return errorResponse(e)
    }
  },
  async changeTodoStatus(todoId, { status }) {
    try {
      const req = await $axios.put(`todo/${todoId}`, { status })
      return successResponse(req)
    } catch (e) {
      return errorResponse(e)
    }
  },
  async updateOneById(todoId, { title, description, isCompleted }) {
    const payload = { title, description, status: isCompleted }
    try {
      const req = await $axios.put(`todo/${todoId}`, payload)
      return successResponse(req)
    } catch (e) {
      return errorResponse(e)
    }
  },
  async deleteOnById(todoId) {
    try {
      const req = await $axios.delete(`todo/${todoId}`)
      return successResponse(req)
    } catch (e) {
      return errorResponse(e)
    }
  },
})

export default todoApi
