const initialState = {
    dishId: '',
    moveSideBar: false,
    language: 'tr'
}

const chooseDishesReducer = (state = initialState, action) => {
    switch (action.type){ 
        case 'CHOOSE_DISHES':
            return {
                ...state,
                dishId: action.payload
            }
        case 'MOVE_SIDE_BAR':
            return {
                ...state,
                moveSideBar: action.payload
            }
        case 'CHANGE_LANGUAGE':
            return {
                ...state,
                language: action.payload
            }
        default: 
        return state;  
    }
}

export default chooseDishesReducer