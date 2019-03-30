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
  errorStatus: null,
  errorData: null,
  createCompleted: false,
  updateCompleted: false,
  deleteCompleted: false
})

export const actions = {
  async getTasks({ commit }, { accessToken, params = {} }) {
    const url = `${apiUrl.getApiBaseUrl()}/api/v1/tasks`
    const response = await this.$axios
      .get(url, {
        headers: { Authorization: accessToken },
        params: changeCaseObject.snakeCase(params),
        paramsSerializer: function(params) {
          return qs.stringify(params, { arrayFormat: 'brackets' })
        }
      })
      .then(response => {
        return {
          tasks: changeCaseObject.camelCase(response.data),
          tasksMeta: {
            totalCount: Number(response.headers['total-count']),
            perPage: Number(params.perPage) || 25,
            currentPage: Number(params.page) || 1
          },
          errorStatus: null,
          errorData: null
        }
      })
      .catch(error => {
        return {
          tasks: [],
          tasksMeta: {
            totalCount: 0,
            perPage: 0,
            currentPage: 0
          },
          errorStatus: error.response.status,
          errorDatr: changeCaseObject.camelCase(error.response.data)
        }
      })
    commit('setTasks', response.tasks)
    commit('setTasksMeta', response.tasksMeta)
    commit('setErrorStatus', response.errorStatus)
    commit('setErrorData', response.errorData)
  },
  async getTaskById({ commit }, { accessToken, id }) {
    const url = `${apiUrl.getApiBaseUrl()}/api/v1/tasks/${id}`
    const response = await this.$axios
      .get(url, { headers: { Authorization: accessToken } })
      .then(response => {
        return {
          task: changeCaseObject.camelCase(response.data),
          errorStatus: null,
          errorData: null
        }
      })
      .catch(error => {
        return {
          task: null,
          errorStatus: error.response.status,
          errorDatr: changeCaseObject.camelCase(error.response.data)
        }
      })
    commit('setTask', response.task)
    commit('setErrorStatus', response.errorStatus)
    commit('setErrorData', response.errorData)
  },
  async createTask({ commit }, { accessToken, task }) {
    const url = `${apiUrl.getApiBaseUrl()}/api/v1/tasks`
    const params = changeCaseObject.snakeCase({ ...task })
    await this.$axios
      .post(url, params, { headers: { Authorization: accessToken } })
      .then(response => {
        const task = changeCaseObject.camelCase(response.data)
        commit('setTask', task)
        commit('setCreateCompleted', true)
        commit('setErrorStatus', null)
        commit('setErrorData', null)
      })
      .catch(error => {
        commit('setCreateCompleted', false)
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
        commit('setUpdateCompleted', true)
        commit('setErrorStatus', null)
        commit('setErrorData', null)
      })
      .catch(error => {
        commit('setUpdateCompleted', false)
        commit('setErrorStatus', error.response.errorStatus)
        commit('setErrorData', error.response.errorData)
      })
  },
  async deleteTask({ commit }, { accessToken, id }) {
    const url = `${apiUrl.getApiBaseUrl()}/api/v1/tasks/${id}`
    await this.$axios
      .delete(url, { headers: { Authorization: accessToken } })
      .then(() => {
        commit('setDeleteCompleted', true)
        commit('setErrorStatus', null)
        commit('setErrorData', null)
      })
      .catch(error => {
        commit('setDeleteCompleted', false)
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
  setErrorStatus(state, data) {
    state.errorStatus = data
  },
  setErrorData(state, data) {
    state.errorData = data
  },
  setCreateCompleted(state, data) {
    state.createCompleted = data
  },
  setUpdateCompleted(state, data) {
    state.updateCompleted = data
  },
  setDeleteCompleted(state, data) {
    state.deleteCompleted = data
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
  errorStatus(state) {
    return state.errorStatus
  },
  errorData(state) {
    return state.errorData
  },
  createCompleted(state) {
    return state.createCompleted
  },
  updateCompleted(state) {
    return state.updateCompleted
  },
  deleteCompleted(state) {
    return state.deleteCompleted
  }
}
