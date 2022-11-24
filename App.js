import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { reducers } from './redux/reducers';
import rootSaga from './redux/sagas';
import Root from './Root';
// import store from './redux/store';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}
