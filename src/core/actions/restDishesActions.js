export const postDishes = (data) => {
    return {
        type: 'POST_DISHES',
        payload: data 
    } 
}
export const POST_DISHES = 'POST_DISHES'

export const postDishesSuccess = (data) => {
    return {
        type: 'POST_DISHES_SUCCESS',
        payload: data 
    } 
}
export const postDishesError = (data) => {
    return {
        type: 'POST_DISHES_ERROR',
        payload: data 
    } 
}