export const postMenu = (data) => {
    return {
        type: 'POST_MENU',
        payload: data 
    } 
}
export const POST_MENU = 'POST_MENU'

export const postMenuSuccess = (data) => {
    return {
        type: 'POST_MENU_SUCCESS',
        payload: data 
    } 
}
export const postMenuError = (data) => {
    return {
        type: 'POST_MENU_ERROR',
        payload: data 
    } 
}

export const getMenu = (data) => {
    return {
        type: 'GET_MENU',
        payload: data 
    } 
}
export const GET_MENU = 'GET_MENU'

export const getMenuSuccess = (data) => {
    return {
        type: 'GET_MENU_SUCCESS',
        payload: data 
    } 
}
export const getMenuError = (data) => {
    return {
        type: 'GET_MENU_ERROR',
        payload: data 
    } 
}