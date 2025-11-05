import { Provider } from "react-redux";
import Body from "./components/Body";
import Login from "./components/auth/Login";
import ProfilePage from "./components/profile/ProfilePage";
import Feed from "./components/feed/Feed";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import appStore from "./utils/appStore";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
