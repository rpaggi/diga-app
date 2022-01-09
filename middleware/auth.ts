export default async function({ store, redirect, $axios } : { store:any, redirect:any, $axios:any }) {
  // If the user is not authenticated
  let token  = localStorage.getItem('token')

  if (!token) {
    return redirect('/login')
  }

  try{
    let me = await $axios.get('me', {
      headers:{
        'Authorization' : `Bearer ${token}`
      }
    })
    store.commit('user', me.data)
    $axios.defaults.headers.common.Authorization = `Bearer ${token}`
  }catch(e){
    localStorage.removeItem('token')
    return redirect('/login')
  }

}