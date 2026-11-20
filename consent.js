/* Miranda Fernandes Advogados — aviso de cookies (LGPD) + Google Consent Mode v2
   Preencha os IDs abaixo para ativar a medição. Sem IDs, nada é carregado e o aviso não aparece. */
(function(){
  var GA_ID  = '';            // Google Analytics 4, ex.: 'G-XXXXXXXXXX'
  var ADS_ID = '';            // Google Ads, ex.: 'AW-123456789'
  var ADS_LABELS = {          // rótulos das conversões do Google Ads
    whatsapp_click: '',       // clique no WhatsApp
    contato_enviado: '',      // formulário de contato
    curriculo_enviado: ''     // não é conversão de anúncio; deixe vazio
  };
  var KEY = 'mf_cookies';
  var ids = [GA_ID, ADS_ID].filter(Boolean);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});

  function get(){ try{ return localStorage.getItem(KEY); }catch(e){ return null; } }
  function set(v){ try{ localStorage.setItem(KEY, v); }catch(e){} }

  var loaded = false;
  function load(){
    if (loaded || !ids.length) return; loaded = true;
    gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'denied',analytics_storage:'granted'});
    var s = document.createElement('script'); s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ids[0];
    document.head.appendChild(s);
    gtag('js', new Date());
    ids.forEach(function(id){ gtag('config', id); });
  }

  window.mfTrack = function(ev){
    if (!loaded) return;
    gtag('event', ev, {event_category:'contato'});
    if (ADS_ID && ADS_LABELS[ev]) gtag('event','conversion',{send_to: ADS_ID + '/' + ADS_LABELS[ev]});
  };

  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href*="wa.me"]');
    if (a) window.mfTrack('whatsapp_click');
  }, true);

  var css = '#mf-ck{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:760px;margin:0 auto;background:#091A2E;color:#fff;border:1px solid rgba(189,131,80,.55);border-radius:14px;padding:20px 22px;box-shadow:0 18px 50px rgba(0,0,0,.35);font-family:Urbanist,system-ui,sans-serif;font-size:15px;line-height:1.55;display:flex;gap:18px;align-items:center;flex-wrap:wrap}'+
    '#mf-ck p{margin:0;flex:1 1 360px;color:rgba(255,255,255,.85)}#mf-ck a{color:#D9A777;font-weight:700}'+
    '#mf-ck .b{display:flex;gap:10px;flex:0 0 auto}#mf-ck button{font:inherit;font-weight:800;font-size:14px;letter-spacing:.04em;border-radius:999px;padding:11px 20px;cursor:pointer}'+
    '#mf-ck .ok{background:#BD8350;color:#fff;border:1px solid #BD8350}#mf-ck .no{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.4)}'+
    '@media(max-width:560px){#mf-ck .b{width:100%}#mf-ck button{flex:1}}';

  function banner(){
    if (!ids.length || document.getElementById('mf-ck')) return;
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var d = document.createElement('div'); d.id = 'mf-ck'; d.setAttribute('role','dialog'); d.setAttribute('aria-label','Aviso de cookies');
    d.innerHTML = '<p>Usamos cookies opcionais de medição (Google Analytics e Google Ads) para entender o uso do site e o resultado dos nossos anúncios. Eles só são ativados se você aceitar. <a href="/politica-de-privacidade.html#cookies">Saiba mais</a>.</p><div class="b"><button class="no" type="button">Recusar</button><button class="ok" type="button">Aceitar</button></div>';
    document.body.appendChild(d);
    d.querySelector('.ok').onclick = function(){ set('aceito'); d.remove(); load(); };
    d.querySelector('.no').onclick = function(){ set('recusado'); d.remove(); gtag('consent','update',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'}); };
  }

  window.mfCookies = function(){
    if (!ids.length) { location.href = '/politica-de-privacidade.html#cookies'; return; }
    set(''); banner();
  };

  var c = get();
  if (c === 'aceito') load();
  else if (c !== 'recusado') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', banner); else banner();
  }
})();
