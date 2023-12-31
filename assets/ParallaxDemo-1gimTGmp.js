import{g as S,h as x,i as B,j as d,k as $,t as H,n as C,l as D,m as T,p as k,q as P,_ as V,o as R,c as L,a as h,f as N,s as b,u as z,b as I}from"./app-jmEemqZF.js";function W(e){var n;const t=H(e);return(n=t==null?void 0:t.$el)!=null?n:t}const Y=B?window:void 0;function _(...e){let n,t,s,p;if(typeof e[0]=="string"||Array.isArray(e[0])?([t,s,p]=e,n=Y):[n,t,s,p]=e,!n)return C;Array.isArray(t)||(t=[t]),Array.isArray(s)||(s=[s]);const l=[],c=()=>{l.forEach(r=>r()),l.length=0},u=(r,i,m,g)=>(r.addEventListener(i,m,g),()=>r.removeEventListener(i,m,g)),v=$(()=>[W(n),H(p)],([r,i])=>{if(c(),!r)return;const m=D(i)?{...i}:i;l.push(...t.flatMap(g=>s.map(y=>u(r,g,y,m))))},{immediate:!0,flush:"post"}),f=()=>{v(),c()};return T(f),f}function q(){const e=d(!1);return k()&&P(()=>{e.value=!0}),e}function F(e){const n=q();return x(()=>(n.value,!!e()))}function J(e={}){const{window:n=Y}=e,t=F(()=>n&&"DeviceOrientationEvent"in n),s=d(!1),p=d(null),l=d(null),c=d(null);return n&&t.value&&_(n,"deviceorientation",u=>{s.value=u.absolute,p.value=u.alpha,l.value=u.beta,c.value=u.gamma}),{isSupported:t,isAbsolute:s,alpha:p,beta:l,gamma:c}}const U={page:e=>[e.pageX,e.pageY],client:e=>[e.clientX,e.clientY],screen:e=>[e.screenX,e.screenY],movement:e=>e instanceof Touch?null:[e.movementX,e.movementY]};function G(e={}){const{type:n="page",touch:t=!0,resetOnTouchEnds:s=!1,initialValue:p={x:0,y:0},window:l=Y,target:c=l,scroll:u=!0,eventFilter:v}=e;let f=null;const r=d(p.x),i=d(p.y),m=d(null),g=typeof n=="function"?n:U[n],y=a=>{const w=g(a);f=a,w&&([r.value,i.value]=w,m.value="mouse")},o=a=>{if(a.touches.length>0){const w=g(a.touches[0]);w&&([r.value,i.value]=w,m.value="touch")}},j=()=>{if(!f||!l)return;const a=g(f);f instanceof MouseEvent&&a&&(r.value=a[0]+l.scrollX,i.value=a[1]+l.scrollY)},X=()=>{r.value=p.x,i.value=p.y},A=v?a=>v(()=>y(a),{}):a=>y(a),E=v?a=>v(()=>o(a),{}):a=>o(a),O=v?()=>v(()=>j(),{}):()=>j();if(c){const a={passive:!0};_(c,["mousemove","dragover"],A,a),t&&n!=="movement"&&(_(c,["touchstart","touchmove"],E,a),s&&_(c,"touchend",X,a)),u&&n==="page"&&_(l,"scroll",O,{passive:!0})}return{x:r,y:i,sourceType:m}}function K(e,n={}){const{handleOutside:t=!0,window:s=Y}=n,p=n.type||"page",{x:l,y:c,sourceType:u}=G(n),v=d(e??(s==null?void 0:s.document.body)),f=d(0),r=d(0),i=d(0),m=d(0),g=d(0),y=d(0),o=d(!0);let j=()=>{};return s&&(j=$([v,l,c],()=>{const X=W(v);if(!X)return;const{left:A,top:E,width:O,height:a}=X.getBoundingClientRect();i.value=A+(p==="page"?s.pageXOffset:0),m.value=E+(p==="page"?s.pageYOffset:0),g.value=a,y.value=O;const w=l.value-i.value,M=c.value-m.value;o.value=O===0||a===0||w<0||M<0||w>O||M>a,(t||!o.value)&&(f.value=w,r.value=M)},{immediate:!0}),_(document,"mouseleave",()=>{o.value=!0})),{x:l,y:c,sourceType:u,elementX:f,elementY:r,elementPositionX:i,elementPositionY:m,elementHeight:g,elementWidth:y,isOutside:o,stop:j}}function Q(e,n={}){const{deviceOrientationTiltAdjust:t=o=>o,deviceOrientationRollAdjust:s=o=>o,mouseTiltAdjust:p=o=>o,mouseRollAdjust:l=o=>o,window:c=Y}=n,u=S(J({window:c})),{elementX:v,elementY:f,elementWidth:r,elementHeight:i}=K(e,{handleOutside:!1,window:c}),m=x(()=>u.isSupported&&(u.alpha!=null&&u.alpha!==0||u.gamma!=null&&u.gamma!==0)?"deviceOrientation":"mouse"),g=x(()=>{if(m.value==="deviceOrientation"){const o=-u.beta/90;return s(o)}else{const o=-(f.value-i.value/2)/i.value;return l(o)}}),y=x(()=>{if(m.value==="deviceOrientation"){const o=u.gamma/90;return t(o)}else{const o=(v.value-r.value/2)/r.value;return p(o)}});return{roll:g,tilt:y,source:m}}const Z=h("div",{class:"note opacity-1"},[I(" Credit of images to "),h("a",{href:"https://codepen.io/jaromvogel",target:"__blank"},"Jarom Vogel")],-1),ee={__name:"ParallaxDemo",setup(e){const n=d(null),t=S(Q(n)),s={display:"flex",flexDirection:"column",justifyContent:"center",minHeight:"500px",transition:".3s ease-out all"},p={overflow:"hidden",fontSize:"6rem",position:"absolute",top:"calc(50% - 1em)",left:"calc(50% - 1em)",height:"2em",width:"2em",margin:"auto"},l={position:"absolute",height:"100%",width:"100%",transition:".3s ease-out all"},c={margin:"3em auto",perspective:"300px"};x(()=>({opacity:.4,top:"20px",left:"40px",position:isMobile.value?"inherit":"absolute"}));const u=x(()=>({...l,transform:`translateX(${t.tilt*10}px) translateY(${t.roll*10}px) scale(1.33)`})),v=x(()=>({...l,transform:`translateX(${t.tilt*20}px) translateY(${t.roll*20}px) scale(1.33)`})),f=x(()=>({...l,transform:`translateX(${t.tilt*30}px) translateY(${t.roll*30}px) scale(1.33)`})),r=x(()=>({...l,transform:`translateX(${t.tilt*40}px) translateY(${t.roll*40}px) scale(1.33)`})),i=l,m=x(()=>({background:"#fff",height:"20rem",width:"15rem",borderRadius:"5px",border:"1px solid #cdcdcd",overflow:"hidden",transition:".3s ease-out all",boxShadow:"0 0 20px 0 rgba(255, 255, 255, 0.25)",transform:`rotateX(${t.roll*20}deg) rotateY(${t.tilt*20}deg)`}));return(g,y)=>(R(),L("div",null,[h("div",{ref_key:"target",ref:n,style:s},[N(' <pre :style="infoStyle">{{ YAML.dump(parallax) }}</pre> '),h("div",{style:c},[h("div",{style:b(m.value)},[h("div",{style:p},[h("img",{style:b(u.value),src:"https://jaromvogel.com/images/design/jumping_rabbit/page2layer0.png",alt:""},null,4),h("img",{style:b(v.value),src:"https://jaromvogel.com/images/design/jumping_rabbit/page2layer1.png",alt:""},null,4),h("img",{style:b(f.value),src:"https://jaromvogel.com/images/design/jumping_rabbit/page2layer2.png",alt:""},null,4),h("img",{style:b(r.value),src:"https://jaromvogel.com/images/design/jumping_rabbit/page2layer3.png",alt:""},null,4),h("img",{style:b(z(i)),src:"https://jaromvogel.com/images/design/jumping_rabbit/page2layer4.png",alt:""},null,4)])],4)]),Z],512)]))}},ne=V(ee,[["__file","ParallaxDemo.vue"]]);export{ne as default};
