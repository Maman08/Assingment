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
//       if (multitrackRef.current) {
//         multitrackRef.current.destroy();
//       }

//       try {
//         multitrackRef.current = Multitrack.create(
//           audios.map((audioUrl, index) => ({
//             id: index,
//             url: audioUrl,
//             draggable: true,
//             startPosition: 0,
//             volume: 0.8,
//             options: {
//               waveColor: `hsl(${index * 60}, 87%, 49%)`,
//               progressColor: `hsl(${index * 60}, 87%, 20%)`,
//               barWidth: 2,
//   barGap: 1,
//   barRadius: 2,
//             },
//           })),
//           {
//             container: document.querySelector('#multitrack-container'),
//             minPxPerSec: 100,
//             rightButtonDrag: true,
//             cursorWidth: 2,
//             cursorColor: '#D72F21',
//             trackBackground: '#2D2D2D',
//             trackBorderColor: '#7C7C7C',
//             dragBounds: true,
//             envelopeOptions: {
//               lineColor: 'rgba(255, 0, 0, 0.7)',
//               lineWidth: 4,
//               dragPointSize: window.innerWidth < 600 ? 20 : 10,
//               dragPointFill: 'rgba(255, 255, 255, 0.8)',
//               dragPointStroke: 'rgba(255, 255, 255, 0.3)',
//             },
//           }
//         );

//       } catch (error) {
//         console.error('Error initializing Multitrack:', error);
//       }
//       return () => {
//         if (multitrackRef.current) {
//           multitrackRef.current.destroy();
//         }
        
//       };
//     }
//   }, [audios]);


//   useEffect(() => {
//     const syncAudioWithVideo = () => {
//       if (videoRef.current && multitrackRef.current) {
//         const videoTime = videoRef.current.currentTime;
//         multitrackRef.current.setTime(videoTime);
//       }
//     };

//     const videoElement = videoRef.current;
//     if (videoElement) {
//       videoElement.addEventListener('timeupdate', syncAudioWithVideo);
//     }

//     return () => {
//       if (videoElement) {
//         videoElement.removeEventListener('timeupdate', syncAudioWithVideo);
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
//       } else {
//         videoElement.play();
//         multitrackInstance.play();
//       }
//       setIsPlaying(!isPlaying);
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


  

//   const exportVideo = () => {
//     if (videoRef.current && multitrackRef.current) {
//       const videoElement = videoRef.current;
//       const chunks = [];

//       const recorder = new MediaRecorder(videoElement.captureStream());

//       recorder.ondataavailable = (event) => {
//         chunks.push(event.data);
//       };

//       recorder.onstop = () => {
//         const blob = new Blob(chunks, { type: 'video/mp4' });
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'output.mp4';
//         a.click();
//         URL.revokeObjectURL(url);
//       };

//       recorder.start();
//       setTimeout(() => recorder.stop(), 5000);
//     }
//   };

//   return (
//     <div>
//       <h1>Video and Audio Editor with Multitrack</h1>

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

//       {videoSrc && (
//         <div style={{ width: '600px' }}>
//           <div>
//             <video width="100%" controls ref={videoRef} src={videoSrc} />
//           </div>

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

         

//           <div id="multitrack-container" style={{ marginTop: '20px' }}></div>

//           <button onClick={playPauseAll}>{isPlaying ? 'Pause All' : 'Play All'}</button>
//           <button onClick={forward}>Forward 30s</button>
//           <button onClick={backward}>Backward 30s</button>
//           <button onClick={exportVideo}>Export Video</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoEditor;




// import React, { useState, useRef, useEffect } from 'react';
// import WaveSurfer from 'wavesurfer.js';
// import Multitrack from 'wavesurfer-multitrack';
// import RegionsPlugin from 'wavesurfer.js/src/plugin/regions';
// const VideoEditor = () => {
//   const [videoSrc, setVideoSrc] = useState(null);
//   const [audios, setAudios] = useState([]);
//   const waveSurferRef = useRef(null);
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
//       if (multitrackRef.current) {
//         multitrackRef.current.destroy();
//       }

