import {createStore} from 'redux';

const DARK_MODE = {
    isDark: true,
}

function flags(state = DARK_MODE, action){
   return Object.assign({}, state, {
       isDark: ! state.isDark
   })
}

const store = createStore(flags);

export default store;