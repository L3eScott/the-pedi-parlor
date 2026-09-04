/* ============================================================
   The Pedi Parlor — booking calendar (front-end demo)
   Month view, Mon–Sat bookable, past dates & Sundays disabled.
   Pick a date -> time slots -> fills the booking summary.
   No backend: submit shows a confirmation (wire to email/API later).
   ============================================================ */
(function(){
  var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var SLOTS = ['9:00 AM','10:30 AM','12:00 PM','1:30 PM','3:00 PM','4:30 PM'];

  var calMonth = document.getElementById('calMonth');
  var calDays  = document.getElementById('calDays');
  var slotList = document.getElementById('slotList');
  var picked   = document.getElementById('picked');
  var form     = document.getElementById('bookForm');
  var formOk   = document.getElementById('formOk');
  if(!calMonth) return;

  var today = new Date(); today.setHours(0,0,0,0);
  var view  = new Date(today.getFullYear(), today.getMonth(), 1);
  var selectedDate = null;
  var selectedSlot = null;

  function sameDay(a,b){ return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }

  function render(){
    calMonth.textContent = MONTHS[view.getMonth()] + ' ' + view.getFullYear();
    calDays.innerHTML = '';
    var firstDow = new Date(view.getFullYear(), view.getMonth(), 1).getDay();
    var daysIn = new Date(view.getFullYear(), view.getMonth()+1, 0).getDate();

    for(var i=0;i<firstDow;i++){
      var e = document.createElement('div'); e.className='cal-day empty'; calDays.appendChild(e);
    }
    for(var d=1; d<=daysIn; d++){
      var date = new Date(view.getFullYear(), view.getMonth(), d);
      var btn = document.createElement('button');
      btn.className = 'cal-day'; btn.type='button'; btn.textContent = d;
      var isPast = date < today;
      var isSunday = date.getDay()===0;
      if(isPast || isSunday){ btn.disabled = true; }
      if(sameDay(date, today)) btn.classList.add('today');
      if(selectedDate && sameDay(date, selectedDate)) btn.classList.add('selected');
      (function(dt){
        btn.addEventListener('click', function(){ selectDate(dt); });
      })(date);
      calDays.appendChild(btn);
    }
  }

  function selectDate(dt){
    selectedDate = dt; selectedSlot = null;
    render();
    slotList.innerHTML = '';
    SLOTS.forEach(function(s){
      var b = document.createElement('button');
      b.className='slot'; b.type='button'; b.textContent = s;
      b.addEventListener('click', function(){
        selectedSlot = s;
        slotList.querySelectorAll('.slot').forEach(function(x){x.classList.remove('selected');});
        b.classList.add('selected');
        updatePicked();
      });
      slotList.appendChild(b);
    });
    updatePicked();
  }

  function fmt(dt){
    var dow = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][dt.getDay()];
    return dow + ', ' + MONTHS[dt.getMonth()] + ' ' + dt.getDate();
  }

  function updatePicked(){
    if(selectedDate && selectedSlot){
      picked.innerHTML = '<b>'+fmt(selectedDate)+'</b> at <b>'+selectedSlot+'</b>';
    } else if(selectedDate){
      picked.innerHTML = '<b>'+fmt(selectedDate)+'</b> — now pick a time above.';
    } else {
      picked.innerHTML = 'No date &amp; time selected yet — choose one on the calendar.';
    }
  }

  document.getElementById('prevM').addEventListener('click', function(){
    var min = new Date(today.getFullYear(), today.getMonth(), 1);
    var prev = new Date(view.getFullYear(), view.getMonth()-1, 1);
    if(prev >= min){ view = prev; render(); }
  });
  document.getElementById('nextM').addEventListener('click', function(){
    view = new Date(view.getFullYear(), view.getMonth()+1, 1); render();
  });

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(!selectedDate || !selectedSlot){
      picked.style.borderColor = '#c0392b';
      picked.innerHTML = 'Please pick a date and time on the calendar first.';
      picked.scrollIntoView({behavior:'smooth', block:'center'});
      return;
    }
    var name = form.name.value || 'there';
    document.getElementById('okMsg').innerHTML =
      'Thank you, <b>'+name+'</b>! Your request for <b>'+fmt(selectedDate)+' at '+selectedSlot+
      '</b> has been received.<br>We\'ll confirm by email shortly.';
    form.style.display = 'none';
    picked.style.display = 'none';
    formOk.classList.add('show');
    formOk.scrollIntoView({behavior:'smooth', block:'center'});
  });

  render();
})();
