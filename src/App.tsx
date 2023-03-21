import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import TalkAdd from './components/talk-add/TalkAdd';
import TalkList from './components/talk-list/TalkList';
import Talk from './components/talk/Talk';
import UserProfile from './components/user-profile/UserProfile';
import TalkEdit from './components/talk-edit/TalkEdit';

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
        <Route path="/talk-edit/:id" element={<TalkEdit />} />
        <Route path="/talk-add" element={<TalkAdd />} />
        <Route path="/user-profile/:id" element={<UserProfile talks={[]} isSearchPerformed={false} />} />        
      </Routes>
    </div>
  )
}

export default App;
