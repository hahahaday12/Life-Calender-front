import { RecoilRoot } from 'recoil';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import Signinpage from './pages/Home/components/main/index';
import SignupPage from './pages/Join/index';
import CalendarPage from './pages/Calendar/index';
import TodoBucketpage from './pages/Todo,Buket/index';
import Diarypage from './pages/Diary/index';
import Error404 from './pages/404';

function App() {
  return (
    <>
      <RecoilRoot>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute
                component={<CalendarPage />}
                status={<Signinpage />}
              />
            }
          />
          <Route path="/signup" element={<SignupPage />} />

          <Route
            path="/calendar"
            element={<PrivateRoute component={<CalendarPage />} />}
          />

          <Route
            path="/todobucket"
            element={<PrivateRoute component={<TodoBucketpage />} />}
          />
          <Route
            path="/diary"
            element={<PrivateRoute component={<Diarypage />} />}
          />
          <Route path="/*" element={<Error404 />} />
        </Routes>
      </RecoilRoot>
    </>
  );
}
export default App;