//       try {
//         multitrackRef.current = Multitrack.create(
//           audios.map((audioUrl, index) => ({
//             id: index,
//             url: audioUrl,
//             draggable: true,
//             startPosition: 0,
//             volume: 0.8,
//             options: {
//               waveColor: `hsl(${index * 60}, 87%, 49%)`,
//               progressColor: `hsl(${index * 60}, 87%, 20%)`,
//             },
//           })),
//           {
//             container: document.querySelector('#multitrack-container'),
//             minPxPerSec: 100,
//             cursorWidth: 2,
//             cursorColor: '#D72F21',
//             trackBackground: '#2D2D2D',
//             trackBorderColor: '#7C7C7C',
//             dragBounds: true,
//             envelopeOptions: {
//               lineColor: 'rgba(255, 0, 0, 0.7)',
//               lineWidth: 4,
//               dragPointSize: window.innerWidth < 600 ? 20 : 10,
//               dragPointFill: 'rgba(255, 255, 255, 0.8)',
//               dragPointStroke: 'rgba(255, 255, 255, 0.3)',
//             },
//           }
//         );
//       } catch (error) {
//         console.error('Error initializing Multitrack:', error);
//       }

//       return () => {
//         if (multitrackRef.current) {
//           multitrackRef.current.destroy();
//         }
//       };
//     }
//   }, [audios]);

//   useEffect(() => {
//     if (audios.length > 0) {
//       if (waveSurferRef.current) {
//         waveSurferRef.current.destroy();
//       }

//       waveSurferRef.current = WaveSurfer.create({
//         container: '#waveform',
//         waveColor: 'violet',
//         progressColor: 'purple',
//         cursorColor: 'navy',
//         plugins: [
//           RegionsPlugin.create({
//             regionsMinLength: 2,
//             dragSelection: true,
//             color: 'rgba(0, 0, 255, 0.1)',
//           }),
//         ],
//       });

//       waveSurferRef.current.load(audios[0]);

//       // Double-click to add a region (split)
//       waveSurferRef.current.on('dblclick', (e) => {
//         const clickPosition = waveSurferRef.current.drawer.handleEvent(e);
//         const regionDuration = 5; // Example duration for split region
//         waveSurferRef.current.addRegion({
//           start: clickPosition,
//           end: clickPosition + regionDuration,
//           color: 'hsla(400, 100%, 30%, 0.4)',
//         });
//       });
      
//       return () => {
//         if (waveSurferRef.current) {
//           waveSurferRef.current.destroy();
//         }
//       };
//     }
//   }, [audios]);

//   useEffect(() => {
//     const syncAudioWithVideo = () => {
//       if (videoRef.current && waveSurferRef.current) {
//         const videoTime = videoRef.current.currentTime;
//         waveSurferRef.current.setCurrentTime(videoTime);
//       }
//     };

//     const videoElement = videoRef.current;
//     if (videoElement) {
//       videoElement.addEventListener('timeupdate', syncAudioWithVideo);
//     }

//     return () => {
//       if (videoElement) {
//         videoElement.removeEventListener('timeupdate', syncAudioWithVideo);
//       }
//     };
//   }, [videoSrc]);

//   const addAudioTrack = () => {
//     document.getElementById('audio-upload-input').click();
//   };

//   const playPauseAll = () => {
//     if (videoRef.current && waveSurferRef.current) {
//       const videoElement = videoRef.current;
//       const waveSurferInstance = waveSurferRef.current;

//       if (isPlaying) {
//         videoElement.pause();
//         waveSurferInstance.pause();
//       } else {
//         videoElement.play();
//         waveSurferInstance.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const forward = () => {
//     if (waveSurferRef.current && videoRef.current) {
//       const currentTime = videoRef.current.currentTime;
//       const newTime = currentTime + 30;
//       videoRef.current.currentTime = newTime;
//       waveSurferRef.current.setCurrentTime(newTime);
//     }
//   };

//   const backward = () => {
//     if (waveSurferRef.current && videoRef.current) {
//       const currentTime = videoRef.current.currentTime;
//       const newTime = Math.max(currentTime - 30, 0);
//       videoRef.current.currentTime = newTime;
//       waveSurferRef.current.setCurrentTime(newTime);
//     }
//   };

