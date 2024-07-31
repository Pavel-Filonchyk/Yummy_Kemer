const initialState = {
    menu: [],
    postMenu: [],
    postDishes: [],
    blockId: '',
    token: ''
}

const restMenuReducer = (state = initialState, action) => {
    switch (action.type){ 
        case 'POST_MENU':
            //console.log(action.payload)
            return {
                ...state,
                postMenu: action.payload
            }
        case 'GET_MENU_SUCCESS':
            const list = Object.keys(action.payload).map(key => ({...action.payload[key], blockId: key}))
            return {
                ...state,
                menu: list
            }
        case 'POST_DISHES':
            const filter = state.menu?.filter(item => item.nameDishRu === action.payload?.nameDishRu)[0]
            const newMenu = {
                image: filter?.image,
                nameDishTr: filter?.nameDishTr,
                nameDishRu: filter?.nameDishRu,
                nameDishEn: filter?.nameDishEn,
                dishes: [...filter?.dishes, action.payload.dishes]
            }
            return {
                ...state,
                postDishes: newMenu,
                blockId: filter?.blockId,
                token: action.payload.token
            }
        case 'POST_DISHES_SUCCESS':
            console.log(action.payload)
            return {
                ...state,
                
            }
        case 'POST_DISHES_ERROR':
            console.log(action.payload)
            return {
                ...state,
                
            }
        default: 
        return state;  
    }
}

export default restMenuReducer

