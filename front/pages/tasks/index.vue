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

        <TaskList />
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import TaskList from '~/components/organisms/TaskList.vue'

export default {
  middleware: 'auth',
  components: {
    TaskList
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
  }
}
</script>
