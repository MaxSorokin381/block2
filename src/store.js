import { createStore } from 'vuex'


const store = createStore({
    state: {
       count: 0
     },
     mutations: {
         setCount: (state, count) => state.count = count,
     },
     getters: {
         getCount: (state) =>
         {
             return state.count
         }
     }  
 })
export default store;
