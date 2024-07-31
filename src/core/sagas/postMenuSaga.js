import { takeEvery, put, call, select } from 'redux-saga/effects'
import { POST_MENU, postMenuSuccess } from '../actions/restMenuActions'
import httpProvider from '../../common/httpProvider'
import { MENU_URL } from '../../common/api'

function* workerLoader() {
    const postMenu = yield select(state => state.restMenuReducer.postMenu)
    
    try {
        const { data } = yield call(httpProvider.post, MENU_URL, {data: postMenu})
        
        yield put(postMenuSuccess(data))
      } catch (error) {
        yield put(console.log(error))
      }
  }

export default function* watcherPostMenu() {
  yield takeEvery(POST_MENU, workerLoader)
}