document.querySelectorAll('.tab-button').forEach(btn=>{btn.addEventListener('click',()=>{const wrap=btn.closest('.tabs');wrap.querySelectorAll('.tab-button').forEach(b=>b.classList.remove('active'));wrap.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));btn.classList.add('active');const panel=wrap.querySelector('#'+btn.dataset.tab);if(panel)panel.classList.add('active');});});

(function(){
  const pop=document.createElement('div');
  pop.className='info-popover';
  pop.innerHTML='<div class="info-card"><button type="button" aria-label="Close">Close</button><h3></h3><p></p></div>';
  document.body.appendChild(pop);
  const title=pop.querySelector('h3'); const text=pop.querySelector('p');
  function close(){pop.classList.remove('open');}
  pop.addEventListener('click',e=>{ if(e.target===pop) close(); });
  pop.querySelector('button').addEventListener('click',close);
  document.addEventListener('keydown',e=>{ if(e.key==='Escape') close(); });
  document.querySelectorAll('.info-dot').forEach(btn=>btn.addEventListener('click',()=>{title.textContent=btn.dataset.infoTitle||'Explanation';text.textContent=btn.dataset.info||'';pop.classList.add('open');}));
})();

// v2.7.4 loaded

(function(){
  function cellText(row, idx){ const c=row.children[idx]; return c ? c.textContent.trim() : ''; }
  function toVal(s){ const t=s.replace(/[,$#↗]/g,'').replace(/–/g,'-').trim(); const m=t.match(/^-?\d+(?:\.\d+)?$/); return m ? Number(t) : s.toLowerCase(); }
  document.querySelectorAll('table[data-sortable="true"]').forEach(table=>{
    table.querySelectorAll('th .sort-head').forEach(btn=>{
      btn.addEventListener('click',()=>{
        const idx=Number(btn.dataset.col||0); const tbody=table.tBodies[0];
        const asc=btn.classList.contains('sorted-asc') ? false : true;
        table.querySelectorAll('.sort-head').forEach(b=>{b.classList.remove('sorted-asc','sorted-desc'); const sp=b.querySelector('span'); if(sp) sp.textContent='↕';});
        btn.classList.add(asc?'sorted-asc':'sorted-desc'); const sp=btn.querySelector('span'); if(sp) sp.textContent=asc?'↑':'↓';
        const rows=Array.from(tbody.rows);
        rows.sort((a,b)=>{ const av=toVal(cellText(a,idx)); const bv=toVal(cellText(b,idx)); let res; if(typeof av==='number' && typeof bv==='number') res=av-bv; else res=String(av).localeCompare(String(bv),undefined,{numeric:true,sensitivity:'base'}); return asc ? res : -res; });
        rows.forEach(r=>tbody.appendChild(r));
      });
    });
  });
})();


// v2.9 plain-header sorter fallback
(function(){
  function val(s){const t=(s||'').replace(/[,$#↗]/g,'').replace(/–/g,'-').trim();const m=t.match(/^-?\d+(?:\.\d+)?$/);return m?Number(t):t.toLowerCase();}
  document.querySelectorAll('table[data-sortable="true"]').forEach(table=>{
    if(table.dataset.v29PlainSorterAttached==='true') return;
    table.dataset.v29PlainSorterAttached='true';
    table.querySelectorAll('thead th').forEach((th,idx)=>{
      if(th.querySelector('.sort-head')) return;
      th.style.cursor='pointer'; th.title='Click to sort';
      th.addEventListener('click',()=>{const tbody=table.tBodies[0]; if(!tbody) return; const asc=th.dataset.asc!=='true'; th.dataset.asc=String(asc); const rows=Array.from(tbody.rows); rows.sort((a,b)=>{const av=val((a.children[idx]||{}).textContent||''); const bv=val((b.children[idx]||{}).textContent||''); let res=(typeof av==='number'&&typeof bv==='number')?av-bv:String(av).localeCompare(String(bv),undefined,{numeric:true,sensitivity:'base'}); return asc?res:-res;}); rows.forEach(r=>tbody.appendChild(r));});
    });
  });
})();


// v3.0.5 mobile table swipe hints
(function(){
  function updateHints(){
    document.querySelectorAll('.table-wrap').forEach(wrap=>{
      const needs = wrap.scrollWidth > wrap.clientWidth + 8;
      wrap.classList.toggle('scroll-hint', needs);
      wrap.classList.toggle('scrolled', wrap.scrollLeft > 12);
    });
  }
  window.addEventListener('load', updateHints);
  window.addEventListener('resize', updateHints);
  document.querySelectorAll('.table-wrap').forEach(wrap=>{
    wrap.addEventListener('scroll', ()=>wrap.classList.toggle('scrolled', wrap.scrollLeft > 12), {passive:true});
  });
})();
