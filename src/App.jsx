import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import store from "./app/store";
import theme from "./utils/mantine/theme";
import Layout from "./components/Layout/Layout";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
          <NotificationsProvider>
            <Layout />
          </NotificationsProvider>
        </MantineProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
