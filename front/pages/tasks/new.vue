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
            = "{{ $t('labels.newModel', { model: $t('models.task') }) }}"

    task-new
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
          disabled: false
        },
        {
          text: this.$i18n.t('labels.newModel', {
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
