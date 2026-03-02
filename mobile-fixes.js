// MISSION CONTROL - MOBILE & FUNCTIONALITY FIXES
// Add to index.html before closing </body> tag

// 1. Force refresh tasks after add/edit
const originalAddTask = window.addTask;
window.addTask = function() {
    showModal('New Task', taskFormHTML(), async () => {
        const v = getTaskFormValues();
        if (!v.title) { alert('Title is required'); return; }
        const id = uid();
        await neonQuery('INSERT INTO tasks(id,title,assignee,status,created,due_date,priority,description,category) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)',
            [id, v.title, v.assignee, v.status, Date.now(), v.due_date, v.priority, v.description, v.category]);
        
        // Force cache clear and reload
        cache.tasks = [];
        await loadFromDB('tasks');
        render();
        
        // Show success message
        showToast('✓ Task added successfully');
    });
};

// 2. Add refresh button to tasks toolbar
function addTasksRefreshButton() {
    const tasksSection = document.querySelector('#tasks-tab');
    if (!tasksSection) return;
    
    const toolbar = tasksSection.querySelector('.toolbar');
    if (!toolbar) return;
    
    // Add refresh button if not exists
    if (!toolbar.querySelector('.refresh-tasks-btn')) {
        const refreshBtn = document.createElement('button');
        refreshBtn.className = 'refresh-tasks-btn';
        refreshBtn.innerHTML = '🔄 Refresh';
        refreshBtn.style.marginLeft = '8px';
        refreshBtn.onclick = async () => {
            refreshBtn.innerHTML = '🔄 Refreshing...';
            refreshBtn.disabled = true;
            cache.tasks = [];
            await loadFromDB('tasks');
            render();
            refreshBtn.innerHTML = '🔄 Refresh';
            refreshBtn.disabled = false;
            showToast('✓ Tasks refreshed');
        };
        toolbar.appendChild(refreshBtn);
    }
}

// 3. Calendar view switcher (day/week/month)
let calendarView = 'month'; // 'day', 'week', 'month'

function createCalendarViewSwitcher() {
    return `
        <div class="calendar-view-switcher" style="display:flex;gap:4px;margin-left:auto">
            <button onclick="switchCalendarView('day')" class="${calendarView === 'day' ? 'active' : ''}" style="padding:6px 12px;font-size:.8rem">Day</button>
            <button onclick="switchCalendarView('week')" class="${calendarView === 'week' ? 'active' : ''}" style="padding:6px 12px;font-size:.8rem">Week</button>
            <button onclick="switchCalendarView('month')" class="${calendarView === 'month' ? 'active' : ''}" style="padding:6px 12px;font-size:.8rem">Month</button>
        </div>
    `;
}

window.switchCalendarView = function(view) {
    calendarView = view;
    render();
};

// 4. Enhanced calendar rendering with tasks
const originalRenderCalendar = window.renderCalendar;
window.renderCalendar = async function(el) {
    const entries = await loadFromDB('calendar');
    const tasks = await loadFromDB('tasks');
    
    // Add tasks with due dates to calendar
    const taskEntries = tasks.filter(t => t.due_date).map(t => ({
        id: t.id,
        date: t.due_date,
        time: '',
        title: `[Task] ${t.title}`,
        description: t.description,
        category: 'task',
        priority: t.priority
    }));
    
    const allEntries = [...entries, ...taskEntries];
    
    if (calendarView === 'day') {
        renderDayView(el, allEntries);
    } else if (calendarView === 'week') {
        renderWeekView(el, allEntries);
    } else {
        renderMonthView(el, allEntries);
    }
};

function renderDayView(el, entries) {
    const today = new Date(calYear, calMonth, new Date().getDate());
    const ds = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const dayEntries = entries.filter(e => e.date === ds).sort((a, b) => (a.time || '').localeCompare(b.time || ''));
    
    el.innerHTML = `
        <h2><span class="section-icon">◆</span> CALENDAR - Day View</h2>
        <div class="toolbar">
            <button onclick="calNav(-1)">◀ Prev Day</button>
            <span style="min-width:200px;text-align:center;font-weight:bold">${today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <button onclick="calNav(1)">Next Day ▶</button>
            ${createCalendarViewSwitcher()}
            <button onclick="addCalEntry('${ds}')" style="margin-left:8px">+ Entry</button>
        </div>
        <div style="max-height:70vh;overflow-y:auto;padding:1rem;background:rgba(0,0,0,.2);border-radius:8px">
            ${dayEntries.length ? dayEntries.map(e => `
                <div class="card" style="margin-bottom:12px;cursor:pointer" onclick="editCalEntry('${e.id}')">
                    <div style="font-weight:bold;margin-bottom:4px">${e.time ? e.time + ' - ' : ''}${esc(e.title)}</div>
                    ${e.description ? `<div style="font-size:.85rem;color:var(--dim);margin-top:4px">${esc(e.description)}</div>` : ''}
                    <div style="display:flex;gap:6px;margin-top:8px">
                        ${e.category ? `<span class="badge ${e.category}">${e.category}</span>` : ''}
                        ${e.priority ? `<span class="badge ${e.priority}">${e.priority}</span>` : ''}
                    </div>
                </div>
            `).join('') : '<div class="empty">No events scheduled for this day</div>'}
        </div>
    `;
}

