<template lang="pug">
  v-app(dark)
    v-navigation-drawer(
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app)

      navigation-list

    v-toolbar(
      :clipped-left="clipped"
      fixed
      app)

      v-toolbar-side-icon(@click="drawer = !drawer")
      v-toolbar-title(v-text="title")

    v-content
      v-container
        nuxt
    v-footer(:fixed="fixed" app)
</template>

<script>
import NavigationList from '~/components/organisms/NavigationList.vue'

export default {
  components: {
    NavigationList
  },
  data() {
    return {
      clipped: true,
      drawer: null,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Todo PWA Sample'
    }
  }
}
</script>
