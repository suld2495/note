import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './App.css';
import Join from './pages/Join/Join';

const App = () => {
  return (
    <div className="App">
      <RecoilRoot>
        <BrowserRouter>
          <Join />
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
};

export default App;