function renderWeekView(el, entries) {
    const startOfWeek = new Date(calYear, calMonth, 1);
    const dayOfWeek = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek); // Go to Sunday
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        weekDays.push(day);
    }
    
    el.innerHTML = `
        <h2><span class="section-icon">◆</span> CALENDAR - Week View</h2>
        <div class="toolbar">
            <button onclick="calNav(-7)">◀ Prev Week</button>
            <span style="min-width:200px;text-align:center;font-weight:bold">Week of ${weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            <button onclick="calNav(7)">Next Week ▶</button>
            ${createCalendarViewSwitcher()}
            <button onclick="addCalEntry()" style="margin-left:8px">+ Entry</button>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-top:1rem">
            ${weekDays.map(day => {
                const ds = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
                const dayEntries = entries.filter(e => e.date === ds).slice(0, 3);
                const isToday = day.toDateString() === new Date().toDateString();
                
                return `
                    <div class="card ${isToday ? 'today' : ''}" style="padding:12px;min-height:150px">
                        <div style="font-weight:bold;margin-bottom:8px;color:${isToday ? 'var(--green)' : 'var(--green)'}">${day.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                        ${dayEntries.map(e => `
                            <div style="font-size:.75rem;padding:4px;background:rgba(0,255,65,.08);border-radius:4px;margin-bottom:4px;cursor:pointer;border-left:2px solid var(--green)" onclick="editCalEntry('${e.id}')">
                                ${e.time ? e.time + '<br>' : ''}${esc(e.title)}
                            </div>
                        `).join('')}
                        ${dayEntries.length === 0 ? '<div style="font-size:.75rem;color:var(--dim)">No events</div>' : ''}
                        ${entries.filter(e => e.date === ds).length > 3 ? `<div style="font-size:.7rem;color:var(--dim);margin-top:4px">+${entries.filter(e => e.date === ds).length - 3} more</div>` : ''}
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function renderMonthView(el, entries) {
    // Use original month view but with tasks included
    const d = new Date(calYear, calMonth, 1), dow = d.getDay(), dim = new Date(calYear, calMonth + 1, 0).getDate();
    const prevDim = new Date(calYear, calMonth, 0).getDate();
    const mName = d.toLocaleString('default', { month: 'long', year: 'numeric' });
    const today = new Date();
    
    el.innerHTML = `
        <h2><span class="section-icon">◆</span> CALENDAR - Month View</h2>
        <div class="toolbar">
            <button onclick="calNav(-1)">◀</button>
            <span style="min-width:160px;text-align:center;font-weight:bold">${mName}</span>
            <button onclick="calNav(1)">▶</button>
            ${createCalendarViewSwitcher()}
            <button onclick="addCalEntry()" style="margin-left:8px">+ Entry</button>
        </div>
        <div class="cal-grid">
            ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => `<div class="cal-header">${d}</div>`).join('')}
            ${buildMonthCalDays(dow, dim, prevDim, entries, today)}
        </div>
    `;
}

function buildMonthCalDays(dow, dim, prevDim, entries, today) {
    let html = '';
    for (let i = 0; i < dow; i++) { html += `<div class="cal-day other"><span class="num">${prevDim - dow + i + 1}</span></div>` }
    for (let d = 1; d <= dim; d++) {
        const ds = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const isToday = today.getFullYear() === calYear && today.getMonth() === calMonth && today.getDate() === d;
        const dayEntries = entries.filter(e => e.date === ds);
        html += `<div class="cal-day${isToday ? ' today' : ''}" onclick="showDayEntries('${ds}')">
            <span class="num">${d}</span>
            ${dayEntries.sort((a, b) => (a.time || '').localeCompare(b.time || '')).slice(0, 2).map(e => `<div class="cal-entry${e.category === 'task' ? ' task-entry' : ''}">${e.time ? esc(e.time) + ' ' : ''}${esc(e.title)}</div>`).join('')}
            ${dayEntries.length > 2 ? `<div class="cal-entry">+${dayEntries.length - 2} more</div>` : ''}
        </div>`;
    }
    const rem = (dow + dim) % 7; if (rem) for (let i = 1; i <= 7 - rem; i++) { html += `<div class="cal-day other"><span class="num">${i}</span></div>` }
    return html;
}

// 5. Toast notification helper
window.showToast = function(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position:fixed;
        bottom:20px;
        right:20px;
        background:var(--green);
        color:var(--bg);
        padding:12px 24px;
        border-radius:8px;
        font-weight:bold;
        z-index:10000;
        box-shadow:0 4px 12px rgba(0,255,65,.4);
        animation:slideInRight .3s ease-out;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'slideOutRight .3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
};

// 6. Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
        
        /* Mobile responsive calendar */
        @media (max-width: 768px) {
            .cal-grid {
                font-size: 0.75rem;
            }
            .cal-day {
                min-height: 60px;
                padding: 2px;
            }
            .cal-entry {
                font-size: 0.5rem;
                padding: 1px 2px;
            }
            .toolbar {
                flex-wrap: wrap;
                gap: 8px;
            }
            .calendar-view-switcher {
                width: 100%;
                order: 10;
            }
            .calendar-view-switcher button {
                flex: 1;
            }
        }
        
        .task-entry {
            background: rgba(255, 152, 0, 0.2) !important;
            border-left: 2px solid #ff9800;
        }
        
        .calendar-view-switcher button.active {
            background: var(--green);
            color: var(--bg);
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
    
    // Add refresh button after initial render
    setTimeout(addTasksRefreshButton, 1000);
});
