<template lang="pug">
  v-flex(xs12 sm12 md12)
    v-data-table(
      :headers="taskHeaders"
      :items="tasks"
      :pagination.sync="pagination"
      :total-items="taskTotalCount"
      :loading="taskLoading")
      template(slot="items" slot-scope="props")
        td {{ props.item.id }}
        td {{ props.item.title }}
        td {{ props.item.description | truncate }}
        td {{ props.item.done }}
        td {{ props.item.createdAt | datetime }}
        td {{ props.item.updatedAt | datetime }}
        td
          v-icon.mr-1(small @click="showTask(props.item)")
            | fas fa-chevron-down
          v-icon.mr-1(small @click="editTask(props.item)")
            | fas fa-pencil-alt
          v-icon.mr-1(
            small
            color="error"
            @click="deleteTask(props.item)")
            | fas fa-trash-alt
</template>

<script>
export default {
  data() {
    return {
      taskHeaders: [
        { text: this.$i18n.t('models.attributes.task.id'), value: 'id' },
        { text: this.$i18n.t('models.attributes.task.title'), value: 'title' },
        {
          text: this.$i18n.t('models.attributes.task.description'),
          value: 'description'
        },
        { text: this.$i18n.t('models.attributes.task.done'), value: 'done' },
        {
          text: this.$i18n.t('models.attributes.task.createdAt'),
          value: 'createdAt'
        },
        {
          text: this.$i18n.t('models.attributes.task.updatedAt'),
          value: 'updatedAt'
        },
        { text: '', value: 'id', sortable: false }
      ],
      tasks: [],
      taskTotalCount: 0,
      taskLoading: true,
      pagination: {}
    }
  },
  watch: {
    pagination: {
      handler() {
        this.getTasks()
      },
      deep: true
    }
  },
  methods: {
    async getTasks() {
      this.taskLoading = true
      const { sortBy, descending, page, rowsPerPage } = this.pagination
      const params = { page, perPage: rowsPerPage }
      if (sortBy) {
        if (!params.q) {
          params.q = {}
        }
        params.q.s = `${sortBy} ${descending ? 'desc' : 'asc'}`
      }
      await this.$store.dispatch('tasks/getTasks', {
        params
      })

      if (!this.$store.getters['tasks/got']) {
        this.$toast.error('mekkssages.errorOccurred')
        this.$log.error(this.$store.getters['tasks/errorStatus'])
        this.$log.error(this.$store.getters['tasks/errorData'])
      }

      this.tasks = this.$store.getters['tasks/tasks']
      const tasksMeta = this.$store.getters['tasks/tasksMeta']
      this.taskTotalCount = tasksMeta.totalCount
      this.taskLoading = false
    },
    showTask(task) {
      this.$router.push(`/tasks/${task.id}`)
    },
    editTask(task) {
      this.$router.push(`/tasks/${task.id}/edit`)
    },
    async deleteTask(task) {
      if (confirm(this.$t('messages.destroyConfirm'))) {
        await this.$store.dispatch('tasks/deleteTask', {
          id: task.id
        })
        if (this.$store.getters['tasks/deleted']) {
          const message = this.$t('messages.destroyModel', {
            model: this.$t('models.task')
          })
          this.$toast.success(message)
          this.getTasks()
        } else {
          const message = this.$t('messages.errorOccurred')
          this.$toast.error(message)
          this.$log.error(this.$store.getters['tasks/errorStatus'])
          this.$log.error(this.$store.getters['tasks/errorData'])
        }
      }
    }
  }
}
</script>
