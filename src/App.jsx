import { Provider } from "react-redux";

import store from "./app/store";

const App = () => {
  return (
    <Provider store={store}>
      <p>Book Trading App</p>
    </Provider>
  );
};

export default App;
