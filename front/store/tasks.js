import qs from 'qs'
import apiUrl from '~/lib/api-url'
import changeCaseObject from '~/lib/change-case-object'

export const state = () => ({
  tasks: [],
  tasksMeta: {
    currentPage: 0,
    perPage: 0,
    totalCount: 0
  },
  task: null,
  got: false,
  created: false,
  updated: false,
  deleted: false,
  errorStatus: null,
  errorData: null
})

export const actions = {
  async getTasks({ commit }, { accessToken, params = {} }) {
    const url = `${apiUrl.getApiBaseUrl()}/api/v1/tasks`
    await this.$axios
      .get(url, {
        headers: { Authorization: accessToken },
        params: changeCaseObject.snakeCase(params),
        paramsSerializer: function(params) {
          return qs.stringify(params, { arrayFormat: 'brackets' })
        }
      })
      .then(response => {
        const tasks = changeCaseObject.camelCase(response.data)
        const tasksMeta = {
          totalCount: Number(response.headers['total-count']),
          perPage: Number(params.perPage) || 25,
          currentPage: Number(params.page) || 1
        }
        commit('setTasks', tasks)
        commit('setTasksMeta', tasksMeta)
        commit('setGot', true)
        commit('setErrorStatus', null)
        commit('setErrorData', null)
      })
      .catch(error => {
        const tasks = []
        const tasksMeta = {
          totalCount: 0,
          perPage: 0,
          currentPage: 0
        }
        commit('setTasks', tasks)
        commit('setTasksMeta', tasksMeta)
        commit('setGot', false)
        commit('setErrorStatus', error.response.status)
        commit('setErrorData', error.response.data)
      })
  },
  async getTaskById({ commit }, { accessToken, id }) {
    const url = `${apiUrl.getApiBaseUrl()}/api/v1/tasks/${id}`
    await this.$axios
      .get(url, { headers: { Authorization: accessToken } })
      .then(response => {
        const task = changeCaseObject.camelCase(response.data)
        commit('setTask', task)
        commit('setGot', true)
        commit('setErrorStatus', null)
        commit('setErrorData', null)
      })
      .catch(error => {
        commit('setTask', [])
        commit('setGot', false)
        commit('setErrorStatus', error.response.status)
        commit('setErrorData', error.response.data)
      })
  },
  async createTask({ commit }, { accessToken, task }) {
    const url = `${apiUrl.getApiBaseUrl()}/api/v1/tasks`
    const params = changeCaseObject.snakeCase({ ...task })
    await this.$axios
      .post(url, params, { headers: { Authorization: accessToken } })
      .then(response => {
        const task = changeCaseObject.camelCase(response.data)
        commit('setTask', task)
        commit('setCreated', true)
        commit('setErrorStatus', null)
        commit('setErrorData', null)
      })
      .catch(error => {
        commit('setCompleted', false)
        commit('setErrorStatus', error.response.errorStatus)
        commit('setErrorData', error.response.errorData)
      })
  },
  async updateTask({ commit }, { accessToken, id, task }) {
    const url = `${apiUrl.getApiBaseUrl()}/api/v1/tasks/${id}`
    const params = changeCaseObject.snakeCase({
      title: task.title,
      description: task.description,
      done: task.done
    })
    await this.$axios
      .put(url, params, { headers: { Authorization: accessToken } })
      .then(() => {
        commit('setUpdated', true)
        commit('setErrorStatus', null)
        commit('setErrorData', null)
      })
      .catch(error => {
        commit('setUpdated', false)
        commit('setErrorStatus', error.response.errorStatus)
        commit('setErrorData', error.response.errorData)
      })
  },
  async deleteTask({ commit }, { accessToken, id }) {
    const url = `${apiUrl.getApiBaseUrl()}/api/v1/tasks/${id}`
    await this.$axios
      .delete(url, { headers: { Authorization: accessToken } })
      .then(() => {
        commit('setDeleted', true)
        commit('setErrorStatus', null)
        commit('setErrorData', null)
      })
      .catch(error => {
        commit('setDeleted', false)
        commit('setErrorStatus', error.response.errorStatus)
        commit('setErrorData', error.response.errorData)
      })
  }
}

export const mutations = {
  setTasks(state, data) {
    state.tasks = data
  },
  setTasksMeta(state, data) {
    state.tasksMeta = data
  },
  setTask(state, data) {
    state.task = data
  },
  setGot(state, data) {
    state.got = data
  },
  setCreated(state, data) {
    state.created = data
  },
  setUpdated(state, data) {
    state.updated = data
  },
  setDeleted(state, data) {
    state.deleted = data
  },
  setErrorStatus(state, data) {
    state.errorStatus = data
  },
  setErrorData(state, data) {
    state.errorData = data
  }
}

export const getters = {
  tasks(state) {
    return state.tasks
  },
  tasksMeta(state) {
    return state.tasksMeta
  },
  task(state) {
    return state.task
  },
  got(state) {
    return state.got
  },
  created(state) {
    return state.created
  },
  updated(state) {
    return state.updated
  },
  deleted(state) {
    return state.deleted
  },
  errorStatus(state) {
    return state.errorStatus
  },
  errorData(state) {
    return state.errorData
  }
}
