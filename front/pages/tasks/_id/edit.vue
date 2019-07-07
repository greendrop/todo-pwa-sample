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
        <v-flex xs12 sm12 md12 mb-3>
          <div class="headline">
            {{ $t('labels.editModel', { model: $t('models.task') }) }}
          </div>
        </v-flex>
      </v-layout>
    </v-flex>

    <TaskEdit :task.sync="task" />
  </v-layout>
</template>

<script>
import TaskEdit from '~/components/organisms/TaskEdit.vue'

export default {
  middleware: 'auth',
  components: {
    TaskEdit
  },
  data() {
    return {
      task: {
        title: '',
        description: '',
        done: false
      }
    }
  },
  computed: {
    breadcrumbItems() {
      const id = this.$route.params.id
      return [
        {
          text: this.$i18n.t('labels.home'),
          to: '/',
          exact: true,
          disabled: false
        },
        {
          text: this.$i18n.t('labels.listModel', {
            model: this.$i18n.t('models.task')
          }),
          to: '/tasks',
          exact: true,
          disabled: false
        },
        {
          text: this.$i18n.t('labels.showModel', {
            model: this.$i18n.t('models.task')
          }),
          to: `/tasks/${id}`,
          exact: true,
          disabled: false
        },
        {
          text: this.$i18n.t('labels.editModel', {
            model: this.$i18n.t('models.task')
          }),
          to: `/tasks/${id}/edit`,
          exact: true,
          disabled: true
        }
      ]
    }
  },
  async asyncData(context) {
    const accessToken = context.app.$auth.getToken('doorkeeper')
    await context.store.dispatch('tasks/getTaskById', {
      accessToken: accessToken,
      id: context.route.params.id
    })
    const data = {
      task: { ...context.store.getters['tasks/task'] }
    }
    return data
  }
}
</script>
