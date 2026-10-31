/* Omobonus — strona "O nas" — interakcje */
(function () {
  'use strict';

  /* ---- Mobile menu ---- */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('mobileMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.toggle('open');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { menu.classList.remove('open'); });
    });
  }

  /* ---- File attach preview ---- */
  var fileInput = document.getElementById('f-files');
  var fileList = document.getElementById('fileList');
  if (fileInput && fileList) {
    fileInput.addEventListener('change', function () {
      fileList.innerHTML = '';
      Array.prototype.forEach.call(fileInput.files, function (f) {
        var li = document.createElement('li');
        var kb = f.size > 1048576
          ? (f.size / 1048576).toFixed(1) + ' MB'
          : Math.max(1, Math.round(f.size / 1024)) + ' KB';
        li.textContent = f.name + ' · ' + kb;
        fileList.appendChild(li);
      });
    });
  }

  /* ---- Form validation ---- */
  var form = document.getElementById('zgloszenie');
  if (!form) return;
  var okMsg = document.getElementById('formOk');

  function showError(input, show) {
    var field = input.closest('.field') || input.closest('.rodo');
    if (!field) return;
    var err = field.querySelector('.field-error');
    if (input.classList) input.classList.toggle('invalid', show);
    if (err) err.style.display = show ? 'block' : 'none';
  }

  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    var first = null;

    var name = document.getElementById('f-name');
    var phone = document.getElementById('f-phone');
    var email = document.getElementById('f-email');
    var desc = document.getElementById('f-desc');
    var rodo = document.getElementById('f-rodo');

    [[name, name.value.trim().length > 1],
     [phone, phone.value.replace(/\D/g, '').length >= 7],
     [email, email.value.trim() === '' || validEmail(email.value.trim())],
     [desc, desc.value.trim().length > 2]
    ].forEach(function (pair) {
      var good = pair[1];
      showError(pair[0], !good);
      if (!good) { ok = false; first = first || pair[0]; }
    });

    /* RODO */
    var rodoBox = rodo.nextElementSibling;
    if (!rodo.checked) {
      ok = false;
      first = first || rodo;
      if (rodoBox) rodoBox.style.borderColor = '#9b3b1d';
    } else if (rodoBox) {
      rodoBox.style.borderColor = '';
    }

    if (!ok) {
      if (first && first.focus) first.focus();
      return;
    }

    /* success (demo — brak realnego wysłania) */
    if (okMsg) okMsg.style.display = 'block';
    form.querySelector('.btn-submit').textContent = 'Wysłano ✓';
    form.querySelector('.btn-submit').disabled = true;
  });

  /* clear error on input */
  form.querySelectorAll('.input, .textarea').forEach(function (el) {
    el.addEventListener('input', function () { showError(el, false); });
  });
})();
