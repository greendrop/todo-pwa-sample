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

    <TaskNew />
  </v-layout>
</template>

<script>
import TaskNew from '~/components/organisms/TaskNew.vue'

export default {
  middleware: 'auth',
  components: {
    TaskNew
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
  }
}
</script>
