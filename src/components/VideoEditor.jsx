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
  const [videoProgress, setVideoProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
const [totalDuration, setTotalDuration] = useState(0);

const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
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
      const videoDuration = videoRef.current.duration; // Get video duration

      const audioElement = new Audio(audioUrl);
      audioElement.onloadedmetadata = () => {
        const audioDuration = audioElement.duration;

        // Limit the audio track duration to the length of the video
        const trackDuration = Math.min(audioDuration, videoDuration);

        setAudios((prevAudios) => [
          ...prevAudios,
          { url: audioUrl, duration: trackDuration },
        ]);
      };
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
        const waveforms = audios.map((audio, index) => {
          const colorIndex = index % colors.length;
          const { waveColor, bgColor } = colors[colorIndex];

          return {
            id: index,
            url: audio.url,
            draggable: true,
            startPosition: 0,
            endPosition: audio.duration, // Ensure track ends at the right time
            volume: 0.8,
            options: {
              waveColor: waveColor,
              progressColor: waveColor,
              trackBackground: bgColor,
              barWidth: 1.5,
              barGap: 1,
              barRadius: 1,
              barHeight: 0,
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
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  

  useEffect(() => {
    const syncAudioWithVideo = () => {
      if (videoRef.current && multitrackRef.current) {
        const videoTime = videoRef.current.currentTime;
        setCurrentTime(videoTime);
        setTotalDuration(videoRef.current.duration);
        multitrackRef.current.setTime(videoTime);
        setVideoProgress((videoTime / videoRef.current.duration) * 100);
      }
    };
    const handleVideoEnded = () => {
        if (multitrackRef.current) {
          multitrackRef.current.pause(); 
        }
        setIsPlaying(false); 
      };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('timeupdate', syncAudioWithVideo);
      videoElement.addEventListener('ended', handleVideoEnded); 
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('timeupdate', syncAudioWithVideo);
        videoElement.removeEventListener('ended', handleVideoEnded);
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
      const newTime = currentTime + 5;
      videoRef.current.currentTime = newTime;
      multitrackRef.current.setTime(newTime);
    }
  };

  const backward = () => {
    if (multitrackRef.current && videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const newTime = Math.max(currentTime - 5, 0);
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
  const handleSeek = (event) => {
    const newTime = (event.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    multitrackRef.current.setTime(newTime);
    document.documentElement.style.setProperty('--progress-value', `${event.target.value}%`);

  };
  return (
    <div className="container-fluid">
      {/* Video Section */}
      <div className="row mt-3"  >
      <div className="col-md-2 ">
      
      </div>
        <div className="col-md-8">
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
                <button className='forwardbackword' onClick={backward}><i className="bi bi-arrow-counterclockwise backword px-1" ></i></button>
              
                <button className='forwardbackword' onClick={forward}><i className="bi bi-arrow-clockwise forword px-1"></i></button>
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
                    <i className="bi bi-volume-up"></i>
                ) : (
                  <i className="bi bi-volume-mute-fill"></i>
                )}
              </button>
            </div>
          </div>
        </div>
  
        {/* Waveforms Column */}
        <div className="col-md-8">
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
  
      <div className="row mt-3 text-white">
  <div className="col-md-2 mt-3 justify-content-center"></div>
  <div className="col-md-8 justify-content-center">
    <div className="progress-and-controls">
    <span>{formatTime(currentTime)}</span>  
      <input
        type="range"
        min="0"
        max="100"
        value={videoProgress}
        onChange={handleSeek}
        className="progress-bar"
        style={{ width: '100%' }}
      />
      <span>{formatTime(totalDuration)}</span>
      <button onClick={playPauseAll} className="play-pause-btn">
        {isPlaying ? (
          <i className="bi bi-pause"></i>
        ) : (
          <i className="bi bi-caret-right-fill"></i>
        )}
      </button>
      <div className="time-display">
        
        
      </div>
    </div>
  </div>
</div>

        </>
        )
     }
    </div>
  );
}  
export default VideoEditor;