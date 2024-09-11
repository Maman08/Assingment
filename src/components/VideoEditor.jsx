import React, { useState, useRef, useEffect } from 'react';
import Multitrack from 'wavesurfer-multitrack';
import './VideoEditor.css'; // Import custom styles

const VideoEditor = () => {
  const colors = [
    { waveColor: '#746a58', bgColor: '#1a1a1a' }, // Color 1
    { waveColor: '#614468', bgColor: '#160435' }, // Color 2
    { waveColor: '#8c4f3e', bgColor: '#340303' }, // Color 3
  ];

  const [videoSrc, setVideoSrc] = useState(null);
  const [audios, setAudios] = useState([]);
  const multitrackRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const toggleMute = () => {
    if (multitrackRef.current) {
      isMuted
        ? multitrackRef.current.setVolume(1)
        : multitrackRef.current.setVolume(0);
      setIsMuted(!isMuted);
    }
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoSrc(URL.createObjectURL(file));
    }
  };

  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const audioUrl = URL.createObjectURL(file);
      setAudios((prevAudios) => [...prevAudios, audioUrl]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setVideoSrc(URL.createObjectURL(file));
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (audios.length > 0) {
      if (multitrackRef.current) {
        multitrackRef.current.destroy();
      }

      try {
        const waveforms = audios.map((audioUrl, index) => {
          const colorIndex = index % colors.length;
          const { waveColor, bgColor } = colors[colorIndex];

          return {
            id: index,
            url: audioUrl,
            draggable: true,
            startPosition: 0,
            volume: 0.8,
            options: {
              waveColor: waveColor,
              progressColor: waveColor,
              trackBackground: bgColor,
              barWidth: 1.5,
              barGap: 1,
              barRadius: 1,
            },
          };
        });

        multitrackRef.current = Multitrack.create(waveforms, {
          container: document.querySelector('#multitrack-container'),
          minPxPerSec: 100,
          cursorWidth: 2,
          cursorColor: '#fff',
          dragBounds: true,
          envelopeOptions: {
            lineColor: 'rgba(255, 0, 0, 0.7)',
            lineWidth: 4,
            dragPointSize: window.innerWidth < 600 ? 20 : 10,
            dragPointFill: '#ffffff',
            dragPointStroke: '#ffffff',
          },
        });
      } catch (error) {
        console.error('Error initializing Multitrack:', error);
      }

      return () => {
        if (multitrackRef.current) {
          multitrackRef.current.destroy();
        }
      };
    }
  }, [audios]);

  useEffect(() => {
    const syncAudioWithVideo = () => {
      if (videoRef.current && multitrackRef.current) {
        const videoTime = videoRef.current.currentTime;
        multitrackRef.current.setTime(videoTime);
      }
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('timeupdate', syncAudioWithVideo);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('timeupdate', syncAudioWithVideo);
      }
    };
  }, [videoSrc]);

  const addAudioTrack = () => {
    document.getElementById('audio-upload-input').click();
  };

  const playPauseAll = () => {
    if (videoRef.current && multitrackRef.current) {
      const videoElement = videoRef.current;
      const multitrackInstance = multitrackRef.current;

      if (isPlaying) {
        videoElement.pause();
        multitrackInstance.pause();
      } else {
        videoElement.play();
        multitrackInstance.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const forward = () => {
    if (multitrackRef.current && videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const newTime = currentTime + 30;
      videoRef.current.currentTime = newTime;
      multitrackRef.current.setTime(newTime);
    }
  };

  const backward = () => {
    if (multitrackRef.current && videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const newTime = Math.max(currentTime - 30, 0);
      videoRef.current.currentTime = newTime;
      multitrackRef.current.setTime(newTime);
    }
  };

  const exportVideo = () => {
    if (videoRef.current && multitrackRef.current) {
      const videoElement = videoRef.current;
      const chunks = [];

      const recorder = new MediaRecorder(videoElement.captureStream());

      recorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'output.mp4';
        a.click();
        URL.revokeObjectURL(url);
      };

      recorder.start();
      setTimeout(() => recorder.stop(), 5000);
    }
  };
  return (
    <div className="container-fluid">
      {/* Video Section */}
      <div className="row"  >
      <div className="col-md-2 ">
      
      </div>
        <div className="col-md-10">
          {videoSrc ? (
            <video width="100%" controls ref={videoRef} src={videoSrc} />
          ) : (
            <div
              className={`drag-drop-zone ${isDragging ? 'dragging' : ''}`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragLeave={handleDragLeave}
            >
              <p>Drag and drop a video file here, or click to browse</p>
              <button
                onClick={() => document.getElementById('video-upload-input').click()}
              >
                Browse Files
              </button>
            </div>
          )}
          {/* Hidden video upload input */}
          <input
            type="file"
            accept="video/*"
            id="video-upload-input"
            onChange={handleVideoUpload}
            style={{ display: 'none' }}
          />
        </div>
      </div>
     {
        videoSrc && (
        <>
             
<div className="row">
    <div className="col-md-2">
    <div className="d-flex   mb-2 ">
                <i className="bi bi-arrow-counterclockwise backword px-1" ></i>
              
                <i className="bi bi-arrow-clockwise forword px-1"></i>
            </div>
    </div>
</div>



      {/* Controls and Waveforms */}
      <div className="row">
        {/* Controls Column */}
        <div className="col-md-2">
          <div className="d-flex flex-column">
            <div className="d-flex">
              <button onClick={toggleMute} className="sound">
                {isMuted ? (
                  <i className="bi bi-volume-mute-fill"></i>
                ) : (
                  <i className="bi bi-volume-up"></i>
                )}
              </button>
            </div>
          </div>
        </div>
  
        {/* Waveforms Column */}
        <div className="col-md-10">
          <div id="multitrack-container"></div>
          {/* Add Audio Button */}
          <button onClick={addAudioTrack} className="control-btn mt-2">
            Add Audio
          </button>
          {/* Hidden audio upload input */}
          <input
            type="file"
            accept="audio/*"
            id="audio-upload-input"
            onChange={(event) => handleAudioUpload(event, audios.length)}
            style={{ display: 'none' }}
          />
        </div>
      </div>
  
      {/* Playback Controls */}
      <div className="playback-controls mt-3">
        <button onClick={playPauseAll} className="control-btn">
          {isPlaying ? (
            <i className="bi bi-pause"></i>
          ) : (
            <i className="bi bi-caret-right-fill"></i>
          )}
        </button>
        {/* Export Video Button */}
        <button onClick={exportVideo} className="control-btn">
          Export Video
        </button>
      </div>
        </>
        )
     }
    </div>
  );
}  
export default VideoEditor;