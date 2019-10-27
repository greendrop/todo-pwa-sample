import Repository from '~/repositories/repository'

const resource = '/api/v1/tasks'

export default {
  getList(params) {
    const url = resource
    return Repository.get(url, { params: params })
  },
  get(id) {
    const url = `${resource}/${id}`
    return Repository.get(url)
  },
  create(params) {
    const url = resource
    return Repository.post(url, params)
  },
  update(id, params) {
    const url = `${resource}/${id}`
    return Repository.put(url, params)
  },
  delete(id) {
    const url = `${resource}/${id}`
    return Repository.delete(url)
  }
}