//   return (
//     <div>
//       <h1>Video and Audio Editor with WaveSurfer Regions</h1>

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

//       {videoSrc && (
//         <div style={{ width: '600px' }}>
//           <div>
//             <video width="100%" controls ref={videoRef} src={videoSrc} />
//           </div>

//           <button onClick={addAudioTrack} style={{ marginTop: '20px' }}>
//             Add Audio Track
//           </button>
//           <input
//             type="file"
//             accept="audio/*"
//             id="audio-upload-input"
//             onChange={(e) => handleAudioUpload(e, audios.length)}
//             style={{ display: 'none' }}
//           />

//           <button onClick={playPauseAll} style={{ marginTop: '20px' }}>
//             {isPlaying ? 'Pause All' : 'Play All'}
//           </button>
//           <button onClick={forward} style={{ marginLeft: '10px' }}>
//             Forward 30s
//           </button>
//           <button onClick={backward} style={{ marginLeft: '10px' }}>
//             Backward 30s
//           </button>

//           <div id="waveform" style={{ marginTop: '20px' }}></div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoEditor;



// import React, { useState, useRef, useEffect } from 'react';
// import WaveSurfer from 'wavesurfer.js';
// import Multitrack from 'wavesurfer-multitrack';
// import RegionsPlugin from 'wavesurfer.js/src/plugin/regions';

// const VideoEditor = () => {
//   const [videoSrc, setVideoSrc] = useState(null);
//   const [audios, setAudios] = useState([]);
//   const waveSurferRef = useRef(null);
//   const multitrackRef = useRef(null);
//   const videoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   // Handle video upload
//   const handleVideoUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setVideoSrc(URL.createObjectURL(file));
//     }
//   };

//   // Handle audio upload
//   const handleAudioUpload = (event, index) => {
//     const file = event.target.files[0];
//     if (file) {
//       const audioUrl = URL.createObjectURL(file);
//       const newAudios = [...audios];
//       newAudios[index] = audioUrl;
//       setAudios(newAudios);
//     }
//   };

//   // Initialize WaveSurfer and Multitrack
//   useEffect(() => {
//     if (audios.length > 0) {
//       // Destroy existing instances to prevent duplication
//       if (waveSurferRef.current) {
//         waveSurferRef.current.destroy();
//       }
//       if (multitrackRef.current) {
//         multitrackRef.current.destroy();
//       }

//       // Initialize Multitrack
//       multitrackRef.current = Multitrack.create(
//         audios.map((audioUrl, index) => ({
//           id: index,
//           url: audioUrl,
//           barWidth: 2,
//           // Optionally, specify the spacing between bars
//           barGap: 1,
//           // And the bar radius
//           barRadius: 2,
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
//           cursorWidth: 2,
//           cursorColor: '#D72F21',
//           trackBackground: '#2D2D2D',
//           trackBorderColor: '#7C7C7C',
//           dragBounds: true,
//         }
//       );

//     }
//   }, [audios]);

//   // Sync audio and video
//   useEffect(() => {
//     const syncAudioWithVideo = () => {
//       if (videoRef.current && waveSurferRef.current) {
//         const videoTime = videoRef.current.currentTime;
//         waveSurferRef.current.setCurrentTime(videoTime);
//       }
//     };

//     const videoElement = videoRef.current;
//     if (videoElement) {
//       videoElement.addEventListener('timeupdate', syncAudioWithVideo);
//     }

//     return () => {
//       if (videoElement) {
//         videoElement.removeEventListener('timeupdate', syncAudioWithVideo);
//       }
//     };
//   }, [videoSrc]);

//   // Add audio track
//   const addAudioTrack = () => {
//     document.getElementById('audio-upload-input').click();
//   };

//   // Play or pause both video and audio
//   const playPauseAll = () => {
//     if (videoRef.current && waveSurferRef.current) {
//       const videoElement = videoRef.current;
//       const waveSurferInstance = waveSurferRef.current;

