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
        form.innerHTML =
          '<div class="form-thanks">' +
          '<h3 style="font-family:\'Shrikhand\', serif; color: var(--bj-boot-red); font-size: 36px; transform: rotate(-1deg); display: inline-block; margin: 8px 0 12px;">Message sent!</h3>' +
          '<p>Thanks for reaching out &mdash; your note is on its way. A real person will get back to you soon.</p>' +
          '</div>';
      } else {
        setNote((result.data && result.data.message) || 'Something went wrong. Email us at info@thebootjuice.com.', '#E52421');
        if (btn) btn.disabled = false;
      }
    })
    .catch(function () {
      setNote('Network hiccup. Email us at info@thebootjuice.com.', '#E52421');
      if (btn) btn.disabled = false;
    });

  return false;
}
