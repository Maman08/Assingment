
// import React, { useState, useRef, useEffect } from 'react';
// import Multitrack from 'wavesurfer-multitrack';
// const VideoEditor = () => {
//   const [videoSrc, setVideoSrc] = useState(null);
//   const [audios, setAudios] = useState([]);
//   const multitrackRef = useRef(null);
//   const videoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const handleVideoUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setVideoSrc(URL.createObjectURL(file));
//     }
//   };
//   const handleAudioUpload = (event, index) => {
//     const file = event.target.files[0];
//     if (file) {
//       const audioUrl = URL.createObjectURL(file);
//       const newAudios = [...audios];
//       newAudios[index] = audioUrl;
//       setAudios(newAudios);
//     }
//   };
//   useEffect(() => {
//     if (audios.length > 0) {
//       // Destroy previous instances if they exist
//       if (multitrackRef.current) {
//         multitrackRef.current.destroy();
//       }
//       if (waveformRef.current) {
//         waveformRef.current.destroy();
//       }

//       // Initialize Multitrack
//       multitrackRef.current =new Multitrack.create(
//         audios.map((audioUrl, index) => ({
//           id: index,
//           url: audioUrl,
//           draggable: true,
//           startPosition: 0,
//           volume: 0.8,
//           options: {
//             waveColor: `hsl(${index * 60}, 87%, 49%)`,
//             progressColor: `hsl(${index * 60}, 87%, 20%)`,
//           },
//         })),
//         {
//           container: document.querySelector('#multitrack-container'),
//           minPxPerSec: 100,
//           rightButtonDrag: true,
//           cursorWidth: 2,
//           cursorColor: '#D72F21',
//           trackBackground: '#2D2D2D',
//           trackBorderColor: '#7C7C7C',
//           dragBounds: true,
//           envelopeOptions: {
//             lineColor: 'rgba(255, 0, 0, 0.7)',
//             lineWidth: 4,
//             dragPointSize: window.innerWidth < 600 ? 20 : 10,
//             dragPointFill: 'rgba(255, 255, 255, 0.8)',
//             dragPointStroke: 'rgba(255, 255, 255, 0.3)',
//           },
//         }
//       );

//       // Initialize WaveSurfer with Regions Plugin
//       waveformRef.current =new WaveSurfer.create({
//         container: '#waveform',
//         waveColor: 'rgb(200, 0, 200)',
//         progressColor: 'rgb(100, 0, 100)',
//         plugins: [
//           RegionsPlugin.create()
//         ],
//       });

//       waveformRef.current.on('ready', () => {
//         const regions = waveformRef.current.regions;
//         regions.addRegion({
//           start: 0,
//           end: 8,
//           content: 'Resize me',
//           color: randomColor(),
//           drag: false,
//           resize: true,
//         });
//         regions.addRegion({
//           start: 9,
//           end: 10,
//           content: 'Cramped region',
//           color: randomColor(),
//           minLength: 1,
//           maxLength: 10,
//         });
//         regions.addRegion({
//           start: 12,
//           end: 17,
//           content: 'Drag me',
//           color: randomColor(),
//           resize: false,
//         });
//         regions.addRegion({
//           start: 19,
//           content: 'Marker',
//           color: randomColor(),
//         });
//         regions.addRegion({
//           start: 20,
//           content: 'Second marker',
//           color: randomColor(),
//         });

//         // Store the regions instance
//         regionsRef.current = regions;
//       });

//       return () => {
//         if (multitrackRef.current) {
//           multitrackRef.current.destroy();
//         }
//         if (waveformRef.current) {
//           waveformRef.current.destroy();
//         }
//       };
//     }
//   }, [audios]);

//   // Utility function for random color generation
//   const randomColor = () => {
//     const random = (min, max) => Math.random() * (max - min) + min;
//     return `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`;
//   };

//   useEffect(() => {
//     const syncAudioWithVideo = () => {
//       if (videoRef.current && multitrackRef.current) {
//         const videoTime = videoRef.current.currentTime;
//         multitrackRef.current.setTime(videoTime);
//       }
//     };

//     if (videoRef.current) {
//       videoRef.current.addEventListener('timeupdate', syncAudioWithVideo);
//     }

//     return () => {
//       if (videoRef.current) {
//         videoRef.current.removeEventListener('timeupdate', syncAudioWithVideo);
//       }
//     };
//   }, [videoSrc]);

//   const addAudioTrack = () => {
//     document.getElementById('audio-upload-input').click();
//   };

//   const playPauseAll = () => {
//     if (videoRef.current && multitrackRef.current) {
//       const videoElement = videoRef.current;
//       const multitrackInstance = multitrackRef.current;

//       if (isPlaying) {
//         videoElement.pause();
//         multitrackInstance.pause();
//         setIsPlaying(false);
//       } else {
//         videoElement.play();
//         multitrackInstance.play();
//         setIsPlaying(true);
//       }
//     }
//   };

//   const forward = () => {
//     if (multitrackRef.current && videoRef.current) {
//       const currentTime = videoRef.current.currentTime;
//       const newTime = currentTime + 30;
//       videoRef.current.currentTime = newTime;
//       multitrackRef.current.setTime(newTime);
//     }
//   };

//   const backward = () => {
//     if (multitrackRef.current && videoRef.current) {
//       const currentTime = videoRef.current.currentTime;
//       const newTime = Math.max(currentTime - 30, 0);
//       videoRef.current.currentTime = newTime;
//       multitrackRef.current.setTime(newTime);
//     }
//   };

 

//   return (
//     <div>
//       <h1>Video and Audio Editor with Multitrack</h1>

