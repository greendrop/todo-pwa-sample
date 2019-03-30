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
            {{ $t('common.editModel', { model: $t('models.task') }) }}
          </div>
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex xs12 sm12 md12>
      <v-card>
        <v-card-title>
          <v-layout row wrap>
            <v-flex xs12 sm12 md12>
              <form @submit.prevent="submit">
                <task-form
                  :title.sync="task.title"
                  :description.sync="task.description"
                  :done.sync="task.done"
                />
                <v-layout row wrap>
                  <v-flex xs12 sm12 md12>
                    <v-btn color="primary" @click="submit">
                      <v-icon small class="mr-1">fas fa-pencil-alt</v-icon>
                      {{ $t('common.update') }}
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-flex>
          </v-layout>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import TaskForm from '~/components/tasks/Form.vue'

export default {
  components: {
    TaskForm
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
          disabled: false
        },
        {
          text: this.$i18n.t('common.showModel', {
            model: this.$i18n.t('models.task')
          }),
          to: `/tasks/${id}`,
          exact: true,
          disabled: false
        },
        {
          text: this.$i18n.t('common.editModel', {
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
  },
  methods: {
    submit() {
      this.$validator.validateAll().then(async result => {
        if (result) {
          const accessToken = this.$auth.getToken('doorkeeper')
          await this.$store.dispatch('tasks/updateTask', {
            accessToken: accessToken,
            id: this.$route.params.id,
            task: this.task
          })
          if (this.$store.getters['tasks/updateCompleted']) {
            const message = this.$t('messages.updateModel', {
              model: this.$t('models.task')
            })
            this.$toast.success(message)
            this.$router.push(`/tasks/${this.task.id}`)
          } else {
            this.$toast.error('messages.errorOccurred')
          }
        }
      })
    }
  }
}
</script>
