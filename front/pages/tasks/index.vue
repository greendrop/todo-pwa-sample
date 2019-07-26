<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12 sm12 md12)
      v-layout(row wrap)
        v-flex(xs12 sm12 md12 mb-1)
          v-breadcrumbs(:items="breadcrumbItems")

    v-flex(xs12 sm12 md12)
      v-layout(row wrap)
        v-flex(xs12 sm12 md12 mb-1)
          .headline
            | {{ $t('labels.listModel', { model: $t('models.task') }) }}

    v-flex(xs12 sm12 md12)
      v-layout(row wrap)
        v-flex(xs12 sm12 md12 mb-1)
          .text-xs-right
            v-btn(to="/tasks/new")
              v-icon.mr-1(small)
                | fas fa-plus
              | {{ $t('labels.new') }}

        task-list
</template>

<script>
import TaskList from '~/components/organisms/TaskList.vue'

export default {
  middleware: 'authenticated',
  components: {
    TaskList
  },
  computed: {
    breadcrumbItems() {
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
          disabled: true
        }
      ]
    }
  }
}
</script>
