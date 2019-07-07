<template>
  <div />
</template>

<script>
export default {
  mounted() {
    // ログイン後のパスが登録されている場合、遷移する
    const beforeSigninPath = this.$cookies.get('auth.beforeSigninPath')
    if (beforeSigninPath && beforeSigninPath !== '') {
      this.$router.replace(beforeSigninPath)
      this.$cookies.remove('auth.beforeSigninPath')
    }
  }
}
</script>
