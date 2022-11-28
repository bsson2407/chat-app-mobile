import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { reducers } from './redux/reducers';
import Root from './Root';
import rootSaga from './redux/sagas';
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
console.log('rootSaga', rootSaga);
sagaMiddleware.run(rootSaga);

export default function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}
