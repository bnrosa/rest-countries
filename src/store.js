import {createStore} from 'redux';

const INITIAL_STATE = {
    isDark: false,
}

function toggleDarkMode(state = INITIAL_STATE, action){
    if(action.type === 'TOGGLE'){
        return Object.assign({}, state, {
            isDark: ! state.isDark
        })
    }
    else{
        return Object.assign({}, state, {
            isDark: state.isDark
        })
    }
}

const store = createStore(toggleDarkMode);

export default store;