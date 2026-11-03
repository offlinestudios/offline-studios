import * as THREE from './vendor/three.module.js';

const $ = (id) => document.getElementById(id);
const container = $('scene');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const state = {power:true, paused:reducedMotion.matches, sound:false, channel:0, time:0, burst:0, dragging:false, angleX:0, angleY:0};
const channelNames = ['Floating logo','Slow rotation','Lost in the signal'];
const letters = [];
let renderer, scene, camera, screenMaterial, logoScene, logoCamera, logoTarget, logoGroup;
let audioContext, noiseGain, humGain;
let width=1,height=1,lastFrame=0,lastDraw=0,renderFrame=0,dirtyUntil=0;

function makeEnvironment(){
  const c=document.createElement('canvas');c.width=1024;c.height=512;const ctx=c.getContext('2d');
  ctx.fillStyle='#070c1b';ctx.fillRect(0,0,1024,512);
  const glow=ctx.createLinearGradient(0,0,0,512);glow.addColorStop(0,'#02040c');glow.addColorStop(.45,'#225c94');glow.addColorStop(.6,'#061527');glow.addColorStop(1,'#01020a');ctx.fillStyle=glow;ctx.fillRect(0,0,1024,512);
  ctx.fillStyle='#a8e6ff';ctx.fillRect(180,80,70,280);ctx.fillStyle='#ebf8ff';ctx.fillRect(300,60,120,110);ctx.fillStyle='#e8371c';ctx.fillRect(670,130,55,240);ctx.fillStyle='#176bba';ctx.fillRect(850,0,130,512);
  const texture=new THREE.CanvasTexture(c);texture.mapping=THREE.EquirectangularReflectionMapping;texture.colorSpace=THREE.SRGBColorSpace;
  const pmrem=new THREE.PMREMGenerator(renderer);const env=pmrem.fromEquirectangular(texture).texture;texture.dispose();pmrem.dispose();return env;
}
function makeBroadcast(){
  screenMaterial=new THREE.ShaderMaterial({
    uniforms:{broadcast:{value:logoTarget.texture},time:{value:0},power:{value:1},burst:{value:0},channel:{value:0},resolution:{value:new THREE.Vector2(1000,700)}},
    vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`,
    fragmentShader:`
      uniform sampler2D broadcast; uniform float time,power,burst,channel; uniform vec2 resolution; varying vec2 vUv;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
      void main(){
        vec2 q=vUv*2.-1.;vec2 uv=.5+q*(1.+dot(q,q)*.018)*.5;
        float tick=floor(time*18.);
        float grain=hash(floor(uv*resolution*.65)+vec2(tick,tick*1.71));
        float coarse=hash(floor(uv*vec2(250.,320.))+vec2(tick*.87,0.));
        float line=hash(vec2(floor(uv.y*500.),tick*.33));
        float wave=noise(vec2(uv.y*5.+time*.07,uv.x*4.));
        float cloud=noise(uv*vec2(3.3,4.5)+vec2(time*.014,-time*.022));
        float leftGlow=exp(-length((uv-vec2(.19,.52))*vec2(3.7,2.4)));
        float vertical=pow(.5+.5*sin(uv.x*3.6+time*.06),2.);
        float strength=.32+channel*.09;
        vec3 phosphor=vec3(.008,.27,.50);
        vec3 bg=vec3(.001,.004,.018)+phosphor*(leftGlow*.65+cloud*.035+wave*.02);
        bg+=vec3(.024,.26,.50)*(grain-.38)*strength*(.16+leftGlow);
        bg+=vec3(.01,.07,.13)*(coarse-.5)*.45;
        bg*=.85+line*.28;
        float tracking=exp(-pow((fract(uv.y+time*.028)-.5)*65.,2.));
        bg+=vec3(.005,.025,.06)*tracking;
        float jitter=(line-.5)*.00075+sin(uv.y*49.+time*3.)*.0003;
        uv.x+=jitter+burst*(noise(vec2(uv.y*19.,time*4.))-.5)*.038;
        vec4 logo=texture2D(broadcast,uv);
        vec3 face=vec3(1.)-exp(-logo.rgb*.8);
        vec2 px=1./resolution;
        vec4 bleed=texture2D(broadcast,uv+vec2(.003,0.));
        vec3 halo=vec3(0.);
        halo+=texture2D(broadcast,uv+vec2(.006,0.)).rgb;
        halo+=texture2D(broadcast,uv-vec2(.006,0.)).rgb;
        halo+=texture2D(broadcast,uv+vec2(0.,.009)).rgb;
        halo+=texture2D(broadcast,uv-vec2(0.,.009)).rgb;
        halo+=texture2D(broadcast,uv+vec2(.012,.012)).rgb;
        halo+=texture2D(broadcast,uv-vec2(.012,.012)).rgb;
        halo=clamp(halo/6.,0.,1.);
        float alpha=logo.a*(1.-burst*.35);
        vec3 col=mix(bg,face,alpha);
        col+=halo*vec3(.025,.07,.11)*(1.-alpha*.7);
        col.r+=max(0.,bleed.a-logo.a)*.075;
        float scan=.9+.1*sin(vUv.y*resolution.y*2.12);
        col*=scan;
        float vignette=pow(max(0.,1.-dot(q*vec2(.57,.55),q*vec2(.57,.55))),.75);
        col*=vignette;
        col+=vec3(.18,.005,.002)*pow(max(0.,q.x),3.)*.4;
        col+=vec3(.006,.03,.06)*pow(max(0.,1.-length((vUv-vec2(.25,.96))*vec2(1.1,5.))),3.);
        float inside=step(0.,uv.x)*step(uv.x,1.)*step(0.,uv.y)*step(uv.y,1.);
        vec3 off=vec3(.002,.004,.008);
        col=mix(off,col*inside,power);
        gl_FragColor=vec4(max(col,vec3(0.)),1.);
        #include <colorspace_fragment>
      }`,toneMapped:false,depthTest:false,depthWrite:false
  });
  scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),screenMaterial));
}
function traceLogo(image) {
  const c=document.createElement('canvas');c.width=Math.round(image.width/2);c.height=Math.round(image.height/2);
  const ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(image,0,0,c.width,c.height);
  const {data}=ctx.getImageData(0,0,c.width,c.height),w=c.width,h=c.height;
  const masks=[new Uint8Array(w*h),new Uint8Array(w*h)];
  for(let i=0;i<w*h;i++){const r=data[i*4],g=data[i*4+1],b=data[i*4+2];if(data[i*4+3]<128)continue;if(r<100&&g<100&&b<100)masks[0][i]=1;else if(r>140&&g<100&&b<80)masks[1][i]=1;}
  const materials=[new THREE.MeshStandardMaterial({color:0xd3e6ef,metalness:.5,roughness:.24}),new THREE.MeshStandardMaterial({color:0xf03b15,metalness:.35,roughness:.24,emissive:0xd02006,emissiveIntensity:.12})];
  masks.forEach((mask,mi)=>{
    const edges=new Map();const key=(x,y)=>y*(w+1)+x;
    const edge=(ax,ay,bx,by)=>edges.set(key(ax,ay),key(bx,by));
    for(let y=0;y<h;y++)for(let x=0;x<w;x++){if(!mask[y*w+x])continue;
      if(y===0||!mask[(y-1)*w+x])edge(x,y,x+1,y);
      if(x===w-1||!mask[y*w+x+1])edge(x+1,y,x+1,y+1);
      if(y===h-1||!mask[(y+1)*w+x])edge(x+1,y+1,x,y+1);
      if(x===0||!mask[y*w+x-1])edge(x,y+1,x,y);
    }
    const shapePath=new THREE.ShapePath();
    while(edges.size){const start=edges.keys().next().value;let current=start;const pts=[];let guard=0;
      do{pts.push([current%(w+1),Math.floor(current/(w+1))]);const next=edges.get(current);edges.delete(current);current=next;}while(current!==start&&current!==undefined&&guard++<100000);
      if(pts.length<10)continue;
      const simple=simplifyClosed(pts,.42);simple.forEach(([x,y],i)=>{const px=(x-344.5)*.0087,py=(198-y)*.0087;i===0?shapePath.moveTo(px,py):shapePath.lineTo(px,py);});shapePath.currentPath.closePath();
    }
    for(const shape of shapePath.toShapes(false)) {
      const geometry=new THREE.ExtrudeGeometry(shape,{depth:.27,bevelEnabled:true,bevelSize:.012,bevelThickness:.012,bevelSegments:3,curveSegments:12});
      geometry.computeBoundingBox();const center=new THREE.Vector3();geometry.boundingBox.getCenter(center);geometry.translate(-center.x,-center.y,-center.z);
      const mesh=new THREE.Mesh(geometry,materials[mi]);mesh.position.copy(center);mesh.userData.base=center.clone();mesh.userData.index=letters.length;letters.push(mesh);logoGroup.add(mesh);
    }
  });
}
function simplifyClosed(points,tolerance) {
  function simplify(points){if(points.length<=2)return points;const a=points[0],b=points.at(-1);let max=0,index=0;const dx=b[0]-a[0],dy=b[1]-a[1],len=dx*dx+dy*dy;
    for(let i=1;i<points.length-1;i++){const p=points[i];const t=len?Math.max(0,Math.min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/len)):0;const dist=Math.hypot(p[0]-a[0]-t*dx,p[1]-a[1]-t*dy);if(dist>max){max=dist;index=i;}}
    if(max>tolerance){const left=simplify(points.slice(0,index+1)),right=simplify(points.slice(index));return left.slice(0,-1).concat(right);}return[a,b];
  }
  const mid=Math.floor(points.length/2);return simplify(points.slice(0,mid+1)).slice(0,-1).concat(simplify(points.slice(mid).concat([points[0]])).slice(0,-1));
}

function syncAudio(){if(!audioContext)return;const audible=state.sound&&state.power&&!document.hidden;noiseGain.gain.setTargetAtTime(audible?(state.channel===2?.038:.013):0,audioContext.currentTime,.15);humGain.gain.setTargetAtTime(audible?.007:0,audioContext.currentTime,.15);}
async function toggleSound(){
  try{
    if(!audioContext){audioContext=new (window.AudioContext||window.webkitAudioContext)();
      const buffer=audioContext.createBuffer(1,audioContext.sampleRate*2,audioContext.sampleRate),data=buffer.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=Math.random()*2-1;
      const source=audioContext.createBufferSource();source.buffer=buffer;source.loop=true;const filter=audioContext.createBiquadFilter();filter.type='lowpass';filter.frequency.value=1800;noiseGain=audioContext.createGain();noiseGain.gain.value=0;source.connect(filter).connect(noiseGain).connect(audioContext.destination);source.start();
      const hum=audioContext.createOscillator();hum.frequency.value=60;humGain=audioContext.createGain();humGain.gain.value=0;hum.connect(humGain).connect(audioContext.destination);hum.start();
    }
    await audioContext.resume();state.sound=!state.sound;syncAudio();updateControls();
  }catch{state.sound=false;$('status').textContent='Sound is unavailable in this browser.';updateControls();}
}
async function init(){
  renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.setClearColor(0x01030a,1);renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1;
  container.appendChild(renderer.domElement);
  scene=new THREE.Scene();camera=new THREE.Camera();
  logoTarget=new THREE.WebGLRenderTarget(1400,900,{type:THREE.HalfFloatType,format:THREE.RGBAFormat});
  logoScene=new THREE.Scene();logoScene.environment=makeEnvironment();logoScene.environmentIntensity=1.4;
  logoCamera=new THREE.PerspectiveCamera(30,1,.1,100);logoCamera.lookAt(0,0,0);
  logoScene.add(new THREE.AmbientLight(0xa7c4e7,1.5));
  const key=new THREE.DirectionalLight(0xc4e9ff,5);key.position.set(-3,4,6);logoScene.add(key);
  const fill=new THREE.DirectionalLight(0x2071e1,3);fill.position.set(-4,-1,2);logoScene.add(fill);
  const rim=new THREE.DirectionalLight(0xff4424,4);rim.position.set(4,1,1);logoScene.add(rim);
  logoGroup=new THREE.Group();logoScene.add(logoGroup);
  const image=new Image();image.src='./images/offline-logo.png';await image.decode();traceLogo(image);
  makeBroadcast();resize();bindInteraction();updateControls();$('loading').classList.add('done');
  renderer.domElement.addEventListener('webglcontextlost',(e)=>{e.preventDefault();showFallback();});
  renderFrame=requestAnimationFrame(animate);
}
function resize(){
  width=container.clientWidth;height=container.clientHeight;renderer.setSize(width,height);
  const ratio=width/height;logoCamera.aspect=ratio;
  const viewWidth=5.8;logoCamera.position.set(0,0,(viewWidth/ratio)/(2*Math.tan(THREE.MathUtils.degToRad(15))));logoCamera.updateProjectionMatrix();
  const targetWidth=Math.min(1800,Math.round(width*Math.min(devicePixelRatio,1.5)));
  const targetHeight=Math.min(1600,Math.round(targetWidth/ratio));logoTarget.setSize(targetWidth,targetHeight);
  screenMaterial.uniforms.resolution.value.set(width*Math.min(devicePixelRatio,1.5),height*Math.min(devicePixelRatio,1.5));invalidate();
}
function invalidate(){dirtyUntil=performance.now()+1100;}
function animate(now){
  renderFrame=requestAnimationFrame(animate);if(document.hidden){lastFrame=now;return;}
  const still=state.paused||!state.power;
  if(still&&!state.dragging&&now>dirtyUntil){lastFrame=now;return;}
  if(now-lastDraw<(width<700?32:16))return;lastDraw=now;
  const dt=Math.min((now-lastFrame)/1000||0,.05);lastFrame=now;
  if(!still)state.time+=dt;const t=state.time;state.burst=Math.max(0,state.burst-dt*1.8);
  const y=state.channel===1?t*.26:Math.sin(t*.37)*.31-.18;
  const x=Math.sin(t*.41)*.10;
  logoGroup.rotation.x=THREE.MathUtils.damp(logoGroup.rotation.x,x+state.angleX,8,dt);
  logoGroup.rotation.y=THREE.MathUtils.damp(logoGroup.rotation.y,y+state.angleY,8,dt);
  logoGroup.rotation.z=Math.sin(t*.32)*.025-.022;
  logoGroup.position.y=Math.sin(t*.6)*.07;
  letters.forEach((mesh,i)=>{mesh.position.y=mesh.userData.base.y+Math.sin(t*.7+i*.8)*.025;mesh.rotation.z=Math.sin(t*.5+i)*.012;});
  screenMaterial.uniforms.time.value=t;screenMaterial.uniforms.channel.value=state.channel;
  screenMaterial.uniforms.power.value=THREE.MathUtils.damp(screenMaterial.uniforms.power.value,state.power?1:0,13,dt);
  screenMaterial.uniforms.burst.value=reducedMotion.matches?0:state.burst;
  renderer.setRenderTarget(logoTarget);renderer.setClearColor(0x000000,0);renderer.render(logoScene,logoCamera);
  renderer.setRenderTarget(null);renderer.setClearColor(0x01030a,1);renderer.render(scene,camera);
}
function bindInteraction(){
  new ResizeObserver(resize).observe(container);
  document.addEventListener('visibilitychange',()=>{lastFrame=performance.now();invalidate();syncAudio();});
  let startX=0,startY=0,baseX=0,baseY=0;
  container.addEventListener('pointerdown',(e)=>{if(e.button!==0||!state.power)return;state.dragging=true;startX=e.clientX;startY=e.clientY;baseX=state.angleX;baseY=state.angleY;container.setPointerCapture(e.pointerId);});
  container.addEventListener('pointermove',(e)=>{if(!state.dragging)return;state.angleY=baseY+(e.clientX-startX)*.006;state.angleX=THREE.MathUtils.clamp(baseX+(e.clientY-startY)*.004,-.55,.55);invalidate();});
  const release=(e)=>{state.dragging=false;invalidate();if(container.hasPointerCapture(e.pointerId))container.releasePointerCapture(e.pointerId);};
  container.addEventListener('pointerup',release);container.addEventListener('pointercancel',release);
  container.addEventListener('dblclick',()=>{state.angleX=0;state.angleY=0;invalidate();});
}
function updateControls(){
  const num=String(state.channel+1).padStart(2,'0');$('channel-id').textContent=num;$('osd-channel').textContent=num;
  document.querySelector('.television').classList.toggle('off',!state.power);
  $('tune').style.setProperty('--dial-angle',`${state.channel*70}deg`);$('power').style.setProperty('--dial-angle',state.power?'-30deg':'45deg');
  $('power').setAttribute('aria-pressed',String(state.power));$('power').setAttribute('aria-label',state.power?'Turn television off':'Turn television on');$('power').title=state.power?'Turn television off':'Turn television on';
  $('signal-label').textContent=state.power?'ON AIR':'OFF AIR';$('signal-dot').classList.toggle('off',!state.power);
  $('motion').setAttribute('aria-pressed',String(state.paused));$('motion').setAttribute('aria-label',state.paused?'Resume animation':'Pause animation');$('motion').title=state.paused?'Resume animation':'Pause animation';$('motion-label').textContent=state.paused?'PLAY':'HOLD';$('motion-icon').innerHTML=state.paused?'<path d="m6 3 9 6-9 6z"/>':'<path d="M6 4v10M12 4v10"/>';
  $('sound').setAttribute('aria-pressed',String(state.sound));$('sound').setAttribute('aria-label',state.sound?'Mute television sound':'Enable television sound');$('sound').title=state.sound?'Mute television sound':'Enable television sound';$('sound-label').textContent=state.sound?'SOUND ON':'SOUND OFF';$('sound-icon').innerHTML=state.sound?'<path d="M8 3 4 6H2v6h2l4 3zM11 6a4 4 0 0 1 0 6M13 3a8 8 0 0 1 0 12"/>':'<path d="M8 3 4 6H2v6h2l4 3zM12 7l4 4M16 7l-4 4"/>';
  $('tune').disabled=!state.power||!screenMaterial||renderer.domElement.hidden;$('motion').disabled=!state.power;invalidate();
}
function tune(){if(!state.power)return;state.channel=(state.channel+1)%3;state.time=0;state.burst=.8;state.angleX=0;state.angleY=0;updateControls();$('status').textContent=`Channel ${state.channel+1}. ${channelNames[state.channel]}.`;syncAudio();}
function togglePower(){state.power=!state.power;if(state.power)state.burst=.6;updateControls();$('status').textContent=state.power?'Television on.':'Television off.';syncAudio();}
function showFallback(error){
  if(error)console.error('The interactive CRT could not start:',error);cancelAnimationFrame(renderFrame);if(renderer)renderer.domElement.hidden=true;
  $('fallback').hidden=false;$('loading').classList.add('done');$('hint').hidden=true;$('tune').disabled=true;$('motion').hidden=true;$('sound').hidden=true;
  $('status').textContent='Showing a still CRT. Interactive 3D is unavailable in this browser.';
}
$('tune').addEventListener('click',tune);$('power').addEventListener('click',togglePower);$('motion').addEventListener('click',()=>{state.paused=!state.paused;updateControls();});$('sound').addEventListener('click',toggleSound);
reducedMotion.addEventListener('change',(e)=>{state.paused=e.matches;updateControls();});
init().catch(showFallback);
