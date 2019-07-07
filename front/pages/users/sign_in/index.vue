<template>
  <div />
</template>

<script>
export default {
  mounted() {
    this.$auth.loginWith(process.env.AUTH_STRATEGY_NAME)
  }
}
</script>
