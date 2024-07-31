import restMenuReducer from './restMenuReducer'
import chooseItemsReducer from './chooseItemsReducer'
import buyProductReducer from './buyProductReducer'

export const rootReducer = () => {
    return { 
        restMenuReducer, 
        chooseItemsReducer,
        buyProductReducer
    }
}