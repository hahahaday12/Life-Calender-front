import {RecoilRoot} from 'recoil';
import { Routes, Route} from 'react-router-dom';
import PrivateRoute from "./privateRoute";
import Onepage from './pages/Home/components/main/index';
import TwoPage from './pages/Join/index'
import ThirdPage from './pages/Calendar/index';
import Fourpage from './pages/Todo,Buket/index';
import Fivepage from './pages/Diary/index';
import Error404 from './pages/404';

function App() {

  return (
    <div className="App">
      <>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={
            <PrivateRoute component={<ThirdPage/>} status={<Onepage/>} />
          }/>
          <Route path="/twopage" element={<TwoPage/>}/>

          <Route path="/thirdpage" element={
            <PrivateRoute component={<ThirdPage/>} />
          }/>

          <Route path="/fourpage" element={
            <PrivateRoute component={<Fourpage/>} />
          }/>
          <Route path="/fivepage" element={
            <PrivateRoute component={<Fivepage/>} />
          }/>
          <Route path="/*" element={<Error404 />} /> 
        </Routes>
      </RecoilRoot>
      </>
    </div>
   )
};
export default App;