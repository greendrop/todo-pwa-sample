<template>
  <v-layout row wrap>
    <v-flex xs12 sm12 md12>
      <v-layout row wrap>
        <v-flex xs12 sm12 md12 mb-1>
          <v-breadcrumbs :items="breadcrumbItems" />
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex xs12 sm12 md12>
      <v-layout row wrap>
        <v-flex xs12 sm12 md12 mb-1>
          <div class="headline">
            {{ $t('common.listModel', { model: $t('models.task') }) }}
          </div>
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex xs12 sm12 md12>
      <v-layout row wrap>
        <v-flex xs12 sm12 md12 mb-1>
          <div class="text-xs-right">
            <v-btn to="/tasks/new">
              <v-icon small class="mr-1">fas fa-plus</v-icon>
              {{ $t('common.new') }}
            </v-btn>
          </div>
        </v-flex>

        <v-flex xs12 sm12 md12>
          <v-data-table
            :headers="taskHeaders"
            :items="tasks"
            :pagination.sync="pagination"
            :total-items="taskTotalCount"
            :loading="taskLoading"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.id }}</td>
              <td>{{ props.item.title }}</td>
              <td>{{ props.item.description | truncate }}</td>
              <td>{{ props.item.done }}</td>
              <td>{{ props.item.createdAt | datetime }}</td>
              <td>{{ props.item.updatedAt | datetime }}</td>
              <td>
                <v-icon small class="mr-1" @click="showTask(props.item)">
                  fas fa-chevron-down
                </v-icon>
                <v-icon small class="mr-1" @click="editTask(props.item)">
                  fas fa-pencil-alt
                </v-icon>
                <v-icon
                  small
                  class="mr-1"
                  color="error"
                  @click="deleteTask(props.item)"
                >
                  fas fa-trash-alt
                </v-icon>
              </td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  middleware: 'auth',
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
  computed: {
    breadcrumbItems() {
      return [
        {
          text: this.$i18n.t('common.home'),
          to: '/',
          exact: true,
          disabled: false
        },
        {
          text: this.$i18n.t('common.listModel', {
            model: this.$i18n.t('models.task')
          }),
          to: '/tasks',
          exact: true,
          disabled: true
        }
      ]
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
      const accessToken = this.$auth.getToken('doorkeeper')
      const params = { page: page, perPage: rowsPerPage }
      if (sortBy) {
        if (!params.q) {
          params.q = {}
        }
        params.q.s = `${sortBy} ${descending ? 'desc' : 'asc'}`
      }
      await this.$store.dispatch('tasks/getTasks', {
        accessToken: accessToken,
        params: params
      })
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
        const accessToken = this.$auth.getToken('doorkeeper')
        await this.$store.dispatch('tasks/deleteTask', {
          accessToken: accessToken,
          id: task.id
        })
        if (this.$store.getters['tasks/deleteCompleted']) {
          const message = this.$t('messages.destroyModel', {
            model: this.$t('models.task')
          })
          this.$toast.success(message)
          this.getTasks()
        } else {
          this.$toast.error('messages.errorOccurred')
        }
      }
    }
  }
}
</script>