//       if (isPlaying) {
//         videoElement.pause();
//         waveSurferInstance.pause();
//       } else {
//         videoElement.play();
//         waveSurferInstance.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   // Forward the video and audio by 30 seconds
//   const forward = () => {
//     if (waveSurferRef.current && videoRef.current) {
//       const currentTime = videoRef.current.currentTime;
//       const newTime = currentTime + 30;
//       videoRef.current.currentTime = newTime;
//       waveSurferRef.current.setCurrentTime(newTime);
//     }
//   };

//   // Backward the video and audio by 30 seconds
//   const backward = () => {
//     if (waveSurferRef.current && videoRef.current) {
//       const currentTime = videoRef.current.currentTime;
//       const newTime = Math.max(currentTime - 30, 0);
//       videoRef.current.currentTime = newTime;
//       waveSurferRef.current.setCurrentTime(newTime);
//     }
//   };

//   return (
//     <div>
//       <h1>Video and Audio Editor with WaveSurfer Regions</h1>

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

//       {videoSrc && (
//         <div style={{ width: '600px' }}>
//           <div>
//             <video width="100%" controls ref={videoRef} src={videoSrc}></video>
//           </div>
//           <div id="waveform"></div> {/* WaveSurfer waveform visualization */}
//           <div id="multitrack-container"></div> {/* Multitrack visualization */}
//         </div>
//       )}

//       <div>
//         <button onClick={addAudioTrack}>Add Audio Track</button>
//         <input
//           type="file"
//           accept="audio/*"
//           id="audio-upload-input"
//           style={{ display: 'none' }}
//           onChange={(e) => handleAudioUpload(e, audios.length)}
//         />
//       </div>

//       {audios.length > 0 && (
//         <div>
//           <h3>Uploaded Audios:</h3>
//           <ul>
//             {audios.map((audio, index) => (
//               <li key={index}>Track {index + 1}: {audio}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <div>
//         <button onClick={playPauseAll}>{isPlaying ? 'Pause' : 'Play'}</button>
//         <button onClick={forward}>Forward 30s</button>
//         <button onClick={backward}>Backward 30s</button>
//       </div>
//     </div>
//   );
// };

// export default VideoEditor;









// import React, { useState, useRef, useEffect } from 'react';
// import WaveSurfer from 'wavesurfer.js';
// import Multitrack from 'wavesurfer-multitrack';
// import RegionsPlugin from 'wavesurfer.js/src/plugin/regions';

// const VideoEditor = () => {
//   const [videoSrc, setVideoSrc] = useState(null);
//   const [audios, setAudios] = useState([]);
//   const waveSurferRef = useRef(null);
//   const multitrackRef = useRef(null);
//   const videoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   // Handle video upload
//   const handleVideoUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setVideoSrc(URL.createObjectURL(file));
//     }
//   };

//   // Handle audio upload
//   const handleAudioUpload = (event, index) => {
//     const file = event.target.files[0];
//     if (file) {
//       const audioUrl = URL.createObjectURL(file);
//       const newAudios = [...audios];
//       newAudios[index] = audioUrl;
//       setAudios(newAudios);
//     }
//   };
// // Initialize WaveSurfer and Multitrack
// useEffect(() => {
//     if (audios.length > 0) {
//       // Destroy existing instances to prevent duplication
//       if (waveSurferRef.current) {
//         waveSurferRef.current.destroy();
//       }
//       if (multitrackRef.current) {
//         multitrackRef.current.destroy();
//       }
  
//       // Initialize Multitrack
//       multitrackRef.current = Multitrack.create(
//         audios.map((audioUrl, index) => ({
//           id: index,
//           url: audioUrl,
//           barWidth: 2,
//           barGap: 1,
//           barRadius: 2,
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
//           cursorWidth: 2,
//           cursorColor: '#D72F21',
//           trackBackground: '#2D2D2D',
//           trackBorderColor: '#7C7C7C',
//           dragBounds: true,
//         },
      
