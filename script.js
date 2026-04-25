// ===== Landing animation overlay =====
(function () {
  var landing = document.getElementById('landing');
  if (!landing) return;

  var rm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (rm) {
    landing.remove();
    document.documentElement.classList.remove('is-locked');
    return;
  }

  function dismiss() {
    if (landing.classList.contains('is-done')) return;
    landing.classList.add('is-done');
    document.documentElement.classList.remove('is-locked');
    setTimeout(function () {
      if (landing && landing.parentNode) landing.parentNode.removeChild(landing);
    }, 750);
  }

  // Auto-dismiss after one full animation cycle (~3.8s) + a beat.
  var dismissTimer = setTimeout(dismiss, 4200);

  function skip() {
    clearTimeout(dismissTimer);
    dismiss();
  }

  // Skip on click, tap, or any keypress.
  landing.addEventListener('click', skip);
  window.addEventListener('keydown', skip, { once: true });
  landing.addEventListener('touchstart', skip, { passive: true });
})();

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
  var note = document.getElementById('form-note');
  if (!note) return true;
  setTimeout(function () {
    note.textContent = 'Thanks! Your email client should open with the message ready to send.';
    note.style.color = '#E52421';
  }, 50);
  return true;
}
