const initialState = {
    menu: [],
    card: [],
    allCost: 0
}

const buyProductReducer = (state = initialState, action) => {
    switch (action.type){ 
        case 'GET_MENU_SUCCESS':
            const list = Object.keys(action.payload).map(key => ({...action.payload[key], blockId: key}))
            return {
                ...state,
                menu: list
            }
        case 'CARD':
            if (state.card.length === 0){
                return {
                    ...state,
                    card: [action.payload]
                }
            }
            const findCardItem = state.card.find(item => item.id === action.payload.id)
            if (state.card.length > 0 && findCardItem === undefined){
                return {
                    ...state,
                    card: [...state.card, action.payload]
                }
            } else return state
        case 'CALC':
            const findCardElem = state.card.find(item => item.id === action.payload.id)
            const findMenuItem = state.menu.find(item => item.blockId === findCardElem.blockId)
                ?.dishes.find(item => item?.id === action.payload.id)
            const findIndex = state.card.findIndex(item => item.id === action.payload.id)

            let amount
            let cost
            if (action.payload.arith === 'minus' && findCardElem.cost > findMenuItem.cost ){
                amount = Number(findCardElem.amount) - Number(findMenuItem.amount)
                cost = Number(findCardElem.cost) - Number(findMenuItem.cost) 
            }
            if (action.payload.arith === 'minus' && findCardElem.cost <= findMenuItem.cost){
                amount = Number(findCardElem.amount)
                cost = findCardElem.cost
            }
            if (action.payload.arith === 'plus'){
                amount = Number(findCardElem.amount) + Number(findMenuItem.amount)
                cost = Number(findCardElem.cost) + Number(findMenuItem.cost)
            }
            const newCard = {
                name: findCardElem.name,
                discriptions: findCardElem.discriptions,
                image: findCardElem.image,
                id: action.payload.id,
                blockId: findCardElem.blockId,
                amount,
                cost
                
            }
            const deleteCard = state.card.filter(item => item.id !== action.payload.id)
            deleteCard.splice(findIndex, 0, newCard)
            
            return {
                ...state,
                card: deleteCard
            }
        case 'DELETE_DISH':
            const deleteCardElem = state.card.filter(item => item.id !== action.payload.id)
            return {
                ...state,
                card: deleteCardElem
            }
        default: 
        return state;  
    }
}

export default buyProductReducer