//   console.log('multitrackref',multitrackRef)
//       // Initialize Regions Plugin
//       multitrackRef.current.on('ready', () => {
//         console.log("Multitrack is ready");
//         audios.forEach((_, index) => {
//           const track = multitrackRef.current.getTrack(index);
//           if (track) {
//             console.log('Track', index, 'loaded');
//             track.addRegion({
//               start: 5, // Start position in seconds
//               end: 10,   // End position in seconds
//               color: `rgba(${index * 60}, 87%, 49%, 0.3)`,
//               resize: true,
//               drag: true,
//             });
//             track.addRegion({
//               start: 12,
//               end: 17,
//               content: 'Drag me',
//               color: randomColor(),
//               resize: false,
//             });
//             track.addRegion({
//               start: 0,
//               end: 8,
//               content: 'Resize me',
//               color: randomColor(),
//               drag: false,
//               resize: true,
//             });
//           } else {
//             console.log('Track', index, 'not found');
//           }
//         });
//       });
//     );
//     }
//   }, [audios]);
  
//   // Helper function for random color
//   const randomColor = () => {
//     const random = (min, max) => Math.random() * (max - min) + min;
//     return `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`;
//   };
  

//   // Sync audio and video
//   useEffect(() => {
//     const syncAudioWithVideo = () => {
//       if (videoRef.current && multitrackRef.current) {
//         const videoTime = videoRef.current.currentTime;
//         multitrackRef.current.seekTo(videoTime);
//       }
//     };

//     const videoElement = videoRef.current;
//     if (videoElement) {
//       videoElement.addEventListener('timeupdate', syncAudioWithVideo);
//     }

//     return () => {
//       if (videoElement) {
//         videoElement.removeEventListener('timeupdate', syncAudioWithVideo);
//       }
//     };
//   }, [videoSrc]);

//   // Add audio track
//   const addAudioTrack = () => {
//     document.getElementById('audio-upload-input').click();
//   };

//   // Play or pause both video and audio
//   const playPauseAll = () => {
//     if (videoRef.current && multitrackRef.current) {
//       const videoElement = videoRef.current;
//       const multitrackInstance = multitrackRef.current;

//       if (isPlaying) {
//         videoElement.pause();
//         multitrackInstance.pause();
//       } else {
//         videoElement.play();
//         multitrackInstance.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   // Forward the video and audio by 30 seconds
//   const forward = () => {
//     if (multitrackRef.current && videoRef.current) {
//       const currentTime = videoRef.current.currentTime;
//       const newTime = currentTime + 30;
//       videoRef.current.currentTime = newTime;
//       multitrackRef.current.seekTo(newTime);
//     }
//   };

//   // Backward the video and audio by 30 seconds
//   const backward = () => {
//     if (multitrackRef.current && videoRef.current) {
//       const currentTime = videoRef.current.currentTime;
//       const newTime = Math.max(currentTime - 30, 0);
//       videoRef.current.currentTime = newTime;
//       multitrackRef.current.seekTo(newTime);
//     }
//   };

//   return (
//     <div>
//       <h1>Video and Audio Editor with WaveSurfer Regions</h1>

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

//       {videoSrc && (
//         <div style={{ width: '600px' }}>
//           <div>
//             <video width="100%" controls ref={videoRef} src={videoSrc}></video>
//           </div>
//           <div id="waveform"></div> {/* WaveSurfer waveform visualization */}
//           <div id="multitrack-container"></div> {/* Multitrack visualization */}
//         </div>
//       )}

//       <div>
//         <button onClick={addAudioTrack}>Add Audio Track</button>
//         <input
//           type="file"
//           accept="audio/*"
//           id="audio-upload-input"
//           style={{ display: 'none' }}
//           onChange={(e) => handleAudioUpload(e, audios.length)}
//         />
//       </div>

//       {audios.length > 0 && (
//         <div>
//           <h3>Uploaded Audios:</h3>
//           <ul>
//             {audios.map((audio, index) => (
//               <li key={index}>Track {index + 1}: {audio}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <div>
//         <button onClick={playPauseAll}>{isPlaying ? 'Pause' : 'Play'}</button>
//         <button onClick={forward}>Forward 30s</button>
//         <button onClick={backward}>Backward 30s</button>
//       </div>
//     </div>
//   );
// };

// export default VideoEditor;








// import React, { useState, useRef, useEffect } from 'react';
// import WaveSurfer from 'wavesurfer.js';
// import Multitrack from 'wavesurfer-multitrack';
// import RegionsPlugin from 'wavesurfer.js/src/plugin/regions';

