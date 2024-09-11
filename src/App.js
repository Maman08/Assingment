import React from 'react';
import Navbar from './components/Navbar.jsx'; 
import VideoEditor from "./components/VideoEditor.jsx";
import Chat from './components/Chat.jsx';
function App() {
  return (
   <div className="container-fluid " style={{height:'100%'}}>
    <div className="row">
     <Navbar />
      <div className="col-md-7  px-5" style={{background:'#101010'}}><Chat/></div>
      <div className="col-md-5 px-5 " style={{background:'#080808'}}>
        <VideoEditor />
      </div>
    </div>
   </div>
  );
}

export default App;
