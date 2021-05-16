import {createStore, applyMiddleware, Store} from 'redux';
import createSagaMiddleware, {END} from 'redux-saga';

import rootReducer, {AppState} from './reducers';
import {rootSaga} from './root-saga';

const sagaMiddleware = createSagaMiddleware();

export default (initialState: AppState): Store<AppState, any> => {
    const store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));

    sagaMiddleware.run(rootSaga);
    (store as any).runSaga = () => sagaMiddleware.run(rootSaga);
    (store as any).close = () => store.dispatch(END);

    return store;
};
