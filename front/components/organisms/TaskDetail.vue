<template lang="pug">
  v-flex(xs12 sm12 md12)
    v-card
      v-card-title
        v-layout(row wrap)
          v-flex(xs12 sm12 md12 mb-1)
            .text-xs-right
              v-btn(@click="editTask(task)")
                v-icon.mr-1(small)
                  | fas fa-pencil-alt
                | {{ $t('labels.edit') }}
              v-btn(color="error" @click="deleteTask(task)")
                v-icon.mr-1(small)
                  | fas fa-trash-alt
                | {{ $t('labels.destroy') }}

          v-flex(xs2 sm2 md2 mb-3)
            .subheading
              | {{ $t('models.attributes.task.id') }}
          v-flex(xs10 sm10 md10 mb-3)
            | {{ task.id }}

          v-flex(xs2 sm2 md2 mb-3)
            .subheading
              | {{ $t('models.attributes.task.title') }}
          v-flex(xs10 sm10 md10 mb-3)
            | {{ task.title }}

          v-flex(xs2 sm2 md2 mb-3)
            .subheading
              | {{ $t('models.attributes.task.description') }}
          v-flex(xs10 sm10 md10 mb-3)
            | {{ task.description }}

          v-flex(xs2 sm2 md2 mb-3)
            .subheading
              | {{ $t('models.attributes.task.done') }}
          v-flex(xs10 sm10 md10 mb-3)
            | {{ task.done }}

          v-flex(xs2 sm2 md2 mb-3)
            .subheading
              | {{ $t('models.attributes.task.createdAt') }}
          v-flex(xs10 sm10 md10 mb-3)
            | {{ task.createdAt | datetime }}

          v-flex(xs2 sm2 md2 mb-3)
            .subheading
              | {{ $t('models.attributes.task.updatedAt') }}
          v-flex(xs10 sm10 md10 mb-3)
            | {{ task.updatedAt | datetime }}
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  methods: {
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
          this.$router.push('/tasks')
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
