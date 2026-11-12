const button=document.getElementById('desktop-demo'),exportButton=document.getElementById('export-demo'),status=document.getElementById('export-status'),download=document.getElementById('video-download');
let desktop=false,recording=false,objectUrl;
function mode(isDesktop){desktop=isDesktop;window.dispatchEvent(new CustomEvent('wallpaper-mode',{detail:desktop?'desktop':'screensaver'}));button.textContent=desktop?'Play screen saver':'Return to desktop';document.getElementById('mode-title').textContent=desktop?'The scene settles into your desktop.':'The screen saver is playing.';}
button.onclick=()=>mode(!desktop);
const mime=typeof MediaRecorder!=='undefined'?['video/mp4;codecs=avc1.42E01E','video/mp4'].find(t=>MediaRecorder.isTypeSupported(t)):null;
if(!mime){exportButton.disabled=true;status.textContent='To export an MP4, open this preview in a current Safari or Chrome browser.';}
exportButton.onclick=()=>{
 const canvas=document.querySelector('#scene canvas');if(!canvas||canvas.hidden){status.textContent='Wait for the 3D scene to load before exporting.';return;}
 let stream,recorder,timer;
 try{mode(false);stream=canvas.captureStream(30);recorder=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:12000000});}
 catch(e){stream?.getTracks().forEach(t=>t.stop());status.textContent='MP4 recording is unavailable here. Try opening this page in Safari.';return;}
 const chunks=[];recording=true;button.disabled=true;exportButton.disabled=true;download.hidden=true;
 const stop=()=>{clearInterval(timer);if(recorder.state==='recording')recorder.stop();};
 const visibility=()=>{if(document.hidden){status.textContent='Recording interrupted when the preview was hidden. Keep this tab visible and try again.';chunks.length=0;stop();}};
 document.addEventListener('visibilitychange',visibility);
 recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
 recorder.onerror=()=>{status.textContent='Recording failed. Please try Safari.';stop();};
 recorder.onstop=()=>{stream.getTracks().forEach(t=>t.stop());document.removeEventListener('visibilitychange',visibility);recording=false;button.disabled=false;exportButton.disabled=false;if(document.hidden||!chunks.length)return;if(objectUrl)URL.revokeObjectURL(objectUrl);objectUrl=URL.createObjectURL(new Blob(chunks,{type:mime}));download.href=objectUrl;download.download='Offline-Studios-Wallpaper-Preview.mp4';download.hidden=false;status.textContent='Your silent preview is ready. Save it, then import it into Aerial → Video Library → My Videos. This short preview is not a seamless production loop.';};
 recorder.start();const start=performance.now();status.textContent='Recording 15 seconds of the scene. Keep this tab visible.';
 timer=setInterval(()=>{const elapsed=(performance.now()-start)/1000;status.textContent='Recording… '+Math.min(15,Math.floor(elapsed))+' / 15 seconds';if(elapsed>=15)stop();},250);
};
