import React, { useState } from 'react';
import Logo from "../Assets/Logo on black transparent small_ 4.png";
import user from "../Assets/Ellipse 2.png";
import { Spinner } from 'react-bootstrap';

const Chat = () => {
  const [playingIndex, setPlayingIndex] = useState(null); // Track which message is currently playing

  const chat = [
    { from: user, msg: "Distorted electric guitar with trap drums. Music has a feeling of anger and mystery.", status: 'pause' },
    { from: Logo, msg: "Sure. Here are two clip variations that have the feeling of anger and mystery.", status: 'pause' },
    { from: user, msg: "Awesome! I love the second option. Can you replace trap drums with a drill beat instead?" },
    { from: Logo, msg: "Sound Verse Assistant reporting for duty. Here's your requested audio file, crafted with bits of magic and musical prowess.", status: 'pause' },
    { from: user, msg: "Generate more similar beats to option three" },
    { from: Logo, msg: "Generating music" }
  ];

  const handlePlayClick = (index) => {
    // Set the current message as playing, and reset others
    setPlayingIndex(index);
  };

  const handlePauseClick = () => {
    // Set all messages to pause
    setPlayingIndex(null);
  };

  return (
    <div className="container-fluid p-3 my-3 mx-3" style={{ height: '100%' }}>
      {chat.map((message, index) => (
        <React.Fragment key={index}>
          <div
            className={`d-flex ${message.from === user ? 'justify-content-end usermsg' : 'justify-content-start soundversemsg'} mb-3 align-items-start`}
          >
            {message.from !== user && (
              <img
                src={Logo}
                alt="Logo"
                style={{ height: 30, width: 30 }}
                className="img-fluid rounded-circle me-2"
              />
            )}

            <div
              style={{
                maxWidth: '60%',
                backgroundColor: message.from === user ? '#0d2034' : '#181a1c',
                color: '#fff',
                padding: '10px',
                borderRadius: '10px',
                borderTopRightRadius: message.from === user ? '0px' : '10px',
                borderTopLeftRadius: message.from === user ? '10px' : '0px',
                marginLeft: message.from === user ? 'auto' : '10px',
                marginRight: message.from === user ? '10px' : 'auto',
                wordWrap: 'break-word',
                whiteSpace: 'pre-wrap',
                textAlign: 'left',
              }}
            >
              {message.msg === "Generating music" ? (
                <div className="d-flex align-items-center">
                  Generating music
                  <Spinner animation="border" size="sm" className="mx-2" />
                </div>
              ) : (
                message.msg
              )}
            </div>

            {message.from === user && (
              <img
                src={user}
                alt="User"
                style={{ height: 30, width: 30 }}
                className="img-fluid rounded-circle ms-2"
              />
            )}
          </div>

          {message.from === Logo && message.msg !== "Generating music" && (
            <div className="d-flex justify-content-start mx-5 play-pause mb-3">
              <div
                className='play p-2 px-3'
                onClick={() => handlePlayClick(index)}
                style={{
                  border: playingIndex === index ? '0.1px solid #7e57de' : 'none', // Border if playing
                  cursor: 'pointer'
                }}
              >
                <i className="bi bi-caret-right-fill"></i>
              </div>

              <div
                className='pause p-2 px-3'
                onClick={handlePauseClick}
                style={{
                  border: playingIndex !== index && playingIndex !== null ? '0.1px solid #7e57de' : 'none', // Border if paused and another is playing
                  cursor: 'pointer'
                }}
              >
                <i className="bi bi-pause"></i>
              </div>
            </div>
          )}
        </React.Fragment>
      ))}

      {/* <div className="d-flex align-items-center mt-5 text-white">
  <input
    type="text"
    className="form-control me-2 custom-input"
    placeholder="What would you like to create?"
    style={{ backgroundColor: '#181a1c', color: '#fff', border: 'none', borderRadius: '15px' }} 
  />
  <i class="bi bi-three-dots threedot" ></i>
  <button className="btn btn-primary senndbtn" style={{ backgroundColor: '#7e57de', border: 'none' }}>
  <i class="bi bi-send-fill send"></i>
  </button>
</div> */}

<div className="d-flex align-items-center mt-5 text-white position-relative">
  <input
    type="text"
    className="form-control me-2 custom-input py-2"
    placeholder="What would you like to create?"
    style={{ backgroundColor: '#181a1c', color: '#fff', border: 'none', borderRadius: '15px', paddingRight: '50px' }} 
  />
  
  {/* Three dots icon */}
  <i className="bi bi-three-dots threedot" style={{
    position: 'absolute',
    right: '50px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
  
  }}></i>
  
  {/* Send button */}
  <button className="btn btn-primary senndbtn" style={{
    border: 'none',
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
  }}>
    <i className="bi bi-send-fill send"></i>
  </button>
</div>


    </div>
  );
};

export default Chat;
