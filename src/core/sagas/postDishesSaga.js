import { takeEvery, put, call, select } from 'redux-saga/effects'
import { POST_DISHES, postDishesSuccess, postDishesError } from '../actions/restDishesActions'
import httpProvider from '../../common/httpProvider'
import { menuUrl } from '../../common/api'

function* workerLoader() {

    const postDishes = yield select(state => state.restMenuReducer.postDishes)
    const blockId = yield select(state => state.restMenuReducer.blockId) 
    const token = yield select(state => state.restMenuReducer.token)

    try {
        const { data } = yield call(httpProvider.put, menuUrl(blockId, token), {data: postDishes})
        
        yield put(postDishesSuccess(data))
      } catch (error) {
        yield put(postDishesError(error))
      }
  }

export default function* watcherPostDishes() {
  yield takeEvery(POST_DISHES, workerLoader)
}