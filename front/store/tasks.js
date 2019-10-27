import TaskRepository from '~/repositories/task-repository'

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
  async getTasks({ commit }, { params = {} }) {
    const response = await TaskRepository.getList(params).catch(error => {
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

    const tasks = response.data
    const tasksMeta = {
      totalCount: Number(response.headers.totalCount),
      perPage: Number(params.perPage) || 25,
      currentPage: Number(params.page) || 1
    }
    commit('setTasks', tasks)
    commit('setTasksMeta', tasksMeta)
    commit('setGot', true)
    commit('setErrorStatus', null)
    commit('setErrorData', null)
  },
  async getTaskById({ commit }, { id }) {
    const response = await TaskRepository.get(id).catch(error => {
      commit('setTask', null)
      commit('setGot', false)
      commit('setErrorStatus', error.response.errorStatus)
      commit('setErrorData', error.response.errorData)
    })

    const task = response.data
    commit('setTask', task)
    commit('setGot', true)
    commit('setErrorStatus', null)
    commit('setErrorData', null)
  },
  async createTask({ commit }, { task }) {
    const response = await TaskRepository.create(task).catch(error => {
      commit('setCompleted', false)
      commit('setErrorStatus', error.response.errorStatus)
      commit('setErrorData', error.response.errorData)
    })

    commit('setTask', response.data)
    commit('setCreated', true)
    commit('setErrorStatus', null)
    commit('setErrorData', null)
  },
  async updateTask({ commit }, { id, task }) {
    await TaskRepository.update(id, task).catch(error => {
      commit('setUpdated', false)
      commit('setErrorStatus', error.response.errorStatus)
      commit('setErrorData', error.response.errorData)
    })

    commit('setUpdated', true)
    commit('setErrorStatus', null)
    commit('setErrorData', null)
  },
  async deleteTask({ commit }, { id }) {
    await TaskRepository.delete(id).catch(error => {
      commit('setDeleted', false)
      commit('setErrorStatus', error.response.errorStatus)
      commit('setErrorData', error.response.errorData)
    })

    commit('setDeleted', true)
    commit('setErrorStatus', null)
    commit('setErrorData', null)
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
