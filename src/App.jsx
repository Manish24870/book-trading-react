import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import store from "./app/store";
import theme from "./utils/mantine/theme";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
          <NotificationsProvider>
            <p>Book Trading App</p>
          </NotificationsProvider>
        </MantineProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
