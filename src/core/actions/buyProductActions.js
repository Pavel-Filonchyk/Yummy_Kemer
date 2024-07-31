export const card = (data) => {
    return {
        type: 'CARD',
        payload: data 
    } 
}
export const calc = (data) => {
    return {
        type: 'CALC',
        payload: data 
    } 
}
export const deleteDish = (data) => {
    return {
        type: 'DELETE_DISH',
        payload: data 
    } 
}