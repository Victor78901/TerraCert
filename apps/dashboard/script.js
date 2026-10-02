const dashboardContent = {
  dashboard: {
    title: 'Verification dashboard',
    stats: [
      { label: 'Parcels checked', value: '2,480', delta: '+12.4%', trend: 'positive', icon: '📍' },
      { label: 'Pending reviews', value: '184', delta: '-8.1%', trend: 'warning', icon: '🧾' },
      { label: 'Fraud reports', value: '37', delta: '+5.6%', trend: 'positive', icon: '🚩' },
      { label: 'Verified titles', value: '1,962', delta: '+3.8%', trend: 'positive', icon: '✅' }
    ],
    queue: [
      { parcel: 'KJD-2048', type: 'Subdivision', owner: 'A. Mwangangi', risk: 'High', updated: '2 min ago', status: 'Pending review' },
      { parcel: 'KJD-1183', type: 'Lease', owner: 'N. Otieno', risk: 'Medium', updated: '11 min ago', status: 'Awaiting docs' },
      { parcel: 'KJD-9901', type: 'Title deed', owner: 'R. Wanjiku', risk: 'Low', updated: '24 min ago', status: 'Verified' },
      { parcel: 'KJD-0067', type: 'Caveat check', owner: 'P. Njoroge', risk: 'High', updated: '39 min ago', status: 'Escalated' },
      { parcel: 'KJD-4417', type: 'Land use', owner: 'J. Kimani', risk: 'Medium', updated: '1 hr ago', status: 'In review' }
    ],
    progress: [
      { label: 'Document validation', value: 86 },
      { label: 'Boundary cross-check', value: 72 },
      { label: 'Caveat matching', value: 64 },
      { label: 'Payment reconciliation', value: 91 }
    ],
    activity: [
      { title: 'New fraud report submitted', meta: 'KJD-0067 • 3 minutes ago', tone: 'accent' },
      { title: 'Boundary comparison completed', meta: 'North Ward • 17 minutes ago', tone: 'accent' },
      { title: 'Reviewer flagged incomplete title scan', meta: 'KJD-2048 • 42 minutes ago', tone: 'warning' },
      { title: 'M-Pesa reconciliation settled', meta: 'Payment batch #871 • 1 hour ago', tone: 'accent' }
    ]
  },
  parcels: {
    title: 'Parcel registry',
    stats: [
      { label: 'Active parcels', value: '1,438', delta: '+9.2%', trend: 'positive', icon: '🗺️' },
      { label: 'Boundary checks', value: '382', delta: '+14.1%', trend: 'positive', icon: '📐' },
      { label: 'Flagged records', value: '53', delta: '-2.9%', trend: 'warning', icon: '⚠️' },
      { label: 'Map sync', value: '96%', delta: '+1.7%', trend: 'positive', icon: '🛰️' }
    ],
    queue: [
      { parcel: 'TR-114', type: 'Agricultural plot', owner: 'M. Kiptoo', risk: 'Low', updated: '7 min ago', status: 'Synced' },
      { parcel: 'TR-785', type: 'Residential lease', owner: 'S. Achieng', risk: 'Medium', updated: '19 min ago', status: 'Reviewing' },
      { parcel: 'TR-902', type: 'Commercial title', owner: 'D. Kariuki', risk: 'High', updated: '34 min ago', status: 'Escalated' },
      { parcel: 'TR-221', type: 'Group ranch', owner: 'K. Oduor', risk: 'Medium', updated: '1 hr ago', status: 'Pending' }
    ],
    progress: [
      { label: 'Parcel indexing', value: 89 },
      { label: 'Spatial validation', value: 76 },
      { label: 'Reference matching', value: 81 },
      { label: 'Survey review', value: 58 }
    ],
    activity: [
      { title: 'Parcel boundary revised', meta: 'TR-114 • 9 minutes ago', tone: 'accent' },
      { title: 'Survey file uploaded', meta: 'TR-785 • 22 minutes ago', tone: 'accent' },
      { title: 'Ownership conflict detected', meta: 'TR-902 • 46 minutes ago', tone: 'warning' },
      { title: 'Registry sync completed', meta: 'North cluster • 1 hour ago', tone: 'accent' }
    ]
  },
  verification: {
    title: 'Verification workflow',
    stats: [
      { label: 'Cases opened', value: '462', delta: '+8.5%', trend: 'positive', icon: '🧩' },
      { label: 'Approved', value: '311', delta: '+6.4%', trend: 'positive', icon: '✅' },
      { label: 'Rejected', value: '41', delta: '+2.3%', trend: 'warning', icon: '❌' },
      { label: 'Avg. turnaround', value: '3.2d', delta: '-0.6d', trend: 'positive', icon: '⏱️' }
    ],
    queue: [
      { parcel: 'VT-318', type: 'Ownership proof', owner: 'E. Wambua', risk: 'High', updated: '5 min ago', status: 'Escalated' },
      { parcel: 'VT-496', type: 'Title search', owner: 'B. Muli', risk: 'Low', updated: '12 min ago', status: 'Verified' },
      { parcel: 'VT-760', type: 'Document review', owner: 'L. Njeri', risk: 'Medium', updated: '27 min ago', status: 'Awaiting docs' },
      { parcel: 'VT-885', type: 'Land use check', owner: 'G. Kilonzo', risk: 'Medium', updated: '51 min ago', status: 'In review' }
    ],
    progress: [
      { label: 'Applicant screening', value: 83 },
      { label: 'Registry checks', value: 68 },
      { label: 'Evidence review', value: 74 },
      { label: 'Decision packet', value: 92 }
    ],
    activity: [
      { title: 'Verification checklist updated', meta: 'VT-318 • 5 minutes ago', tone: 'accent' },
      { title: 'Supporting docs uploaded', meta: 'VT-760 • 18 minutes ago', tone: 'accent' },
      { title: 'Approval recommendation sent', meta: 'VT-496 • 33 minutes ago', tone: 'accent' },
      { title: 'Manual review assigned', meta: 'VT-885 • 1 hour ago', tone: 'warning' }
    ]
  },
  caveats: {
    title: 'Caveat monitoring',
    stats: [
      { label: 'Official caveats', value: '218', delta: '+4.6%', trend: 'positive', icon: '🛡️' },
      { label: 'Disputes open', value: '64', delta: '+12.1%', trend: 'warning', icon: '📢' },
      { label: 'Resolved today', value: '18', delta: '+5.9%', trend: 'positive', icon: '✅' },
      { label: 'Urgent alerts', value: '7', delta: '-1.0%', trend: 'warning', icon: '🚨' }
    ],
    queue: [
      { parcel: 'CV-119', type: 'Dispute notice', owner: 'T. Kibet', risk: 'High', updated: '8 min ago', status: 'Escalated' },
      { parcel: 'CV-442', type: 'Registered caveat', owner: 'A. Kioko', risk: 'Medium', updated: '15 min ago', status: 'Reviewing' },
      { parcel: 'CV-903', type: 'Title restriction', owner: 'H. Muthoni', risk: 'Low', updated: '22 min ago', status: 'Verified' },
      { parcel: 'CV-521', type: 'Apex alert', owner: 'J. Mburu', risk: 'High', updated: '48 min ago', status: 'Pending' }
    ],
    progress: [
      { label: 'Notice intake', value: 78 },
      { label: 'Registry confirmation', value: 66 },
      { label: 'Conflict triage', value: 71 },
      { label: 'Resolution routing', value: 58 }
    ],
    activity: [
      { title: 'New caveat logged', meta: 'CV-119 • 8 minutes ago', tone: 'warning' },
      { title: 'Notice matched to county record', meta: 'CV-442 • 21 minutes ago', tone: 'accent' },
      { title: 'Case closed after documentation', meta: 'CV-903 • 52 minutes ago', tone: 'accent' },
      { title: 'Escalation memo sent', meta: 'CV-521 • 1 hour ago', tone: 'warning' }
    ]
  },
  reports: {
    title: 'Fraud reports',
    stats: [
      { label: 'New reports', value: '143', delta: '+11.3%', trend: 'positive', icon: '📝' },
      { label: 'In moderation', value: '31', delta: '+3.7%', trend: 'warning', icon: '🕵️' },
      { label: 'Resolved', value: '89', delta: '+8.9%', trend: 'positive', icon: '✅' },
      { label: 'Escalations', value: '12', delta: '+1.4%', trend: 'positive', icon: '🚨' }
    ],
    queue: [
      { parcel: 'RP-104', type: 'Duplicate title', owner: 'A. Karanja', risk: 'High', updated: '4 min ago', status: 'Investigating' },
      { parcel: 'RP-220', type: 'Boundary claim', owner: 'M. Otieno', risk: 'Medium', updated: '15 min ago', status: 'Reviewing' },
      { parcel: 'RP-335', type: 'Forgery allegation', owner: 'J. Ndungu', risk: 'High', updated: '29 min ago', status: 'Escalated' },
      { parcel: 'RP-412', type: 'Survey mismatch', owner: 'P. Wambua', risk: 'Low', updated: '1 hr ago', status: 'Resolved' }
    ],
    progress: [
      { label: 'Intake triage', value: 84 },
      { label: 'Evidence review', value: 71 },
      { label: 'Moderator QA', value: 68 },
      { label: 'Case closure', value: 63 }
    ],
    activity: [
      { title: 'New report submitted', meta: 'RP-104 • 4 minutes ago', tone: 'accent' },
      { title: 'Evidence packet linked', meta: 'RP-220 • 17 minutes ago', tone: 'accent' },
      { title: 'Escalation added to queue', meta: 'RP-335 • 36 minutes ago', tone: 'warning' },
      { title: 'Case resolution approved', meta: 'RP-412 • 59 minutes ago', tone: 'accent' }
    ]
  },
  payments: {
    title: 'Payments',
    stats: [
      { label: 'Transactions', value: '864', delta: '+9.8%', trend: 'positive', icon: '💳' },
      { label: 'Successful', value: '804', delta: '+10.4%', trend: 'positive', icon: '✅' },
      { label: 'Pending', value: '27', delta: '-3.1%', trend: 'warning', icon: '⏳' },
      { label: 'Failed', value: '33', delta: '+2.7%', trend: 'positive', icon: '⚠️' }
    ],
    queue: [
      { parcel: 'PM-021', type: 'Verification fee', owner: 'C. Njeri', risk: 'Low', updated: '2 min ago', status: 'Paid' },
      { parcel: 'PM-044', type: 'Dispute filing', owner: 'R. Muema', risk: 'Medium', updated: '12 min ago', status: 'Pending' },
      { parcel: 'PM-089', type: 'Appeal fee', owner: 'E. Kimeu', risk: 'High', updated: '21 min ago', status: 'Review' },
      { parcel: 'PM-103', type: 'Caveat service', owner: 'S. Limo', risk: 'Low', updated: '56 min ago', status: 'Paid' }
    ],
    progress: [
      { label: 'Daraja callbacks', value: 94 },
      { label: 'Settlement sync', value: 81 },
      { label: 'Reconciliation', value: 76 },
      { label: 'Dispute handling', value: 61 }
    ],
    activity: [
      { title: 'Payment callback received', meta: 'PM-021 • 2 minutes ago', tone: 'accent' },
      { title: 'Settlement batch processed', meta: 'PM-044 • 14 minutes ago', tone: 'accent' },
      { title: 'Manual reconciliation required', meta: 'PM-089 • 27 minutes ago', tone: 'warning' },
      { title: 'Payout approved', meta: 'PM-103 • 1 hour ago', tone: 'accent' }
    ]
  },
  settings: {
    title: 'System settings',
    stats: [
      { label: 'Active roles', value: '24', delta: '+2', trend: 'positive', icon: '👥' },
      { label: 'Policies', value: '18', delta: '+3', trend: 'positive', icon: '🧾' },
      { label: 'Alerts enabled', value: '96%', delta: '+4%', trend: 'positive', icon: '🔔' },
      { label: 'Uptime', value: '99.9%', delta: '+0.1%', trend: 'positive', icon: '🛠️' }
    ],
    queue: [
      { parcel: 'SET-01', type: 'User role sync', owner: 'Admin', risk: 'Low', updated: '6 min ago', status: 'Healthy' },
      { parcel: 'SET-02', type: 'Audit policy', owner: 'Compliance', risk: 'Medium', updated: '17 min ago', status: 'Review' },
      { parcel: 'SET-03', type: 'Notification rules', owner: 'Ops', risk: 'Low', updated: '36 min ago', status: 'Updated' },
      { parcel: 'SET-04', type: 'Access policy', owner: 'Security', risk: 'High', updated: '59 min ago', status: 'Pending' }
    ],
    progress: [
      { label: 'Access controls', value: 92 },
      { label: 'Audit trail', value: 88 },
      { label: 'Notification engine', value: 79 },
      { label: 'System upgrades', value: 73 }
    ],
    activity: [
      { title: 'Role sync completed', meta: 'SET-01 • 6 minutes ago', tone: 'accent' },
      { title: 'Compliance policy updated', meta: 'SET-02 • 18 minutes ago', tone: 'accent' },
      { title: 'Ops notification queue refreshed', meta: 'SET-03 • 42 minutes ago', tone: 'accent' },
      { title: 'Security review scheduled', meta: 'SET-04 • 1 hour ago', tone: 'warning' }
    ]
  }
};

