import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Body from "./components/Body";
import Login from "./components/auth/Login";
import Signup from "./components/auth/SIgnup";
import ProfilePage from "./components/profile/ProfilePage";
import Feed from "./components/feed/Feed";
import Connections from "./components/connections/Connections";
import Requests from "./components/connections/Requests";
import Home from "./components/home/home";
import appStore from "./utils/appStore";
import AuthProvider from "./AuthProvider";
import { PublicRoute, PrivateRoute } from "./routes/Routes";

export default function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <AuthProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <PublicRoute>
                    <Home />
                  </PublicRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <Signup />
                  </PublicRoute>
                }
              />
              <Route element={<Body />}>
                <Route
                  path="/user/feed"
                  element={
                    <PrivateRoute>
                      <Feed />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/user/profile"
                  element={
                    <PrivateRoute>
                      <ProfilePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/user/connections"
                  element={
                    <PrivateRoute>
                      <Connections />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/user/requests"
                  element={
                    <PrivateRoute>
                      <Requests />
                    </PrivateRoute>
                  }
                />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    </>
  );
}
