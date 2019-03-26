import {getAppName} from '@/api/app'
const actions = {
  async updateAppName({commit}){
    try{
      const {info} = await getAppName()
      commit('SET_APP_NAME',info)
    }catch(err){
      console.log(err)
    }


  }
}

export default actions
