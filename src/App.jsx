import jwt_decode from "jwt-decode";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import store from "./app/store";
import theme from "./utils/mantine/theme";
import Layout from "./components/Layout/Layout";
import { setUserLoading, setCurrentUser } from "./features/user/userSlice";
import { setMyProfileLoading, getMyProfile } from "./features/profile/profileSlice";
import setAuthToken from "./utils/auth/setAuthToken";
import { socket, SocketContext } from "./context/socket";

if (localStorage.jwt) {
  store.dispatch(setUserLoading(true));
  store.dispatch(setMyProfileLoading(true));
  const token = localStorage.jwt;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  store.dispatch(getMyProfile());
}

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
          <NotificationsProvider>
            <SocketContext.Provider value={socket}>
              <Layout />
            </SocketContext.Provider>
          </NotificationsProvider>
        </MantineProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
