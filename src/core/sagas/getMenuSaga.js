import { takeEvery, put, call } from 'redux-saga/effects'
import { GET_MENU, getMenuSuccess, getMenuError } from '../actions/restMenuActions'
import httpProvider from '../../common/httpProvider'
import { MENU_URL } from '../../common/api'

function* workerLoader() {
    try {
        const { data } = yield call(httpProvider.get, MENU_URL)
    
        yield put(getMenuSuccess(data))
      } catch (error) {
        yield put(getMenuError(error))
      }
  }

export default function* watcherGetMenu() {
  yield takeEvery(GET_MENU, workerLoader)
}