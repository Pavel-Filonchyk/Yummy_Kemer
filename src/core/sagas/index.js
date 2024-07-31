import { all } from 'redux-saga/effects'

import watcherPostMenu from './postMenuSaga'
import watcherGetMenu from './getMenuSaga'
import watcherPostDishes from './postDishesSaga'

export default function* rootSaga() {
    yield all([
        watcherPostMenu(),
        watcherGetMenu(),
        watcherPostDishes()
    ])
}