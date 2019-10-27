<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12 sm12 md12)
      v-text-field(
        v-model="localTask.title"
        v-validate="'required|max:255'"
        :counter="255"
        :label="$t('models.attributes.task.title')"
        :error-messages="errors.collect('title')"
        :data-vv-as="$t('models.attributes.task.title')"
        :data-vv-name="'title'"
        required)

      v-textarea(
        v-model="localTask.description"
        :label="$t('models.attributes.task.description')"
        :error-messages="errors.collect('description')"
        :data-vv-as="$t('models.attributes.task.description')"
        :data-vv-name="'description'")

      v-switch(
        v-model="localTask.done"
        :label="$t('models.attributes.task.done')"
        :error-messages="errors.collect('done')"
        :data-vv-as="$t('models.attributes.task.done')"
        :data-vv-name="'done'")
</template>

<script>
import _ from 'lodash'

export default {
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
      }
    },
    localTask: {
      handler(val, _oldVal) {
        this.$emit('update:task', val)
      },
      deep: true
    }
  },
  mounted() {
    this.localTask = this.task
  }
}
</script>
