export const chooseDishes = (data) => {
    return {
        type: 'CHOOSE_DISHES',
        payload: data 
    } 
}
export const CHOOSE_DISHES = 'CHOOSE_DISHES'

export const moveSideBar = (data) => {
    return {
        type: 'MOVE_SIDE_BAR',
        payload: data 
    } 
}

export const changeLanguage = (data) => {
    return {
        type: 'CHANGE_LANGUAGE',
        payload: data 
    } 
}

