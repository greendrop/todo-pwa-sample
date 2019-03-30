<template>
  <v-layout row wrap>
    <v-flex xs12 sm12 md12>
      <v-text-field
        v-model="localTitle"
        v-validate="'required|max:255'"
        :counter="255"
        :label="$t('models.attributes.task.title')"
        :error-messages="errors.collect('title')"
        :data-vv-as="$t('models.attributes.task.title')"
        :data-vv-name="'title'"
        required
      />
      <v-textarea
        v-model="localDescription"
        :label="$t('models.attributes.task.description')"
        :error-messages="errors.collect('description')"
        :data-vv-as="$t('models.attributes.task.description')"
        :data-vv-name="'description'"
      />
      <v-switch
        v-model="localDone"
        :label="$t('models.attributes.task.done')"
        :error-messages="errors.collect('done')"
        :data-vv-as="$t('models.attributes.task.done')"
        :data-vv-name="'done'"
      />
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    done: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    localTitle: {
      get: function() {
        return this.title
      },
      set: function(value) {
        this.$emit('update:title', value)
      }
    },
    localDescription: {
      get: function() {
        return this.description
      },
      set: function(value) {
        this.$emit('update:description', value)
      }
    },
    localDone: {
      get: function() {
        return this.done
      },
      set: function(value) {
        this.$emit('update:done', value)
      }
    }
  }
}
</script>
