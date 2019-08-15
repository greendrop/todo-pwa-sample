<template lang="pug">
  div
</template>

<script>
export default {
  mounted() {
    if (this.$auth.loggedIn) {
      this.$auth.redirect('home')
    } else {
      this.$auth.loginWith(process.env.AUTH_STRATEGY_NAME)
    }
  }
}
</script>