const state = {
  currentTab: 'dashboard',
  queueExpanded: {
    dashboard: false,
    parcels: false,
    verification: false,
    caveats: false,
    reports: false,
    payments: false,
    settings: false
  }
};

const showToast = (message) => {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
};

const renderStats = (stats) => {
  const statsGrid = document.getElementById('statsGrid');

  statsGrid.innerHTML = stats
    .map((stat) => `
      <article class="stat-card">
        <div class="label">
          <span>${stat.label}</span>
          <span class="icon-badge">${stat.icon}</span>
        </div>
        <h3>${stat.value}</h3>
        <div class="delta ${stat.trend}">${stat.delta} vs last week</div>
      </article>
    `)
    .join('');
};

const renderQueue = (queue) => {
  const queueTable = document.getElementById('queueTable');

  queueTable.innerHTML = queue
    .map((row) => {
      const riskClass = row.risk.toLowerCase() === 'high' ? 'high' : row.risk.toLowerCase() === 'medium' ? 'medium' : 'low';
      const statusClass = row.status.includes('Pending') || row.status.includes('Review') || row.status.includes('Investigating') || row.status.includes('Awaiting') || row.status.includes('In review') ? 'pending' : row.status.includes('Escalated') ? 'review' : row.status === 'Verified' || row.status === 'Synced' || row.status === 'Healthy' || row.status === 'Resolved' || row.status === 'Paid' || row.status === 'Updated' ? 'low' : 'pending';

      return `
        <tr>
          <td>${row.parcel}</td>
          <td>${row.type}</td>
          <td>${row.owner}</td>
          <td><span class="badge ${riskClass}">${row.risk}</span></td>
          <td>${row.updated}</td>
          <td><span class="badge ${statusClass}">${row.status}</span></td>
        </tr>
      `;
    })
    .join('');
};

