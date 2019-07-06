<template>
  <v-flex xs12 sm12 md12>
    <v-card>
      <v-card-title>
        <v-layout row wrap>
          <v-flex xs12 sm12 md12>
            <form @submit.prevent="submit">
              <TaskForm :task.sync="localTask" />

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
</template>

<script>
import _ from 'lodash'
import TaskForm from '~/components/molecules/TaskForm.vue'

export default {
  components: {
    TaskForm
  },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localTask: {}
    }
  },
  watch: {
    task: {
      handler(val, oldVal) {
        if (!_.isEqual(val, oldVal)) {
          this.localTask = _.cloneDeep(val)
        }
      },
      deep: true
    },
    localTask: {
      handler(val, oldVal) {
        this.$emit('update:task', val)
      },
      deep: true
    }
  },
  mounted() {
    this.localTask = this.task
  },
  methods: {
    submit() {
      this.$validator.validateAll().then(async result => {
        if (result) {
          const accessToken = this.$auth.getToken(
            process.env.AUTH_STRATEGY_NAME
          )
          await this.$store.dispatch('tasks/updateTask', {
            accessToken: accessToken,
            id: this.task.id,
            task: this.task
          })
          if (this.$store.getters['tasks/updated']) {
            const message = this.$t('messages.updateModel', {
              model: this.$t('models.task')
            })
            this.$toast.success(message)
            this.$router.push(`/tasks/${this.task.id}`)
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
