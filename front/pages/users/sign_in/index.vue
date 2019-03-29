<template>
  <div />
</template>

<script>
export default {
  mounted() {
    this.$auth.loginWith('doorkeeper').then(() => {
      this.$toast.success(this.$i18n.t('messages.signedIn'))
    })
  }
}
</script>