const renderProgress = (progress) => {
  const container = document.getElementById('progressList');

  container.innerHTML = progress
    .map((item) => `
      <div class="progress-item">
        <div class="progress-label">
          <span>${item.label}</span>
          <strong>${item.value}%</strong>
        </div>
        <div class="progress-bar">
          <span style="width: ${item.value}%"></span>
        </div>
      </div>
    `)
    .join('');
};

const renderActivity = (activity) => {
  const list = document.getElementById('activityList');

  list.innerHTML = activity
    .map((item) => `
      <li>
        <span class="activity-dot" style="background: ${item.tone === 'warning' ? '#f9b24b' : '#41d6a6'}"></span>
        <div>
          <strong>${item.title}</strong>
          <small>${item.meta}</small>
        </div>
      </li>
    `)
    .join('');
};

const renderTab = (tabKey) => {
  state.currentTab = tabKey;
  const selected = dashboardContent[tabKey] || dashboardContent.dashboard;
  const queue = state.queueExpanded[tabKey] ? selected.queue : selected.queue.slice(0, 4);

  document.getElementById('pageTitle').textContent = selected.title;
  renderStats(selected.stats);
  renderQueue(queue);
  renderProgress(selected.progress);
  renderActivity(selected.activity);

  document.querySelectorAll('.nav-link').forEach((button) => {
    const isActive = button.dataset.tab === tabKey;
    button.classList.toggle('active', isActive);
  });

  const viewAllBtn = document.getElementById('viewAllBtn');
  viewAllBtn.textContent = state.queueExpanded[tabKey] ? 'Show less' : 'View all';
};

