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
            {{ $t('labels.showModel', { model: $t('models.task') }) }}
          </div>
        </v-flex>
      </v-layout>
    </v-flex>

    <TaskDetail :task="task" />
  </v-layout>
</template>

<script>
import TaskDetail from '~/components/organisms/TaskDetail.vue'

export default {
  middleware: 'auth',
  components: {
    TaskDetail
  },
  data() {
    return {
      task: null
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
          disabled: true
        }
      ]
    }
  },
  async asyncData(context) {
    const accessToken = context.app.$auth.getToken(
      process.env.AUTH_STRATEGY_NAME
    )
    await context.store.dispatch('tasks/getTaskById', {
      accessToken: accessToken,
      id: context.route.params.id
    })
    const data = {
      task: context.store.getters['tasks/task']
    }
    return data
  }
}
</script>
