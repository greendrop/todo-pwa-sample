<template>
  <v-list>
    <v-list-tile v-for="(item, i) in items" :key="i" :to="item.to" router exact>
      <v-list-tile-action>
        <v-icon small>{{ item.icon }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title v-text="item.title" />
      </v-list-tile-content>
    </v-list-tile>
    <no-ssr>
      <v-list-tile v-if="!signedIn" @click="signIn()">
        <v-list-tile-action>
          <v-icon small>fas fa-sign-in-alt</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="$t('labels.signIn')" />
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="signedIn" @click="signOut()">
        <v-list-tile-action>
          <v-icon small>fas fa-sign-out-alt</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="$t('labels.signOut')" />
        </v-list-tile-content>
      </v-list-tile>
    </no-ssr>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: 'fas fa-home',
          title: this.$i18n.t('labels.home'),
          to: '/'
        },
        {
          icon: 'fas fa-list',
          title: this.$i18n.t('models.task'),
          to: '/tasks'
        }
      ]
    }
  },
  computed: {
    signedIn() {
      return this.$auth.loggedIn
    }
  },
  methods: {
    signIn() {
      this.$auth.loginWith(process.env.AUTH_STRATEGY_NAME)
    },
    signOut() {
      this.$auth.logout().then(() => {
        this.$toast.success(this.$i18n.t('messages.signedOut'))
      })
    }
  }
}
</script>
