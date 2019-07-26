<template lang="pug">
  v-flex(xs12 sm12 md12)
    v-card
      v-card-title
        v-layout(row wrap)
          v-flex(xs12 sm12 md12)
            form(@submit.prevent="submit")
              task-form(:task.sync="task")

              v-layout(row wrap)
                v-flex(xs12 sm12 md12)
                  v-btn(color="primary" @click="submit")
                    v-icon.mr-1(small)
                      | fas fa-plus
                    | {{ $t('labels.create') }}
</template>

<script>
import TaskForm from '~/components/molecules/TaskForm.vue'

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
  methods: {
    submit() {
      this.$validator.validateAll().then(async result => {
        if (result) {
          const accessToken = this.$auth.getToken(
            process.env.AUTH_STRATEGY_NAME
          )
          await this.$store.dispatch('tasks/createTask', {
            accessToken: accessToken,
            task: this.task
          })
          if (this.$store.getters['tasks/created']) {
            const message = this.$t('messages.createModel', {
              model: this.$t('models.task')
            })
            this.$toast.success(message)
            const task = this.$store.getters['tasks/task']
            this.$router.push(`/tasks/${task.id}`)
          } else {
            const message = this.$t('messages.errorOccurred')
            this.$toast.error(message)
            this.$log.error(this.$store.getters['tasks/errorStatus'])
            this.$log.error(this.$store.getters['tasks/errorData'])
          }
        }
      })
    }
  }
}
</script>
