// ===== Countdown to Memorial Day weekend 2026 =====
(function () {
  var target = new Date(2026, 4, 23, 0, 0, 0).getTime();
  var cells = document.querySelectorAll('#countdown .n');
  if (!cells.length) return;

  function tick() {
    var now = Date.now();
    var diff = target - now;
    var out = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    if (diff > 0) {
      out.days = Math.floor(diff / 86400000);
      out.hours = Math.floor((diff % 86400000) / 3600000);
      out.minutes = Math.floor((diff % 3600000) / 60000);
      out.seconds = Math.floor((diff % 60000) / 1000);
    }
    cells.forEach(function (el) {
      var k = el.getAttribute('data-k');
      el.textContent = String(out[k]).padStart(2, '0');
    });
  }

  tick();
  setInterval(tick, 1000);
})();

function handleContact(e) {
  e.preventDefault();
  var form = e.target;
  var note = document.getElementById('form-note');
  var btn = form.querySelector('button[type="submit"]');

  function setNote(msg, color) {
    if (note) {
      note.textContent = msg;
      note.style.color = color;
    }
  }

  setNote('Sending…', '#E52421');
  if (btn) btn.disabled = true;

  fetch(form.action, {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: new FormData(form)
  })
    .then(function (res) {
      return res.json().then(function (data) {
        return { ok: res.ok, data: data };
      });
    })
    .then(function (result) {
      if (result.ok) {
        setNote('Thanks! Your message is on its way. We’ll be in touch.', '#E52421');
        form.reset();
      } else {
        setNote((result.data && result.data.message) || 'Something went wrong. Email us at info@thebootjuice.com.', '#E52421');
      }
    })
    .catch(function () {
      setNote('Network hiccup. Email us at info@thebootjuice.com.', '#E52421');
    })
    .finally(function () {
      if (btn) btn.disabled = false;
    });

  return false;
}
