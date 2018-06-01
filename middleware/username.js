/*eslint-disable*/
export default function ({ store, redirect, error }) {
    if (store.state.authUser) {
        if (!store.state.authUser.username) {
            return redirect('/username')
            }
        }
  }
  