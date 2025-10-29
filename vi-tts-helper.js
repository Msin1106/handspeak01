
/* vi-tts-helper.js — Force Vietnamese TTS on Web Speech with robust selection */
(function(){
  const preferredVoiceNames = [
    "Google Vietnamese","Google Tiếng Việt","Google tieng Viet",
    "Microsoft HoaiMy Online (Natural) - Vietnamese (Vietnam)",
    "Microsoft An Online (Natural) - Vietnamese (Vietnam)",
    "Vietnamese"
  ];
  let cachedVoices=[], viVoices=[];
  function refreshVoices(){
    cachedVoices = window.speechSynthesis ? window.speechSynthesis.getVoices()||[] : [];
    viVoices = cachedVoices.filter(v =>
      (v.lang && (v.lang.toLowerCase()==="vi-vn" || v.lang.toLowerCase().startsWith("vi"))) ||
      (v.name && /viet|vi[eê]t/i.test(v.name))
    ).sort((a,b)=>{
      const ia = preferredVoiceNames.findIndex(n => (a.name||"").toLowerCase()===n.toLowerCase());
      const ib = preferredVoiceNames.findIndex(n => (b.name||"").toLowerCase()===n.toLowerCase());
      const sa = ia===-1? 999: ia, sb = ib===-1? 999: ib;
      if (sa!==sb) return sa-sb;
      if (!!b.default - !!a.default) return !!b.default - !!a.default;
      return (a.name||"").localeCompare(b.name||"");
    });
  }
  refreshVoices();
  if (typeof speechSynthesis!=="undefined"){ speechSynthesis.onvoiceschanged = refreshVoices; }
  function createUtter(text, opts={}){
    const u = new SpeechSynthesisUtterance(String(text||"").trim()||""); u.lang="vi-VN";
    let chosen=null; if (opts.voice){ chosen=(window.speechSynthesis.getVoices()||[]).find(v=>(v.name||"").toLowerCase()===String(opts.voice).toLowerCase()); }
    if (!chosen && viVoices.length) chosen=viVoices[0]; if (chosen) u.voice=chosen;
    u.rate = (typeof opts.rate==="number"? opts.rate: 1.0);
    u.pitch = (typeof opts.pitch==="number"? opts.pitch: 1.0);
    u.volume = (typeof opts.volume==="number"? opts.volume: 1.0);
    return u;
  }
  function speakVi(text, opts={}){
    if (!("speechSynthesis" in window)) return Promise.reject(new Error("SpeechSynthesis unsupported"));
    if (opts.cancelBeforeSpeak) speechSynthesis.cancel();
    const attempt = () => new Promise((res,rej)=>{ const u=createUtter(text,opts); u.onend=res; u.onerror=e=>rej(e.error||e); speechSynthesis.speak(u); });
    if (!viVoices.length) return new Promise((res,rej)=> setTimeout(()=>attempt().then(res).catch(rej),200));
    return attempt();
  }
  window.speakVi=speakVi; window.getVietnameseVoices=()=>viVoices.slice();
  if (typeof window.speak==="function"){ const _s=window.speak; window.speak=(t,o)=>{ try{return speakVi(t,o);}catch(e){return _s(t,o);} }; }
})();    
