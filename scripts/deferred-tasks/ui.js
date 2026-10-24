// Раздел «Отложенные задачи» SEO-панели. Данные — общий журнал (через /api/tasks), не localStorage.
(() => {
  const hdr = document.getElementById('hdr')
  if (!hdr) return
  const H = { 'content-type': 'application/json', 'x-omobonus-panel': '1' }
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
  const ACT = { created: 'создана', edited: 'изменена', closed: 'закрыта', reopened: 'открыта снова' }
  const FIELD = { title: 'название', priority: 'приоритет', status: 'статус', area: 'область', why: 'зачем', todo: 'что сделать', risks: 'риски', research: 'исследовано' }
  let S = { tasks: [], priorities: {}, statuses: {}, file: '' }
  let filter = 'open', openId = null, form = null, closing = null, msg = ''

  // Постоянное верхнее меню: два раздела вместо заголовка «SEO-панель»
  const nav = document.createElement('div')
  nav.id = 'dt-nav'
  nav.innerHTML = '<button type="button" data-m="seo">SEO-панель</button><button type="button" data-m="tasks" id="dt-btn">Отложенные задачи</button>'
  hdr.querySelector('h1').after(nav)
  document.body.classList.add('dt-ready')
  const btn = nav.querySelector('#dt-btn')
  const root = document.createElement('div')
  root.id = 'dt-root'
  hdr.after(root)

  // Индикатор сохранения и синхронизации Workspace с GitHub (виден в обоих разделах)
  const ind = document.createElement('span')
  ind.id = 'ws-sync'
  nav.after(ind)
  const alertBox = document.createElement('div')
  alertBox.id = 'ws-alert'
  hdr.after(alertBox)
  const LBL = {
    off: ['Сохранено · синхронизация выключена', 'ok-local'],
    saved: ['Сохранено · ждёт отправки', 'wait'],
    syncing: ['Синхронизация…', 'wait'],
    synced: ['Синхронизировано с GitHub', 'ok'],
    error: ['Ошибка синхронизации', 'bad'],
    conflict: ['Ошибка синхронизации: конфликт', 'bad'],
  }
  let lastHead = null
  async function pollSync() {
    if (document.hidden) return
    try {
      const s = await (await fetch('/api/sync', { cache: 'no-store' })).json()
      const [text, cls] = LBL[s.state] || [s.state, 'wait']
      ind.className = 'ws-' + cls
      ind.textContent = text
      ind.title = s.message || (s.syncedAt ? 'Последняя синхронизация: ' + new Date(s.syncedAt).toLocaleString('ru-RU') : '')
      const bad = s.state === 'error' || s.state === 'conflict'
      alertBox.innerHTML = bad ? `<b>${esc(text)}.</b> ${esc(s.message)} <button type="button" data-ws="retry">Повторить</button>` : ''
      alertBox.classList.toggle('on', bad)
      // Пришли изменения с GitHub — перечитать журнал
      if (lastHead !== null && s.head && s.head !== lastHead && document.body.classList.contains('dt-mode') && !form) load()
      if (s.head) lastHead = s.head
    } catch {
      ind.className = 'ws-bad'
      ind.textContent = 'Панель не отвечает'
    }
  }
  alertBox.addEventListener('click', async (e) => {
    if (!e.target.closest('[data-ws=retry]')) return
    ind.className = 'ws-wait'
    ind.textContent = 'Синхронизация…'
    await fetch('/api/sync/now', { method: 'POST', headers: H }).catch(() => {})
    pollSync()
  })
  pollSync()
  setInterval(pollSync, 4000)
  document.addEventListener('visibilitychange', pollSync)

  const toast = (t) => {
    const el = document.getElementById('toast')
    if (!el) return
    el.textContent = t
    el.classList.add('show')
    setTimeout(() => el.classList.remove('show'), 1800)
  }
  async function call(method, url, data) {
    const r = await fetch(url, { method, headers: H, body: data ? JSON.stringify(data) : undefined })
    const j = await r.json().catch(() => ({}))
    if (!r.ok) throw Object.assign(new Error(j.error || 'Ошибка ' + r.status), j)
    return j
  }
  async function load() {
    try {
      S = await call('GET', '/api/tasks')
      msg = ''
    } catch (e) {
      msg = e.message
    }
    paint()
  }

  const isOpen = (t) => t.status !== 'closed'
  const fmt = (d) => (d ? d.slice(0, 10).split('-').reverse().join('.') : '')
  const order = { high: 0, medium: 1, low: 2 }
  const tag = (kind, k, map) => `<span class="dt-tag ${kind}-${k}">${esc(map[k] || k)}</span>`

  function paintBtn() {
    const n = S.tasks.filter(isOpen).length
    btn.innerHTML = `Отложенные задачи <span class="c">${n}</span>`
    const on = document.body.classList.contains('dt-mode')
    nav.querySelectorAll('button').forEach((b) => {
      const active = (b.dataset.m === 'tasks') === on
      b.classList.toggle('on', active)
      b.setAttribute('aria-current', active ? 'page' : 'false')
    })
  }

  function detail(t) {
    const sec = (h, v) => (v ? `<h4>${h}</h4><p>${esc(v)}</p>` : '')
    const hist = t.history
      .slice()
      .reverse()
      .map((h) => {
        const ch = h.changes ? Object.entries(h.changes).map(([k, c]) => (k === 'status' || k === 'priority' ? `${FIELD[k]}: ${esc((k === 'status' ? S.statuses : S.priorities)[c.from] || c.from)} → ${esc((k === 'status' ? S.statuses : S.priorities)[c.to] || c.to)}` : FIELD[k] || k)).join('; ') : ''
        return `<li>${fmt(h.date)} ${esc(h.date.slice(11, 16))} — ${esc(h.by)}: ${ACT[h.action] || h.action}${ch ? ' (' + ch + ')' : ''}${h.note ? ' — «' + esc(h.note) + '»' : ''}</li>`
      })
      .join('')
    const closeBox =
      closing === t.id
        ? `<div class="dt-form" style="margin-top:12px"><label for="dt-close-note">Причина закрытия (обязательно)</label><textarea id="dt-close-note"></textarea>${msg ? `<div class="dt-warn">${esc(msg)}</div>` : ''}<div class="acts"><button class="dt-b r" data-a="close-ok">Закрыть задачу</button><button class="dt-b g" data-a="close-cancel">Отмена</button></div></div>`
        : ''
    return `<div class="dt-det">${t.area ? `<div class="meta">Область: ${esc(t.area)}</div>` : ''}${sec('Зачем нужна', t.why)}${sec('Что сделать', t.todo)}${sec('Риски', t.risks)}${sec('Что уже исследовано', t.research)}
      <div class="meta">Создана ${fmt(t.created)} · изменена ${fmt(t.updated)} · версия ${t.rev}</div>
      <div class="acts">${isOpen(t) ? `<button class="dt-b" data-a="edit">Изменить</button><button class="dt-b r" data-a="close">Закрыть</button>` : `<button class="dt-b" data-a="reopen">Открыть снова</button>`}</div>
      ${closeBox}<details><summary>История изменений (${t.history.length})</summary><ul>${hist}</ul></details></div>`
  }

  function formHtml() {
    const t = form.task || {}
    const opts = (map, v) => Object.entries(map).filter(([k]) => k !== 'closed').map(([k, n]) => `<option value="${k}" ${k === v ? 'selected' : ''}>${esc(n)}</option>`).join('')
    const ta = (k, label) => `<label for="dt-${k}">${label}</label><textarea id="dt-${k}">${esc(t[k])}</textarea>`
    const warn = form.similar?.length
      ? `<div class="dt-warn"><b>Похожие задачи уже есть:</b><ul>${form.similar.map((s) => `<li>${esc(s.id)} «${esc(s.title)}» — ${esc(S.statuses[s.status])}</li>`).join('')}</ul>Если это точно другая задача — нажмите «Всё равно сохранить».</div>`
      : ''
    return `<div class="dt-form" id="dt-form"><b>${form.id ? 'Изменить ' + esc(form.id) : 'Новая задача'}</b>
      <label for="dt-title">Короткое название</label><input id="dt-title" maxlength="120" value="${esc(t.title)}">
      <div class="two"><div><label for="dt-priority">Приоритет</label><select id="dt-priority">${opts(S.priorities, t.priority || 'medium')}</select></div>
      <div><label for="dt-status">Статус</label><select id="dt-status">${opts(S.statuses, t.status || 'deferred')}</select></div>
      <div><label for="dt-area">Область</label><input id="dt-area" value="${esc(t.area)}" placeholder="SEO, cookie, дизайн…"></div></div>
      ${ta('why', 'Зачем нужна')}${ta('todo', 'Что сделать')}${ta('risks', 'Риски')}${ta('research', 'Что уже исследовано')}
      <label for="dt-note">Комментарий к изменению (в историю)</label><input id="dt-note" value="">
      ${form.error ? `<div class="dt-warn">${esc(form.error)}</div>` : ''}${warn}
      <div class="acts"><button class="dt-b" data-a="save">Сохранить</button>${form.similar?.length ? '<button class="dt-b r" data-a="save-force">Всё равно сохранить</button>' : ''}<button class="dt-b g" data-a="cancel">Отмена</button></div></div>`
  }

  function paint() {
    paintBtn()
    if (!document.body.classList.contains('dt-mode')) return
    const all = S.tasks.slice().sort((a, b) => isOpen(b) - isOpen(a) || order[a.priority] - order[b.priority] || b.updated.localeCompare(a.updated))
    const list = all.filter((t) => (filter === 'open' ? isOpen(t) : filter === 'closed' ? !isOpen(t) : true))
    const nOpen = all.filter(isOpen).length
    const rows = list
      .map((t) => `<div class="dt-row ${openId === t.id ? 'open' : ''}" data-id="${t.id}"><span class="id">${t.id}</span><span class="t">${esc(t.title)}</span>${tag('p', t.priority, S.priorities)}${tag('s', t.status, S.statuses)}<span class="d">${fmt(t.updated)}</span></div>${openId === t.id ? detail(t) : ''}`)
      .join('')
    root.innerHTML = `<div class="dt-top"><h2>Отложенные задачи</h2>
      <div class="dt-f">${[['open', 'Открытые', nOpen], ['closed', 'Закрытые', all.length - nOpen], ['all', 'Все', all.length]].map(([k, n, c]) => `<button data-f="${k}" class="${filter === k ? 'on' : ''}">${n} · ${c}</button>`).join('')}</div>
      <button class="dt-b" data-a="new">+ Добавить задачу</button></div>
      <div class="dt-note">Общий журнал Omobonus для всех веток и сессий Claude. Задачи отсюда <b>не выполняются автоматически</b> — только после отдельного разрешения.</div>
      ${msg && !closing ? `<div class="dt-warn">${esc(msg)}</div>` : ''}${form ? formHtml() : ''}
      <div class="dt-list">${rows || '<div class="dt-empty">Задач нет</div>'}</div><div class="dt-file">Файл журнала: ${esc(S.file)}</div>`
  }

  const val = (k) => document.getElementById('dt-' + k)?.value ?? ''
  async function save(force) {
    const task = { title: val('title'), priority: val('priority'), status: val('status'), area: val('area'), why: val('why'), todo: val('todo'), risks: val('risks'), research: val('research') }
    form.task = { ...form.task, ...task }
    try {
      if (!force && !form.id) {
        const { similar } = await call('POST', '/api/tasks?check', { title: task.title })
        if (similar.length) return ((form.similar = similar), (form.error = ''), paint())
      }
      const t = form.id
        ? await call('PUT', '/api/tasks/' + form.id, { changes: task, rev: form.rev, note: val('note'), force })
        : await call('POST', '/api/tasks', { task, force, note: val('note') })
      form = null
      openId = t.id
      toast('Сохранено')
      await load()
    } catch (e) {
      form.similar = e.similar || []
      form.error = e.code === 'DUPLICATE' ? '' : e.message
      paint()
    }
  }
  async function act(method, path, data, done) {
    try {
      await call(method, path, data)
      closing = null
      toast(done)
      await load()
    } catch (e) {
      // Окно закрытия остаётся открытым, причина ошибки — сразу под ним
      await load()
      msg = e.message
      paint()
    }
  }

  root.addEventListener('click', (e) => {
    if (e.target.closest('[data-a],[data-f],.dt-row')) msg = ''
    const f = e.target.closest('[data-f]')
    if (f) return ((filter = f.dataset.f), paint())
    const a = e.target.closest('[data-a]')?.dataset.a
    const t = S.tasks.find((x) => x.id === openId)
    if (a === 'new') return ((form = { task: {} }), paint(), document.getElementById('dt-title')?.focus())
    if (a === 'cancel') return ((form = null), paint())
    if (a === 'save') return save(false)
    if (a === 'save-force') return save(true)
    if (a === 'edit' && t) return ((form = { id: t.id, rev: t.rev, task: { ...t } }), paint(), scrollTo(0, 0))
    if (a === 'close' && t) return ((closing = t.id), paint(), document.getElementById('dt-close-note')?.focus())
    if (a === 'close-cancel') return ((closing = null), paint())
    if (a === 'close-ok' && t) return act('POST', `/api/tasks/${t.id}/close`, { rev: t.rev, note: val('close-note') }, 'Задача закрыта')
    if (a === 'reopen' && t) return act('POST', `/api/tasks/${t.id}/reopen`, { rev: t.rev, note: '' }, 'Задача открыта снова')
    if (a) return
    const row = e.target.closest('.dt-row')
    if (row) {
      openId = openId === row.dataset.id ? null : row.dataset.id
      closing = null
      paint()
    }
  })

  // Раздел определяется адресом: #zadania — задачи, иначе — SEO-проверка.
  // Переключение без перезагрузки; назад/вперёд в браузере и обновление страницы тоже работают.
  const scrollPos = { seo: 0, tasks: 0 }
  const wantTasks = () => location.hash === '#zadania'
  function syncForm() {
    if (!form || !document.getElementById('dt-title')) return
    for (const k of ['title', 'priority', 'status', 'area', 'why', 'todo', 'risks', 'research']) form.task[k] = val(k)
  }
  function apply() {
    const on = wantTasks()
    const was = document.body.classList.contains('dt-mode')
    if (on !== was) {
      scrollPos[was ? 'tasks' : 'seo'] = scrollY
      if (was) syncForm()
      document.body.classList.toggle('dt-mode', on)
      if (!on) dispatchEvent(new Event('resize')) // панель SEO пересчитывает высоту шапки
    }
    paintBtn()
    if (on) load()
    if (on !== was) scrollTo(0, scrollPos[on ? 'tasks' : 'seo'])
  }
  function go(mode) {
    if ((mode === 'tasks') === wantTasks()) return
    history.pushState(null, '', mode === 'tasks' ? location.pathname + location.search + '#zadania' : location.pathname + location.search)
    apply()
  }
  nav.addEventListener('click', (e) => {
    const b = e.target.closest('[data-m]')
    if (b) go(b.dataset.m)
  })
  addEventListener('popstate', apply)
  addEventListener('hashchange', apply)
  document.body.classList.toggle('dt-mode', wantTasks())
  paintBtn()
  load()
})()
