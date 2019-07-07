export default function(context) {
  // 未ログイン時、ログインする
  if (!context.app.$auth.loggedIn) {
    // ログイン後の遷移用にパスを登録
    const path = context.route.fullPath
    context.app.$cookies.set('auth.beforeSigninPath', path)
    // ログイン画面に遷移
    context.app.$auth.redirect('login')
  }
}
