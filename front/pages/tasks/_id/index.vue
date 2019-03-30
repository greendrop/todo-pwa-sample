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
            {{ $t('common.showModel', { model: $t('models.task') }) }}
          </div>
        </v-flex>
      </v-layout>
    </v-flex>

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
  </v-layout>
</template>

<script>
export default {
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
      task: context.store.getters['tasks/task']
    }
    return data
  },
  methods: {
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
          this.$router.push('/tasks')
        } else {
          this.$toast.error('messages.errorOccurred')
        }
      }
    }
  }
}
</script>
