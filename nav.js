/* TRE2026 공용 내비게이션 — nav-data.js(window.TRE_DONE)를 읽어 드롭다운/이전·다음을 자동 구성 */
(function(){
  var done = window.TRE_DONE || [];
  var idx = parseInt(document.body.dataset.idx, 10);
  function fn(i){ return 'company_' + String(i).padStart(3,'0') + '.html'; }
  var pos = -1;
  for (var k=0;k<done.length;k++){ if(done[k].i===idx){ pos=k; break; } }
  var pv = pos>0 ? done[pos-1] : null;
  var nx = (pos>-1 && pos<done.length-1) ? done[pos+1] : null;

  // 상단 바로가기 드롭다운
  var sel = document.getElementById('jump');
  if (sel){
    done.forEach(function(d){
      var o = document.createElement('option');
      o.value = fn(d.i);
      o.textContent = String(d.i).padStart(3,'0') + ' · ' + d.n;
      if (d.i===idx) o.selected = true;
      sel.appendChild(o);
    });
    sel.addEventListener('change', function(){ if(this.value) location.href=this.value; });
  }

  // 상단 이전/다음 버튼
  var prev = document.getElementById('navprev'), next = document.getElementById('navnext');
  if (prev){ if(pv){ prev.href=fn(pv.i); prev.classList.remove('disabled'); } else prev.classList.add('disabled'); }
  if (next){ if(nx){ next.href=fn(nx.i); next.classList.remove('disabled'); } else next.classList.add('disabled'); }

  // 하단 페이저
  var pp = document.getElementById('pagerprev'), pn = document.getElementById('pagernext');
  if (pp){
    if(pv){ pp.href=fn(pv.i); pp.querySelector('.nm').textContent=pv.n; }
    else { pp.style.visibility='hidden'; }
  }
  if (pn){
    if(nx){ pn.href=fn(nx.i); pn.querySelector('.dir').textContent='다음 기업 →'; pn.querySelector('.nm').textContent=nx.n; }
    else { pn.href='index.html'; pn.querySelector('.dir').textContent='인덱스로 →'; pn.querySelector('.nm').textContent='전체 기업 목록'; }
  }
})();