//       {/* Add Video Button */}
//       <button onClick={() => document.getElementById('video-upload-input').click()}>
//         Add Video
//       </button>
//       <input
//         type="file"
//         accept="video/*"
//         id="video-upload-input"
//         onChange={handleVideoUpload}
//         style={{ display: 'none' }}
//       />

//       {/* Video and Audio Section */}
//       {videoSrc && (
//         <div style={{ width: '600px' }}>
//           <div>
//             <video width="100%" controls ref={videoRef} src={videoSrc} />
//           </div>

//           {/* Render Audio Uploads and Waveforms */}
//           <button onClick={addAudioTrack} style={{ marginTop: '20px' }}>
//             Add Audio
//           </button>
//           <input
//             type="file"
//             accept="audio/*"
//             id="audio-upload-input"
//             onChange={(event) => handleAudioUpload(event, audios.length)}
//             style={{ display: 'none' }}
//           />

// {audios.map((audio, index) => (
//   <div key={index} style={{ marginTop: '20px' }}>
//     <WaveSurfer
//       key={`wavesurfer-${index}`}
//       container={`waveform-${index}`}
//       // Configure WaveSurfer options (waveColor, progressColor, etc.)
//       url={audio}
//     />
//   </div>
// ))}

//           <div id="multitrack-container" style={{ marginTop: '20px' }}></div>

//           {/* Control Buttons */}
//           <button onClick={playPauseAll}>{isPlaying ? 'Pause All' : 'Play All'}</button>
//           <button onClick={forward}>Forward 30s</button>
//           <button onClick={backward}>Backward 30s</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoEditor;






import React, { useState, useRef, useEffect } from 'react';
import Multitrack from 'wavesurfer-multitrack';

const VideoEditor = () => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [audios, setAudios] = useState([]);
  const multitrackRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoSrc(URL.createObjectURL(file));
    }
  };

  const handleAudioUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const audioUrl = URL.createObjectURL(file);
      const newAudios = [...audios];
      newAudios[index] = audioUrl;
      setAudios(newAudios);
    }
  };

  useEffect(() => {
    if (audios.length > 0) {
      if (multitrackRef.current) {
        multitrackRef.current.destroy();
      }

      try {
        multitrackRef.current = Multitrack.create(
          audios.map((audioUrl, index) => ({
            id: index,
            url: audioUrl,
            draggable: true,
            startPosition: 0,
            volume: 0.8,
            options: {
              waveColor: `hsl(${index * 60}, 87%, 49%)`,
              progressColor: `hsl(${index * 60}, 87%, 20%)`,
            },
          })),
          {
            container: document.querySelector('#multitrack-container'),
            minPxPerSec: 100,
            cursorWidth: 2,
            cursorColor: '#D72F21',
            trackBackground: '#2D2D2D',
            trackBorderColor: '#7C7C7C',
            dragBounds: true,
            envelopeOptions: {
              lineColor: 'rgba(255, 0, 0, 0.7)',
              lineWidth: 4,
              dragPointSize: window.innerWidth < 600 ? 20 : 10,
              dragPointFill: 'rgba(255, 255, 255, 0.8)',
              dragPointStroke: 'rgba(255, 255, 255, 0.3)',
            },
          }
        );
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

  const splitAudio = (audioIndex, splitTime) => {
    if (multitrackRef.current && typeof multitrackRef.current.getTrack === 'function') {
      const track = multitrackRef.current.getTrack(audioIndex);
      if (track && typeof track.split === 'function') {
        track.split(splitTime);
      } else {
        console.error('Track not found or split method unavailable');
      }
    } else {
      console.error('Multitrack instance not initialized or getTrack method not available');
    }
  };

  const trimAudio = (audioIndex, startTime, endTime) => {
    if (multitrackRef.current && typeof multitrackRef.current.getTrack === 'function') {
      const track = multitrackRef.current.getTrack(audioIndex);
      if (track && typeof track.trim === 'function') {
        track.trim(startTime, endTime);
      } else {
        console.error('Track not found or trim method unavailable');
      }
    } else {
      console.error('Multitrack instance not initialized or getTrack method not available');
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
    <div>
      <h1>Video and Audio Editor with Multitrack</h1>

      <button onClick={() => document.getElementById('video-upload-input').click()}>
        Add Video
      </button>
      <input
        type="file"
        accept="video/*"
        id="video-upload-input"
        onChange={handleVideoUpload}
        style={{ display: 'none' }}
      />

      {videoSrc && (
        <div style={{ width: '600px' }}>
          <div>
            <video width="100%" controls ref={videoRef} src={videoSrc} />
          </div>

          <button onClick={addAudioTrack} style={{ marginTop: '20px' }}>
            Add Audio
          </button>
          <input
            type="file"
            accept="audio/*"
            id="audio-upload-input"
            onChange={(event) => handleAudioUpload(event, audios.length)}
            style={{ display: 'none' }}
          />

          {audios.map((audio, index) => (
            <div key={index} style={{ marginTop: '20px' }}>
              <button onClick={() => splitAudio(index, 5)}>Split Audio</button>
              <button onClick={() => trimAudio(index, 2, 10)}>Trim Audio</button>
            </div>
          ))}

          <div id="multitrack-container" style={{ marginTop: '20px' }}></div>

          <button onClick={playPauseAll}>{isPlaying ? 'Pause All' : 'Play All'}</button>
          <button onClick={forward}>Forward 30s</button>
          <button onClick={backward}>Backward 30s</button>
          <button onClick={exportVideo}>Export Video</button>
        </div>
      )}
    </div>
  );
};

export default VideoEditor;