// const VideoEditor = () => {
//   const [videoSrc, setVideoSrc] = useState(null);
//   const [audios, setAudios] = useState([]);
//   const multitrackRef = useRef(null);
//   const videoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   // Handle video upload
//   const handleVideoUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setVideoSrc(URL.createObjectURL(file));
//     }
//   };

//   // Handle audio upload
//   const handleAudioUpload = (event, index) => {
//     const file = event.target.files[0];
//     if (file) {
//       const audioUrl = URL.createObjectURL(file);
//       const newAudios = [...audios];
//       newAudios[index] = audioUrl;
//       setAudios(newAudios);
//     }
//   };

//   // Initialize WaveSurfer and Multitrack
//   useEffect(() => {
//     if (audios.length > 0) {
//       // Destroy existing instances to prevent duplication
//       if (multitrackRef.current) {
//         multitrackRef.current.destroy();
//       }
  
//       // Initialize Multitrack with Regions Plugin for each track
//       const tracksConfig = audios.map((audioUrl, index) => ({
//         id: index,
//         url: audioUrl,
//         barWidth: 2,
//         barGap: 1,
//         barRadius: 2,
//         draggable: true,
//         startPosition: 0,
//         volume: 0.8,
//         options: {
//           waveColor: `hsl(${index * 60}, 87%, 49%)`,
//           progressColor: `hsl(${index * 60}, 87%, 20%)`,
//         },
//       }));

//       multitrackRef.current = Multitrack.create(tracksConfig, {
//         container: document.querySelector('#multitrack-container'),
//         minPxPerSec: 100,
//         cursorWidth: 2,
//         cursorColor: '#D72F21',
//         trackBackground: '#2D2D2D',
//         trackBorderColor: '#7C7C7C',
//         dragBounds: true,
//       });
// console.log("multitask.current ",multitrackRef.current)
//       // Initialize Regions Plugin for each track
//       multitrackRef.current.on('ready', () => {
//         console.log("Multitrack is ready");
//         audios.forEach((_, index) => {
//           const track = multitrackRef.current.getTrack(index);
//           if (track) {
//             // Initialize Regions Plugin for the track
//             const regionsPlugin = RegionsPlugin.create();
//             track.addPlugin(regionsPlugin);

//             track.on('ready', () => {
//               console.log('Track', index, 'loaded');
//               track.addRegion({
//                 start: 5, // Start position in seconds
//                 end: 10,   // End position in seconds
//                 color: `rgba(${index * 60}, 87%, 49%, 0.3)`,
//                 resize: true,
//                 drag: true,
//               });
//               track.addRegion({
//                 start: 12,
//                 end: 17,
//                 content: 'Drag me',
//                 color: randomColor(),
//                 resize: false,
//               });
//               track.addRegion({
//                 start: 0,
//                 end: 8,
//                 content: 'Resize me',
//                 color: randomColor(),
//                 drag: false,
//                 resize: true,
//               });
//             });
//           } else {
//             console.log('Track', index, 'not found');
//           }
//         });
//       });
//     }
//   }, [audios]);

//   // Helper function for random color
//   const randomColor = () => {
//     const random = (min, max) => Math.random() * (max - min) + min;
//     return `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`;
//   };

//   // Sync audio and video
//   useEffect(() => {
//     const syncAudioWithVideo = () => {
//       if (videoRef.current && multitrackRef.current) {
//         const videoTime = videoRef.current.currentTime;
//         multitrackRef.current.seekTo(videoTime);
//       }
//     };

//     const videoElement = videoRef.current;
//     if (videoElement) {
//       videoElement.addEventListener('timeupdate', syncAudioWithVideo);
//     }

//     return () => {
//       if (videoElement) {
//         videoElement.removeEventListener('timeupdate', syncAudioWithVideo);
//       }
//     };
//   }, [videoSrc]);

//   // Add audio track
//   const addAudioTrack = () => {
//     document.getElementById('audio-upload-input').click();
//   };

//   // Play or pause both video and audio
//   const playPauseAll = () => {
//     if (videoRef.current && multitrackRef.current) {
//       const videoElement = videoRef.current;
//       const multitrackInstance = multitrackRef.current;

