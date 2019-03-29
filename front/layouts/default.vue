<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="$t(item.title)" />
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="!signedIn" @click="signIn()">
          <v-list-tile-action>
            <v-icon>fas fa-sign-in-alt fa-lg</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="$t('common.signIn')" />
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="signedIn" @click="signOut()">
          <v-list-tile-action>
            <v-icon>fas fa-sign-out-alt fa-lg</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="$t('common.signOut')" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="clipped" fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app />
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: null,
      fixed: false,
      items: [
        {
          icon: 'fas fa-home fa-lg',
          title: 'common.home',
          to: '/'
        },
        {
          icon: 'fas fa-list fa-lg',
          title: 'models.task',
          to: '/tasks'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Todo PWA Sample'
    }
  },
  computed: {
    signedIn() {
      return this.$auth.loggedIn
    }
  },
  methods: {
    signIn() {
      this.$auth.loginWith('doorkeeper').then(() => {
        this.$toast.success(this.$i18n.t('messages.signedIn'))
      })
    },
    signOut() {
      this.$auth.logout().then(() => {
        this.$toast.success(this.$i18n.t('messages.signedOut'))
      })
    }
  }
}
</script>
