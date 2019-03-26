export default store => {

  if(localStorage.state) store.replaceState(JSON.parse(localStorage.state))


  // 每次提交mutation都会触发这个函数
  store.subscribe((mutation, state)=>{
    localStorage.state = JSON.stringify(state)
  })
}