//       if (isPlaying) {
//         videoElement.pause();
//         multitrackInstance.pause();
//       } else {
//         videoElement.play();
//         multitrackInstance.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   // Forward the video and audio by 30 seconds
//   const forward = () => {
//     if (multitrackRef.current && videoRef.current) {
//       const currentTime = videoRef.current.currentTime;
//       const newTime = currentTime + 30;
//       videoRef.current.currentTime = newTime;
//       multitrackRef.current.seekTo(newTime);
//     }
//   };

//   // Backward the video and audio by 30 seconds
//   const backward = () => {
//     if (multitrackRef.current && videoRef.current) {
//       const currentTime = videoRef.current.currentTime;
//       const newTime = Math.max(currentTime - 30, 0);
//       videoRef.current.currentTime = newTime;
//       multitrackRef.current.seekTo(newTime);
//     }
//   };

//   return (
//     <div>
//       <h1>Video and Audio Editor with WaveSurfer Regions</h1>

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

//       {videoSrc && (
//         <div style={{ width: '600px' }}>
//           <div>
//             <video width="100%" controls ref={videoRef} src={videoSrc}></video>
//           </div>
//           <div id="waveform"></div> {/* WaveSurfer waveform visualization */}
//           <div id="multitrack-container"></div> {/* Multitrack visualization */}
//         </div>
//       )}

//       <div>
//         <button onClick={addAudioTrack}>Add Audio Track</button>
//         <input
//           type="file"
//           accept="audio/*"
//           id="audio-upload-input"
//           style={{ display: 'none' }}
//           onChange={(e) => handleAudioUpload(e, audios.length)}
//         />
//       </div>

//       {audios.length > 0 && (
//         <div>
//           <h3>Uploaded Audios:</h3>
//           <ul>
//             {audios.map((audio, index) => (
//               <li key={index}>Track {index + 1}: {audio}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <div>
//         <button onClick={playPauseAll}>{isPlaying ? 'Pause' : 'Play'}</button>
//         <button onClick={forward}>Forward 30s</button>
//         <button onClick={backward}>Backward 30s</button>
//       </div>
//     </div>
//   );
// };

// export default VideoEditor;




// import React, { useState, useRef, useEffect } from 'react';
// import WaveSurfer from 'wavesurfer.js';
// import Multitrack from 'wavesurfer-multitrack';
// import RegionsPlugin from 'wavesurfer.js/src/plugin/regions';

// const VideoEditor = () => {
//   const [videoSrc, setVideoSrc] = useState(null);
//   const [audios, setAudios] = useState([]);
//   const multitrackRef = useRef(null);
//   const videoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   // Handle video upload
//   const handleVideoUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setVideoSrc(URL.createObjectURL(file));
//     }
//   };

//   // Handle audio upload
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
//       // Clean up previous instance if necessary
//       if (multitrackRef.current) {
//         multitrackRef.current.destroy();
//       }
  
//       // Initialize Multitrack
//       const tracksConfig = audios.map((audioUrl, index) => ({
//         id: index,
//         url: audioUrl,
//         barWidth: 2,
//         barGap: 1,
//         barRadius: 2,
//         draggable: true,
//         startPosition: 0,
//         volume: 0.8,
//         options: {
//           waveColor: `hsl(${index * 60}, 87%, 49%)`,
//           progressColor: `hsl(${index * 60}, 87%, 20%)`,
//         },
//       }));
  
//       try {
//         const multitrack = Multitrack.create(tracksConfig, {
//           container: document.querySelector('#multitrack-container'),
//           minPxPerSec: 100,
//           cursorWidth: 2,
//           cursorColor: '#D72F21',
//           trackBackground: '#2D2D2D',
//           trackBorderColor: '#7C7C7C',
//           dragBounds: true,
//         });
  
//         console.log('Multitrack instance:', multitrack);
  
//         // Check if there's a global 'ready' event for the Multitrack instance
//         multitrack.on('ready', () => {
//           console.log('Multitrack is ready');
  
