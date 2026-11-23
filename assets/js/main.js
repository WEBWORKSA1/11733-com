/* 11733.com — 11733 Home Hub | site script (no dependencies) */
(function(){
  'use strict';
  var $=function(s,c){return (c||document).querySelector(s)};
  var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
  function store(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
  function sstore(k,v){try{if(v===undefined)return sessionStorage.getItem(k);sessionStorage.setItem(k,v)}catch(e){return null}}
  var num=function(el){if(typeof el==='string')el=$(el);if(!el)return 0;var v=parseFloat(String(el.value).replace(/[^0-9.\-]/g,''));return isNaN(v)?0:v};
  var usd=function(n,d){return (n<0?'-':'')+'$'+Math.abs(n).toLocaleString('en-US',{maximumFractionDigits:d||0,minimumFractionDigits:d||0})};
  var kfmt=function(n){return n>=1e6?'$'+(n/1e6).toFixed(2)+'M':'$'+Math.round(n/1000)+'K'};
  var set=function(id,t){var e=document.getElementById(id);if(e)e.textContent=t};

  /* ---------- Private inbox routing (address is never written in any page) ---------- */
  var _k=[112,114,126,51,113,116,124,112,122,93,44,124,110,118,111,114,106,127,120,106];
  function inbox(){return String.fromCharCode.apply(null,_k.map(function(c){return c^29})).split('').reverse().join('')}
  function endpoint(){return 'https://formsubmit.co/ajax/'+inbox()}
  $$('[data-mail]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();location.href='mailto:'+inbox()+'?subject='+encodeURIComponent(a.getAttribute('data-mail')||'Inquiry from 11733.com')})});

  /* ---------- Theme, nav, year ---------- */
  var root=document.documentElement,saved=store('h-theme');
  if(saved)root.setAttribute('data-theme',saved);
  var tb=$('#themeBtn');
  if(tb)tb.addEventListener('click',function(){var t=root.getAttribute('data-theme')==='dark'?'light':'dark';root.setAttribute('data-theme',t);store('h-theme',t);$$('canvas').forEach(function(c){if(c._redraw)c._redraw()})});
  var here=location.pathname.replace(/index\.html$/,'');
  $$('#menu a').forEach(function(a){var h=a.getAttribute('href').replace(/index\.html$/,'');if(h===here||(h==='/guides/'&&here.indexOf('/guides/')===0)){a.classList.add('active');a.setAttribute('aria-current','page')}});
  var bg=$('#burger'),menu=$('#menu');
  if(bg&&menu)bg.addEventListener('click',function(){var o=menu.classList.toggle('open');bg.setAttribute('aria-expanded',o)});
  set('yr',new Date().getFullYear());

  /* ---------- Reveal ---------- */
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{threshold:.06});$$('.reveal').forEach(function(el){io.observe(el)})}
  else $$('.reveal').forEach(function(el){el.classList.add('in')});

  /* ---------- Cookie notice ---------- */
  var ck=$('#cookie');if(ck&&!store('h-cookie')){ck.hidden=false;$('#cookieOk').addEventListener('click',function(){store('h-cookie','1');ck.hidden=true})}

  /* ---------- Lead nudge (once per session, never on lead pages or after a lead) ---------- */
  var nd=$('#nudge');
  if(nd&&!document.body.hasAttribute('data-no-nudge')&&!$('form.js-lead')&&!sstore('h-nudge')&&!store('h-lead')){
    var shown=false,show=function(){if(shown)return;shown=true;sstore('h-nudge','1');nd.hidden=false;$('#nudgeX').focus()};
    setTimeout(show,40000);
    window.addEventListener('scroll',function(){if(window.scrollY>(document.body.scrollHeight-innerHeight)*.6)show()},{passive:true});
    var close=function(){nd.hidden=true};$('#nudgeX').addEventListener('click',close);nd.addEventListener('click',function(e){if(e.target===nd)close()});document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
  }

  /* ---------- Fund / progress bars ---------- */
  $$('[data-pct]').forEach(function(i){setTimeout(function(){i.style.width=Math.min(100,parseFloat(i.getAttribute('data-pct')))+'%'},200)});

  /* ---------- Video facades (privacy-enhanced, load on click) ---------- */
  $$('.vid[data-yt]').forEach(function(v){
    var id=v.getAttribute('data-yt');
    v.innerHTML='<img loading="lazy" alt="" src="https://i.ytimg.com/vi/'+id+'/hqdefault.jpg"><button aria-label="Play video: '+(v.getAttribute('data-title')||'video')+'">▶</button>';
    v.addEventListener('click',function(){v.innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0" title="'+(v.getAttribute('data-title')||'YouTube video')+'" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'},{once:true});
  });

  /* ---------- Tiny canvas line chart ---------- */
  function css(v){return getComputedStyle(document.documentElement).getPropertyValue(v).trim()}
  function lineChart(cv,series,labels){
    cv._redraw=function(){lineChart(cv,series,labels)};
    var dpr=window.devicePixelRatio||1,w=cv.clientWidth,h=cv.clientHeight;cv.width=w*dpr;cv.height=h*dpr;
    var c=cv.getContext('2d');c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,w,h);
    var pl=64,pr=12,pt=12,pb=28,max=0;series.forEach(function(s){s.data.forEach(function(v){if(v>max)max=v})});if(max<=0)max=1;
    var n=labels.length,x=function(i){return pl+(w-pl-pr)*(n<2?0:i/(n-1))},y=function(v){return pt+(h-pt-pb)*(1-v/max)};
    c.strokeStyle=css('--line');c.fillStyle=css('--muted');c.font='11px Inter,sans-serif';c.lineWidth=1;
    for(var g=0;g<=4;g++){var gv=max*g/4,gy=y(gv);c.beginPath();c.moveTo(pl,gy);c.lineTo(w-pr,gy);c.stroke();c.textAlign='right';c.fillText(kfmt(gv),pl-6,gy+4)}
    c.textAlign='center';var step=Math.max(1,Math.ceil(n/8));for(var i=0;i<n;i+=step)c.fillText(labels[i],x(i),h-8);
    series.forEach(function(s){c.strokeStyle=s.color;c.lineWidth=2.5;c.beginPath();s.data.forEach(function(v,i){i?c.lineTo(x(i),y(v)):c.moveTo(x(i),y(v))});c.stroke()});
  }
  window.addEventListener('resize',function(){$$('canvas').forEach(function(c){if(c._redraw)c._redraw()})});

  /* ---------- Mortgage math ---------- */
  function pmt(P,ratePct,years){var r=ratePct/100/12,n=years*12;if(n<=0)return 0;return r===0?P/n:P*r/(1-Math.pow(1+r,-n))}

  /* ---------- Home value quick range (hero + home-value preview) ---------- */
  // Benchmark: 11733 median sale price per sq ft (Redfin, Oct 2025) — illustrative only.
  var PPSF=379;
  var condAdj={needs:-.12,average:0,updated:.07,renovated:.13};
  function valueRange(sqft,cond,extras){
    if(!sqft)return null;var mid=sqft*PPSF*(1+(condAdj[cond]||0)+(extras||0));
    return {lo:Math.round(mid*.9/5000)*5000,hi:Math.round(mid*1.1/5000)*5000,mid:mid};
  }
  var qv=$('#quickVal');
  if(qv){var qr=function(){var r=valueRange(num('#qSqft'),$('#qCond').value,0);set('qOut',r?kfmt(r.lo)+' – '+kfmt(r.hi):'Enter square feet')};$$('input,select',qv).forEach(function(e){e.addEventListener('input',qr)});qr();
    qv.addEventListener('submit',function(e){e.preventDefault();var q='?sqft='+encodeURIComponent(num('#qSqft'))+'&cond='+encodeURIComponent($('#qCond').value);location.href='/home-value.html'+q})}

  /* ---------- Multi-step lead forms ---------- */
  $$('form.multi').forEach(function(f){
    var steps=$$('.step',f),i=0,bar=$('.steps-bar i',f),cnt=$('.step-count',f);
    function go(n,quiet){steps[i].classList.remove('on');i=n;steps[i].classList.add('on');if(bar)bar.style.width=((i+1)/steps.length*100)+'%';if(cnt)cnt.textContent='Step '+(i+1)+' of '+steps.length;var fi=$('input:not([type=hidden]):not(.hp),select,textarea',steps[i]);if(quiet)return;if(fi&&i>0)fi.focus({preventScroll:true});f.scrollIntoView({behavior:'smooth',block:'start'})}
    function valid(){var ok=true,s=steps[i];
      $$('[required]',s).forEach(function(el){if(el.type==='radio'||el.type==='checkbox'){var g=$$('[name="'+el.name+'"]',s);if(!g.some(function(x){return x.checked})){ok=false}}else if(!el.checkValidity()){ok=false;el.reportValidity()}});
      var m=$('.form-msg',f);if(!ok&&m){m.className='form-msg err';m.textContent='Please complete the highlighted choices to continue.'}else if(m){m.textContent=''}
      return ok}
    $$('[data-next]',f).forEach(function(b){b.addEventListener('click',function(){if(valid()&&i<steps.length-1)go(i+1)})});
    $$('[data-back]',f).forEach(function(b){b.addEventListener('click',function(){if(i>0)go(i-1)})});
    $$('.tile input[type=radio]',f).forEach(function(r){r.addEventListener('change',function(){var s=r.closest('.step');if(s&&s.hasAttribute('data-auto')&&i<steps.length-1)setTimeout(function(){if(valid())go(i+1)},180)})});
    f._reset=function(){go(0)};go(0,true);
  });

  // Home value preview
  var hv=$('#hvForm');
  if(hv){
    var p=new URLSearchParams(location.search);if(p.get('sqft')&&$('#hvSqft'))$('#hvSqft').value=p.get('sqft');if(p.get('cond')){var cr=$('input[name=condition][value="'+p.get('cond')+'"]',hv);if(cr)cr.checked=true}
    var upd=function(){var cond=($('input[name=condition]:checked',hv)||{}).value||'average',ex=$$('input[name=extras]:checked',hv).length*.015;
      var r=valueRange(num('#hvSqft'),cond,Math.min(ex,.06));set('hvPrev',r?kfmt(r.lo)+' – '+kfmt(r.hi):'—');if($('#hvSummary'))$('#hvSummary').value=r?('Ballpark '+kfmt(r.lo)+'–'+kfmt(r.hi)+' at $'+PPSF+'/sqft benchmark, condition '+cond):'n/a'};
    $$('input,select',hv).forEach(function(e){e.addEventListener('input',upd);e.addEventListener('change',upd)});upd();
  }
  // Quotes preview (typical national ranges are shown in page copy; here we just echo the scope)
  var qf=$('#qtForm');
  if(qf){var qu=function(){var s=($('input[name=service]:checked',qf)||{}).value||'—',t=($('input[name=timing]:checked',qf)||{}).value||'—';set('qtPrev',s+' · '+t)};$$('input',qf).forEach(function(e){e.addEventListener('change',qu)});qu()}

  /* ---------- Forms → private inbox via FormSubmit ---------- */
  $$('form.js-form').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var msg=$('.form-msg',f),btn=$('button[type=submit]',f);
      var hp=f.querySelector('[name=_honey]');if(hp&&hp.value)return;
      var data={};new FormData(f).forEach(function(v,k){if(k!=='_honey'&&v!=='')data[k]=data[k]?data[k]+', '+v:v});
      data._subject='[11733.com] '+(f.getAttribute('data-subject')||'Form')+(data.name?' — '+data.name:'');
      data._template='table';data._captcha='false';data.page=location.href;
      if(btn){btn.disabled=true;btn._t=btn.textContent;btn.textContent='Sending…'}
      fetch(endpoint(),{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
        .then(function(r){return r.json().catch(function(){return {}}).then(function(j){if(!r.ok||j.success==='false'||j.success===false)throw new Error(j.message||'Send failed');return j})})
        .then(function(){if(msg){msg.className='form-msg ok';msg.textContent=f.getAttribute('data-ok')||'Thanks — received. We reply within one business day.'}f.reset();if(f.classList.contains('js-lead'))store('h-lead','1');if(f._reset)f._reset()})
        .catch(function(){if(msg){msg.className='form-msg err';msg.innerHTML='Could not send right now. Please try again in a minute, or <a href="#" data-mail-inline>email us directly</a>.';var a=msg.querySelector('[data-mail-inline]');if(a)a.addEventListener('click',function(ev){ev.preventDefault();location.href='mailto:'+inbox()+'?subject='+encodeURIComponent(data._subject)})}})
        .then(function(){if(btn){btn.disabled=false;btn.textContent=btn._t}});
    });
  });

  /* ---------- Mortgage calculator ---------- */
  var mc=$('#mortCalc');
  if(mc){
    var mrun=function(){
      var price=num('#mPrice'),downPct=num('#mDown'),rate=num('#mRate'),yrs=num('#mTerm'),taxPct=num('#mTax'),ins=num('#mIns'),hoa=num('#mHoa'),extra=num('#mExtra');
      var loan=price*(1-downPct/100),pi=pmt(loan,rate,yrs),tax=price*taxPct/100/12,insm=ins/12,pmi=downPct<20?loan*.006/12:0,tot=pi+tax+insm+hoa+pmi;
      set('mTotal',usd(tot));set('mPI',usd(pi));set('mTaxO',usd(tax));set('mInsO',usd(insm));set('mPmi',usd(pmi));set('mLoan',usd(loan));
      // amortization with extra principal
      var r=rate/100/12,bal=loan,totInt=0,rows='',balArr=[],intArr=[],labs=[],m=0,cumInt=0;
      for(var y=1;y<=yrs&&bal>0.5;y++){var yi=0,yp=0;for(var k=0;k<12&&bal>0.5;k++){var it=bal*r,pr=Math.min(bal,pi-it+extra);bal-=pr;yi+=it;yp+=pr;m++}totInt+=yi;cumInt+=yi;rows+='<tr><td>'+y+'</td><td>'+usd(yp)+'</td><td>'+usd(yi)+'</td><td>'+usd(Math.max(bal,0))+'</td></tr>';balArr.push(Math.max(bal,0));intArr.push(cumInt);labs.push('Yr '+y)}
      set('mInt',usd(totInt));set('mPayoff',(m/12).toFixed(1)+' yrs');
      var tb=$('#mTable');if(tb)tb.innerHTML=rows;
      var segs=[[pi,'var(--navy)'],[tax,'var(--teal)'],[insm,'var(--gold)'],[pmi+hoa,'var(--brick)']],st=$('#mStack');
      if(st)st.innerHTML=segs.map(function(s){return '<i style="width:'+(tot?s[0]/tot*100:0)+'%;background:'+s[1]+'"></i>'}).join('');
      var cv=$('#mChart');if(cv)lineChart(cv,[{data:balArr,color:css('--navy')||'#0f2a43'},{data:intArr,color:css('--gold')||'#e9b44c'}],labs);
    };
    $$('input,select',mc).forEach(function(e){e.addEventListener('input',mrun)});mrun();
  }

  /* ---------- Affordability (28/36 rule) ---------- */
  var af=$('#affCalc');
  if(af){
    var arun=function(){
      var inc=num('#aInc')/12,debts=num('#aDebt'),down=num('#aDown'),rate=num('#aRate'),yrs=num('#aTerm'),taxPct=num('#aTax'),ins=num('#aIns')/12;
      var cap=Math.max(0,Math.min(inc*.28,inc*.36-debts));
      // solve price: pmt(price-down) + price*tax/12 + ins = cap
      var lo=0,hi=10e6;for(var it=0;it<60;it++){var mid=(lo+hi)/2,c=pmt(Math.max(mid-down,0),rate,yrs)+mid*taxPct/100/12+ins;if(c>cap)hi=mid;else lo=mid}
      set('aPrice',usd(lo));set('aPay',usd(cap));set('aLoan',usd(Math.max(lo-down,0)));
      var medianV=773000;set('aGap',lo>=medianV?'At or above the recent 11733 median sale price ($773K).':'About '+usd(medianV-lo)+' below the recent 11733 median sale price ($773K).');
    };
    $$('input,select',af).forEach(function(e){e.addEventListener('input',arun)});arun();
  }

  /* ---------- Property tax ---------- */
  var pt=$('#taxCalc');
  if(pt){
    var trun=function(){
      var v=num('#tVal'),rate=num('#tRate'),credit=num('#tCredit'),yrs=num('#tYrs'),grow=num('#tGrow');
      var annual=Math.max(0,v*rate/100-credit);set('tAnnual',usd(annual));set('tMonthly',usd(annual/12));set('tDaily',usd(annual/365,2));
      var tot=0,cur=annual,arr=[],labs=[];for(var y=1;y<=yrs;y++){tot+=cur;arr.push(tot);labs.push('Yr '+y);cur*=1+grow/100}
      set('tTotal',usd(tot));
      var rows='';[1.6,1.85,2.0,2.1,2.4].forEach(function(r){rows+='<tr><td>'+r.toFixed(2)+'%</td><td>'+usd(Math.max(0,v*r/100-credit))+'</td><td>'+usd(Math.max(0,v*r/100-credit)/12)+'</td></tr>'});
      var tb=$('#tTable');if(tb)tb.innerHTML=rows;
      var cv=$('#tChart');if(cv)lineChart(cv,[{data:arr,color:css('--teal')||'#1f8a8a'}],labs);
    };
    $$('input',pt).forEach(function(e){e.addEventListener('input',trun)});trun();
  }

  /* ---------- NY closing costs ---------- */
  var cc=$('#ccCalc');
  if(cc){
    var side='buyer';
    $$('[data-side]',cc).forEach(function(b){b.addEventListener('click',function(){side=b.getAttribute('data-side');$$('[data-side]',cc).forEach(function(x){x.classList.toggle('on',x===b)});crun()})});
    var crun=function(){
      var price=num('#cPrice'),loan=num('#cLoan'),atty=num('#cAtty'),comm=num('#cComm'),title=num('#cTitle'),mrt=num('#cMrt');
      var items=[];
      if(side==='buyer'){
        items.push(['NYS "mansion tax" (1% if price ≥ $1M)',price>=1e6?price*.01:0]);
        items.push(['Mortgage recording tax (borrower share, editable %)',loan*mrt/100]);
        items.push(['Title insurance (estimate, editable %)',price*title/100]);
        items.push(['Buyer attorney fee',atty]);
        items.push(['Lender, appraisal, inspection & misc. (est. 1% of loan)',loan*.01]);
      }else{
        items.push(['NYS real estate transfer tax (0.4%)',price*.004]);
        items.push(['Brokerage commission (editable %)',price*comm/100]);
        items.push(['Seller attorney fee',atty]);
        items.push(['Misc. (payoff, recording, survey; est.)',1500]);
      }
      var tot=items.reduce(function(a,b){return a+b[1]},0);
      $('#cRows').innerHTML=items.map(function(i){return '<tr><td>'+i[0]+'</td><td>'+usd(i[1])+'</td></tr>'}).join('')+'<tr><th>Total estimate</th><th>'+usd(tot)+'</th></tr>';
      set('cTotal',usd(tot));set('cPct',(price?tot/price*100:0).toFixed(2)+'% of price');
      if(side==='seller')set('cNet','Estimated net before mortgage payoff: '+usd(price-tot));else set('cNet','Cash to close ≈ down payment '+usd(Math.max(price-loan,0))+' + costs '+usd(tot)+' = '+usd(Math.max(price-loan,0)+tot));
    };
    $$('input',cc).forEach(function(e){e.addEventListener('input',crun)});crun();
  }

  /* ---------- Rent vs buy ---------- */
  var rb=$('#rbCalc');
  if(rb){
    var rrun=function(){
      var rent=num('#rRent'),rg=num('#rRg')/100,price=num('#rPrice'),downPct=num('#rDown')/100,rate=num('#rRate'),taxPct=num('#rTax')/100,maint=num('#rMaint')/100,app=num('#rApp')/100,inv=num('#rInv')/100,yrs=num('#rYrs'),sell=.06;
      // Net cost of buying = everything paid out − equity you walk away with (after 6% selling costs).
      // Net cost of renting = rent paid − growth earned by investing the down payment, closing costs and any monthly savings.
      var upfront=price*downPct+price*.03,loan=price*(1-downPct),pi=pmt(loan,rate,30),r=rate/100/12,bal=loan,cashRent=0,cashBuy=upfront,val=price,pot=upfront,contrib=upfront;
      var arrR=[],arrB=[],labs=[],curRent=rent;
      for(var y=1;y<=yrs;y++){
        var yearBuy=0;for(var k=0;k<12;k++){var it=bal*r;bal-=Math.min(bal,pi-it);yearBuy+=pi}
        yearBuy+=val*taxPct+val*maint;var yearRent=curRent*12,diff=Math.max(0,yearBuy-yearRent);
        cashRent+=yearRent;cashBuy+=yearBuy;pot=pot*(1+inv)+diff;contrib+=diff;
        val*=1+app;curRent*=1+rg;
        var equity=val*(1-sell)-bal;
        arrB.push(Math.max(cashBuy-equity,0));arrR.push(Math.max(cashRent-(pot-contrib),0));labs.push('Yr '+y)}
      var netBuy=arrB[arrB.length-1]||0,netRent=arrR[arrR.length-1]||0;
      set('rNetBuy',usd(netBuy));set('rNetRent',usd(netRent));
      set('rVerdict',netBuy<netRent?'Buying comes out about '+usd(netRent-netBuy)+' ahead over '+yrs+' years under these assumptions.':'Renting comes out about '+usd(netBuy-netRent)+' ahead over '+yrs+' years under these assumptions.');
      var cv=$('#rChart');if(cv)lineChart(cv,[{data:arrB,color:css('--navy')||'#0f2a43'},{data:arrR,color:css('--brick')||'#c2502e'}],labs);
    };
    $$('input',rb).forEach(function(e){e.addEventListener('input',rrun)});rrun();
  }

  /* ---------- Directory filter ---------- */
  var df=$('#dirFilter');
  if(df)$$('button',df).forEach(function(b){b.addEventListener('click',function(){var c=b.getAttribute('data-cat');$$('button',df).forEach(function(x){x.classList.toggle('on',x===b)});$$('[data-cat]','#dirGrid').forEach(function(card){card.style.display=(c==='all'||card.getAttribute('data-cat')===c)?'':'none'})})});
})();
