import { RecoilRoot } from 'recoil';
import './App.css';
import Login from './pages/Login';

const App = () => {
  return (
    <div className="App">
      <RecoilRoot>
        <Login />
      </RecoilRoot>
    </div>
  );
};

export default App;
