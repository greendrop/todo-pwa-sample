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
            {{ $t('common.newModel', { model: $t('models.task') }) }}
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
                      <v-icon small class="mr-1">fas fa-plus</v-icon>
                      {{ $t('common.create') }}
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
          text: this.$i18n.t('common.newModel', {
            model: this.$i18n.t('models.task')
          }),
          to: '/tasks/new',
          exact: true,
          disabled: true
        }
      ]
    }
  },
  methods: {
    submit() {
      this.$validator.validateAll().then(async result => {
        if (result) {
          const accessToken = this.$auth.getToken('doorkeeper')
          await this.$store.dispatch('tasks/createTask', {
            accessToken: accessToken,
            task: this.task
          })
          if (this.$store.getters['tasks/createCompleted']) {
            const message = this.$t('messages.createModel', {
              model: this.$t('models.task')
            })
            this.$toast.success(message)
            const task = this.$store.getters['tasks/task']
            this.$router.push(`/tasks/${task.id}`)
          } else {
            this.$toast.error('messages.errorOccurred')
          }
        }
      })
    }
  }
}
</script>