const exportCurrentQueue = () => {
  const current = dashboardContent[state.currentTab] || dashboardContent.dashboard;
  const rows = current.queue;
  const lines = [
    ['Parcel', 'Type', 'Owner', 'Risk', 'Updated', 'Status'],
    ...rows.map((row) => [row.parcel, row.type, row.owner, row.risk, row.updated, row.status])
  ];
  const csv = lines.map((line) => line.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${state.currentTab}-queue.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast(`Exported ${rows.length} records from ${current.title}.`);
};

const addNewCase = () => {
  const current = dashboardContent[state.currentTab] || dashboardContent.dashboard;
  const suffix = String(current.queue.length + 1).padStart(3, '0');
  const nextCase = {
    parcel: `${state.currentTab.slice(0, 2).toUpperCase()}-${suffix}`,
    type: 'New case',
    owner: 'System intake',
    risk: 'Medium',
    updated: 'just now',
    status: 'New'
  };

  current.queue.unshift(nextCase);
  current.activity.unshift({
    title: 'New case created from dashboard',
    meta: `${nextCase.parcel} • just now`,
    tone: 'accent'
  });

  state.queueExpanded[state.currentTab] = true;
  renderTab(state.currentTab);
  showToast(`Added a new ${state.currentTab} case.`);
};

const handleViewAll = () => {
  const tabKey = state.currentTab;
  state.queueExpanded[tabKey] = !state.queueExpanded[tabKey];
  renderTab(tabKey);
  showToast(state.queueExpanded[tabKey] ? 'Expanded full queue.' : 'Collapsed queue view.');
};

const navButtons = document.querySelectorAll('.nav-link');
navButtons.forEach((button) => {
  button.addEventListener('click', () => renderTab(button.dataset.tab));
});

document.getElementById('exportBtn').addEventListener('click', exportCurrentQueue);
document.getElementById('newCaseBtn').addEventListener('click', addNewCase);
document.getElementById('viewAllBtn').addEventListener('click', handleViewAll);

renderTab('dashboard');
