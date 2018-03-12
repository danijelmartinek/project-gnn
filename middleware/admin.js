/*eslint-disable*/

export default function ({ store, redirect, error }) {

  if (!store.state.authUser) {
    return redirect('/')
  }
  else{
    if (!store.state.activityGroups){
      return redirect('/')
    }

    if(!store.state.userGroup){
      return redirect('/')
    }
  }
  
}
  