//           // Add regions to each track
//           audios.forEach((_, index) => {
//             multitrack.addRegion({
//               id: `region-${index}-start`,
//               trackId: index,
//               start: 5 + index * 10,
//               end: 15 + index * 10,
//               color: `rgba(${index * 50}, ${index * 50}, 255, 0.5)`,
//               label: `Region ${index}-Start`,
//             });
  
//             multitrack.addRegion({
//               id: `region-${index}-end`,
//               trackId: index,
//               start: 25 + index * 10,
//               end: 35 + index * 10,
//               color: `rgba(${index * 50}, ${index * 50}, 255, 0.5)`,
//               label: `Region ${index}-End`,
//             });
//           });
  
//           console.log('Regions added to each track');
//         });
  
//         multitrackRef.current = multitrack;
//       } catch (error) {
//         console.error('Error initializing Multitrack:', error);
//       }
//     }
//   }, [audios]);
  
  
  

//   // Helper function for random color
//   const randomColor = () => {
//     const random = (min, max) => Math.random() * (max - min) + min;
//     return `rgba(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}, 0.5)`;
//   };

//   // Sync audio and video
//   useEffect(() => {
//     const syncAudioWithVideo = () => {
//       if (videoRef.current && multitrackRef.current) {
//         const videoTime = videoRef.current.currentTime;
//         multitrackRef.current.seekTo(videoTime);
//       }
//     };

//     const videoElement = videoRef.current;
//     if (videoElement) {
//       videoElement.addEventListener('timeupdate', syncAudioWithVideo);
//     }

//     return () => {
//       if (videoElement) {
//         videoElement.removeEventListener('timeupdate', syncAudioWithVideo);
//       }
//     };
//   }, [videoSrc]);

//   // Add audio track
//   const addAudioTrack = () => {
//     document.getElementById('audio-upload-input').click();
//   };

//   // Play or pause both video and audio
//   const playPauseAll = () => {
//     if (videoRef.current && multitrackRef.current) {
//       const videoElement = videoRef.current;
//       const multitrackInstance = multitrackRef.current;

//       if (isPlaying) {
//         videoElement.pause();
//         multitrackInstance.pause();
//       } else {
//         videoElement.play();
//         multitrackInstance.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   // Forward the video and audio by 30 seconds
//   const forward = () => {
//     if (multitrackRef.current && videoRef.current) {
//       const currentTime = videoRef.current.currentTime;
//       const newTime = currentTime + 30;
//       videoRef.current.currentTime = newTime;
//       multitrackRef.current.seekTo(newTime);
//     }
//   };

//   // Backward the video and audio by 30 seconds
//   const backward = () => {
//     if (multitrackRef.current && videoRef.current) {
//       const currentTime = videoRef.current.currentTime;
//       const newTime = Math.max(currentTime - 30, 0);
//       videoRef.current.currentTime = newTime;
//       multitrackRef.current.seekTo(newTime);
//     }
//   };

//   return (
//     <div>
//       <h1>Video and Audio Editor with WaveSurfer Regions</h1>

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

//       {videoSrc && (
//         <div style={{ width: '600px' }}>
//           <div>
//             <video width="100%" controls ref={videoRef} src={videoSrc}></video>
//           </div>
//           <div id="waveform"></div> {/* WaveSurfer waveform visualization */}
//           <div id="multitrack-container"></div> {/* Multitrack visualization */}
//         </div>
//       )}

//       <div>
//         <button onClick={addAudioTrack}>Add Audio Track</button>
//         <input
//           type="file"
//           accept="audio/*"
//           id="audio-upload-input"
//           style={{ display: 'none' }}
//           onChange={(e) => handleAudioUpload(e, audios.length)}
//         />
//       </div>

//       {audios.length > 0 && (
//         <div>
//           <h3>Uploaded Audios:</h3>
//           <ul>
//             {audios.map((audio, index) => (
//               <li key={index}>Track {index + 1}: {audio}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <div>
//         <button onClick={playPauseAll}>{isPlaying ? 'Pause' : 'Play'}</button>
//         <button onClick={forward}>Forward 30s</button>
//         <button onClick={backward}>Backward 30s</button>
//       </div>
//     </div>
//   );
// };

// export default VideoEditor;

