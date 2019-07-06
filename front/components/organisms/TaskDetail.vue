<template>
  <v-flex xs12 sm12 md12>
    <v-card>
      <v-card-title>
        <v-layout row wrap>
          <v-flex xs12 sm12 md12 mb-1>
            <div class="text-xs-right">
              <v-btn @click="editTask(task)">
                <v-icon small class="mr-1">
                  fas fa-pencil-alt
                </v-icon>
                {{ $t('common.edit') }}
              </v-btn>
              <v-btn color="error" @click="deleteTask(task)">
                <v-icon small class="mr-1">
                  fas fa-trash-alt
                </v-icon>
                {{ $t('common.destroy') }}
              </v-btn>
            </div>
          </v-flex>

          <v-flex xs2 sm2 md2 mb-3>
            <div class="subheading">
              {{ $t('models.attributes.task.id') }}
            </div>
          </v-flex>
          <v-flex xs10 sm10 md10 mb-3>
            {{ task.id }}
          </v-flex>

          <v-flex xs2 sm2 md2 mb-3>
            <div class="subheading">
              {{ $t('models.attributes.task.title') }}
            </div>
          </v-flex>
          <v-flex xs10 sm10 md10 mb-3>
            {{ task.title }}
          </v-flex>

          <v-flex xs2 sm2 md2 mb-3>
            <div class="subheading">
              {{ $t('models.attributes.task.description') }}
            </div>
          </v-flex>
          <v-flex xs10 sm10 md10 mb-3>
            {{ task.description }}
          </v-flex>

          <v-flex xs2 sm2 md2 mb-3>
            <div class="subheading">
              {{ $t('models.attributes.task.done') }}
            </div>
          </v-flex>
          <v-flex xs10 sm10 md10 mb-3>
            {{ task.done }}
          </v-flex>

          <v-flex xs2 sm2 md2 mb-3>
            <div class="subheading">
              {{ $t('models.attributes.task.createdAt') }}
            </div>
          </v-flex>
          <v-flex xs10 sm10 md10 mb-3>
            {{ task.createdAt | datetime }}
          </v-flex>

          <v-flex xs2 sm2 md2 mb-3>
            <div class="subheading">
              {{ $t('models.attributes.task.updatedAt') }}
            </div>
          </v-flex>
          <v-flex xs10 sm10 md10 mb-3>
            {{ task.updatedAt | datetime }}
          </v-flex>
        </v-layout>
      </v-card-title>
    </v-card>
  </v-flex>
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
        const accessToken = this.$auth.getToken(process.env.AUTH_STRATEGY_NAME)
        await this.$store.dispatch('tasks/deleteTask', {
          accessToken: accessToken,
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
