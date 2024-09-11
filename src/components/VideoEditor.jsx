// import React, { useState, useRef, useEffect } from 'react';
// import Multitrack from 'wavesurfer-multitrack';
// import './VideoEditor.css'; // Import custom styles

// const VideoEditor = () => {
//     const colors = [
//         { waveColor: '#746a58', bgColor: '#1a1a1a' }, // Color 1
//         { waveColor: '#614468', bgColor: '#160435' }, // Color 2
//         { waveColor: '#8c4f3e', bgColor: '#340303' }, // Color 3
//       ];
//   const [videoSrc, setVideoSrc] = useState(null);
//   const [audios, setAudios] = useState([]);
//   const multitrackRef = useRef(null);
//   const videoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);

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

//   const handleDragOver = (event) => {
//     event.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     setIsDragging(false);
//     const file = event.dataTransfer.files[0];
//     if (file) {
//       setVideoSrc(URL.createObjectURL(file));
//     }
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   useEffect(() => {
//     if (audios.length > 0) {
//       if (multitrackRef.current) {
//         multitrackRef.current.destroy();
//       }

//       try {
//         const waveforms = audios.map((audioUrl, index) => {
//           const colorIndex = index % colors.length;
//           const { waveColor, bgColor } = colors[colorIndex];
//           return {
//             id: index,
//             url: audioUrl,
//             draggable: true,
//             startPosition: 0,
//             volume: 0.8,
//             options: {
//               waveColor: waveColor,
//               progressColor: waveColor, // Use the same color for progress
//               trackBackground: bgColor,
//               barWidth: 2, // Set bar width
//               barGap: 3,   // Set spacing between bars
//               barRadius: 2 // Set bar radius
//             },
//           };
//         });

//         multitrackRef.current = Multitrack.create(
//           waveforms,
//           {
//             container: document.querySelector('#multitrack-container'),
//             minPxPerSec: 100,
//             cursorWidth: 2,
//             cursorColor: '#D72F21',
//             trackBackground: '#1F1F1F', // Dark background
//             trackBorderColor: '#3C3C3C', // Slightly lighter border
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
//     <div className="video-editor">
//       <h1>Video and Audio Editor with Multitrack</h1>

//       <div
//         className={`drag-drop-zone ${isDragging ? 'dragging' : ''}`}
//         onDragOver={handleDragOver}
//         onDrop={handleDrop}
//         onDragLeave={handleDragLeave}
//       >
//         <input
//           type="file"
//           accept="video/*"
//           id="video-upload-input"
//           onChange={handleVideoUpload}
//           style={{ display: 'none' }}
//         />
//         {videoSrc ? (
//           <video width="100%" controls ref={videoRef} src={videoSrc} />
//         ) : (
//           <div>
//             <p>Drag and drop a video file here, or click to browse</p>
//             <button onClick={() => document.getElementById('video-upload-input').click()}>
//               Browse Files
//             </button>
//           </div>
//         )}
//       </div>

//       {videoSrc && (
//         <div className="controls">
//           <button onClick={addAudioTrack} className="control-btn">
//             Add Audio
//           </button>
//           <input
//             type="file"
//             accept="audio/*"
//             id="audio-upload-input"
//             onChange={(event) => handleAudioUpload(event, audios.length)}
//             style={{ display: 'none' }}
//           />

         
//           <div id="multitrack-container"></div>

//           <div className="playback-controls">
//             <button onClick={playPauseAll} className="control-btn">
//               {isPlaying ? 'Pause All' : 'Play All'}
//             </button>
//             <button onClick={forward} className="control-btn">
//               Forward 30s
//             </button>
//             <button onClick={backward} className="control-btn">
//               Backward 30s
//             </button>
//             <button onClick={exportVideo} className="control-btn">
//               Export Video
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoEditor;












// import React, { useState, useRef, useEffect } from 'react';
// import Multitrack from 'wavesurfer-multitrack';
// import './VideoEditor.css'; // Import custom styles

// const VideoEditor = () => {
//   const colors = [
//     { waveColor: '#746a58', bgColor: '#1a1a1a' }, // Color 1
//     { waveColor: '#614468', bgColor: '#160435' }, // Color 2
//     { waveColor: '#8c4f3e', bgColor: '#340303' }, // Color 3
//   ];

//   const [videoSrc, setVideoSrc] = useState(null);
//   const [audios, setAudios] = useState([]);
//   const multitrackRef = useRef(null);
//   const videoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);

//   const handleVideoUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setVideoSrc(URL.createObjectURL(file));
//     }
//   };

//   const handleAudioUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const audioUrl = URL.createObjectURL(file);
//       setAudios((prevAudios) => [...prevAudios, audioUrl]);
//     }
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     setIsDragging(false);
//     const file = event.dataTransfer.files[0];
//     if (file) {
//       setVideoSrc(URL.createObjectURL(file));
//     }
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   useEffect(() => {
//     if (audios.length > 0) {
//       if (multitrackRef.current) {
//         multitrackRef.current.destroy();
//       }

//       try {
//         const waveforms = audios.map((audioUrl, index) => {
//           const colorIndex = index % colors.length;
//           const { waveColor, bgColor } = colors[colorIndex];
//           return {
//             id: index,
//             url: audioUrl,
//             draggable: true,
//             startPosition: 0,
//             volume: 0.8,
//             options: {
//               waveColor: waveColor,
//               progressColor: waveColor,
//               trackBackground: bgColor,
//               barWidth: 2, // Set bar width
//               barGap: 3,   // Set spacing between bars
//               barRadius: 2 // Set bar radius
//             },
//           };
//         });

//         multitrackRef.current = Multitrack.create(
//           waveforms,
//           {
//             container: document.querySelector('#multitrack-container'),
//             minPxPerSec: 50, // Reduced to make waveforms smaller
//             cursorWidth: 2,
//             cursorColor: '#D72F21',
//             trackBackground: '#1F1F1F', // Dark background
//             trackBorderColor: '#3C3C3C', // Slightly lighter border
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
//     <div className="video-editor">
//       <h1>Video and Audio Editor with Multitrack</h1>

//       <div
//         className={`drag-drop-zone ${isDragging ? 'dragging' : ''}`}
//         onDragOver={handleDragOver}
//         onDrop={handleDrop}
//         onDragLeave={handleDragLeave}
//       >
//         <input
//           type="file"
//           accept="video/*"
//           id="video-upload-input"
//           onChange={handleVideoUpload}
//           style={{ display: 'none' }}
//         />
//         {videoSrc ? (
//           <video width="100%" controls ref={videoRef} src={videoSrc} />
//         ) : (
//           <div>
//             <p>Drag and drop a video file here, or click to browse</p>
//             <button onClick={() => document.getElementById('video-upload-input').click()}>
//               Browse Files
//             </button>
//           </div>
//         )}
//       </div>

//       {videoSrc && (
//         <div className="controls">
//           <button onClick={addAudioTrack} className="control-btn">
//             Add Audio
//           </button>
//           <input
//             type="file"
//             accept="audio/*"
//             id="audio-upload-input"
//             onChange={handleAudioUpload}
//             style={{ display: 'none' }}
//           />

//           <div id="multitrack-container" style={{ height: '150px' }}></div>

//           <div className="playback-controls">
//             <button onClick={playPauseAll} className="control-btn">
//               {isPlaying ? 'Pause All' : 'Play All'}
//             </button>
//             <button onClick={forward} className="control-btn">
//               Forward 30s
//             </button>
//             <button onClick={backward} className="control-btn">
//               Backward 30s
//             </button>
//             <button onClick={exportVideo} className="control-btn">
//               Export Video
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoEditor;












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
    };useEffect(() => {
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
                            height: 60,
                            barWidth: 1.5,
                            barGap: 1,
                            barRadius: 1,
                            barHeight: 0,
                            draggable: true,
                        },
                    };
                });
    
                multitrackRef.current = Multitrack.create(
                    waveforms,
                    {
                        container: document.querySelector('#multitrack-container'),
                        height: 100,
                        minPxPerSec: 100,
                        cursorWidth: 2,
                        cursorColor: '#ffff',
                        dragBounds: false,
                        envelopeOptions: {
                            lineColor: 'rgba(255, 0, 0, 0.7)',
                            lineWidth: 4,
                            dragPointSize: window.innerWidth < 600 ? 20 : 10,
                            dragPointFill: '#ffffff',
                            dragPointStroke: '#ffffff',
                        },
                    }
                );
    
                // Add event listeners for drag and hover highlighting
                const waveformTracks = document.querySelectorAll('.waveform-track');
    
                waveformTracks.forEach(track => {
                    // Highlight on mouse hover
                    track.addEventListener('mouseenter', () => {
                        track.classList.add('active');
                    });
    
                    track.addEventListener('mouseleave', () => {
                        track.classList.remove('active');
                    });
    
                    // Highlight on drag start
                    track.addEventListener('dragstart', () => {
                        track.classList.add('active');
                    });
    
                    // Remove highlight on drag end
                    track.addEventListener('dragend', () => {
                        track.classList.remove('active');
                    });
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
        <div className="video-editor">
            <h1>Video and Audio Editor with Multitrack</h1>

            <div
                className={`drag-drop-zone ${isDragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragLeave={handleDragLeave}
            >
                <input
                    type="file"
                    accept="video/*"
                    id="video-upload-input"
                    onChange={handleVideoUpload}
                    style={{ display: 'none' }}
                />
                {videoSrc ? (
                    <video width="100%" controls ref={videoRef} src={videoSrc} />
                ) : (
                    <div>
                        <p>Drag and drop a video file here, or click to browse</p>
                        <button onClick={() => document.getElementById('video-upload-input').click()}>
                            Browse Files
                        </button>
                    </div>
                )}
            </div>

            {videoSrc && (
                <div className="controls">
                    <button onClick={addAudioTrack} className="control-btn">
                        Add Audio
                    </button>
                    <input
                        type="file"
                        accept="audio/*"
                        id="audio-upload-input"
                        onChange={(event) => handleAudioUpload(event, audios.length)}
                        style={{ display: 'none' }}
                    />
 <div id="multitrack-container" className="waveform-container"></div>

<div className="playback-controls">
  <button onClick={playPauseAll} className="control-btn">
    {isPlaying ? 'Pause All' : 'Play All'}
  </button>
  <button onClick={forward} className="control-btn">
    Forward 30s
  </button>
  <button onClick={backward} className="control-btn">
    Backward 30s
  </button>
  <button onClick={exportVideo} className="control-btn">
    Export Video
  </button>
</div>
</div>
)}
</div>
);
};

export default VideoEditor;