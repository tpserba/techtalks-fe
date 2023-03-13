import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import AddTalk from './components/add-talk/AddTalk';
import TalkList from './components/talk-list/TalkList';
import Talk from './components/talk/Talk';

function App() {
  const talksArr = 
    [
      {
        "id":1,
      },
    ]
  
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/talk-list" element={<TalkList talks={talksArr} isSearchPerformed={false} />} />
        <Route path="/talk/:id" element={<Talk talk={{}} />} />
        <Route path="/add-talk" element={<AddTalk />} />
      </Routes>
    </div>
  )
}

export default App;
