import React, { useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle,
  Banknote,
  CalendarCheck,
  Check,
  CheckCircle2,
  ClipboardList,
  Download,
  Edit3,
  Eye,
  FileText,
  Filter,
  Home,
  Landmark,
  Languages,
  LayoutDashboard,
  LayoutGrid,
  LogIn,
  LogOut,
  Mail,
  MapPin,
  Moon,
  Phone,
  Plus,
  Receipt,
  RotateCcw,
  Save,
  Search,
  ShieldCheck,
  Shuffle,
  SlidersHorizontal,
  Store,
  Sun,
  Trash2,
  Undo2,
  UserPlus,
  Users,
  Wallet,
  Wrench,
  X
} from 'lucide-react'
import {
  BLOCKS,
  CURRENT_MONTH,
  STATUS_META,
  STATUSES,
  TODAY,
  buildSeed,
  downloadCSV,
  formatMoney,
  formatNum,
  lastMonths,
  leaseCovers,
  monthLabel,
  monthShift,
  splitSix,
  uid
} from './data/shops'

const DB_KEY = 'namdar.full.frontend.v1'
const SESSION_KEY = 'namdar.session.v1'

const EN = {
  brand: 'Namdar Market',
  full: 'Namdar Commercial Market Management System',
  place: 'Zazi Aryoub, Paktia',
  sample: 'Sample data — backend not connected yet',
  market: 'Market',
  login: 'Login',
  register: 'Register',
  logout: 'Logout',
  dashboard: 'Dashboard',
  shops: 'Shops',
  requests: 'Requests',
  renters: 'Renters',
  ledger: 'Rent Ledger',
  maintenance: 'Maintenance',
  partner: 'Partner Portal',
  renter: 'Renter Portal',
  available: 'Available',
  reserved: 'Reserved',
  rented: 'Rented',
  maintenanceStatus: 'Under Maintenance',
  all: 'All',
  search: 'Search shop, renter, trade…',
  block: 'Block',
  status: 'Status',
  sort: 'Sort',
  number: 'Shop number',
  rentLow: 'Rent low → high',
  rentHigh: 'Rent high → low',
  sizeLarge: 'Largest size',
  tileSize: 'Tile size',
  density: 'Density',
  compact: 'Compact',
  comfortable: 'Comfortable',
  spacious: 'Spacious',
  colorBy: 'Color by',
  collection: 'Collection',
  rentLevel: 'Rent level',
  labels: 'Labels',
  lanes: 'Lanes',
  heat: 'Heat %',
  glow: 'Glow',
  selectMode: 'Select mode',
  reset: 'Reset',
  randomize: 'Randomize',
  export: 'Export CSV',
  saveView: 'Save view',
  savedViews: 'Saved views',
  viewName: 'View name',
  selected: 'selected',
  clear: 'Clear',
  details: 'Details',
  close: 'Close',
  requestShop: 'Request this shop',
  recordPayment: 'Record cash payment',
  editStatus: 'Edit status',
  monthlyRent: 'Monthly rent',
  deposit: 'Security deposit',
  size: 'Size',
  trade: 'Trade',
  lane: 'Lane',
  renterName: 'Renter',
  lease: 'Lease',
  noLease: 'No active lease',
  totalShops: 'Total shops',
  occupancy: 'Occupancy rate',
  collected: 'Collected this month',
  collectionRate: 'Collection rate',
  arrears: 'Total arrears',
  due: 'Due',
  paid: 'Paid',
  balance: 'Balance',
  month: 'Month',
  amount: 'Amount',
  date: 'Date',
  note: 'Note',
  receipt: 'Receipt',
  reverse: 'Reverse',
  closeMonth: 'Close month',
  monthClosed: 'Month closed',
  partnerShare: 'Partner share',
  statements: 'Statements',
  approve: 'Approve',
  reject: 'Reject',
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
  addRenter: 'Add renter',
  editRenter: 'Edit renter',
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  nationalId: 'National ID',
  address: 'Address',
  guarantor: 'Guarantor',
  password: 'Password',
  createAccount: 'Create account',
  demoAccounts: 'Demo accounts',
  manager: 'Manager',
  applicant: 'Applicant / Renter',
  business: 'Business name',
  message: 'Message',
  submitRequest: 'Submit request',
  myRequests: 'My requests',
  myLease: 'My lease',
  myPayments: 'My payments',
  newMaintenance: 'New maintenance request',
  title: 'Title',
  description: 'Description',
  priority: 'Priority',
  open: 'Open',
  progress: 'In Progress',
  resolved: 'Resolved',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
  cashOnly: 'Rent is cash only. The Manager records payments. No online payment.',
  required: 'Required',
  saved: 'Saved',
  deleted: 'Deleted',
  undone: 'Undo completed',
  requestSent: 'Rental request submitted',
  paymentSaved: 'Cash payment recorded and receipt prepared',
  reversed: 'Payment reversed',
  approvedLease: 'Request approved and lease created',
  rejectedRequest: 'Request rejected',
  maintenanceSaved: 'Maintenance request saved',
  loginFailed: 'Wrong email or password',
  accountCreated: 'Account created',
  noResults: 'No records match your filters',
  readOnly: 'Read-only partner view',
  current: 'Current',
  locked: 'Locked',
  print: 'Print',
  actions: 'Actions',
  delete: 'Delete',
  edit: 'Edit',
  add: 'Add',
  cancel: 'Cancel',
  confirm: 'Confirm',
  total: 'Total',
  share: 'Share',
  statementFor: 'Statement for',
  sumShares: 'Sum of six shares',
  difference: 'Difference',
  recentActivity: 'Recent activity',
  quickActions: 'Quick actions',
  highestArrears: 'Highest arrears',
  leaseExpiry: 'Lease expiry',
  language: 'Language',
  theme: 'Theme',
  publicNote: 'Applicants can view vacant shops and submit rental requests.',
  backendNote: 'Later, replace the sample data functions with Django REST API calls.',
  notAvailable: 'This shop is not available for request.',
  selectShop: 'Select a shop',
  paymentHistory: 'Payment history',
  activeLease: 'Active lease',
  requestStatus: 'Request status',
  noRequest: 'No request yet',
  noPayment: 'No payment yet',
  amountDue: 'Amount due',
  paidThisMonth: 'Paid this month',
  remaining: 'Remaining',
  welcome: 'Welcome',
  signInTitle: 'Sign in to your portal',
  registerTitle: 'Create applicant account',
  role: 'Role',
  save: 'Save',
  dragHint: 'Drag cards between columns to update status.',
  totalCollected: 'Total collected',
  sixWaySplit: 'Six-way split',
  remainderRule: 'Remainder up to 5 AFN rotates between partners.',
  shopCount: 'shops',
  matching: 'matching',
  view: 'View',
  apply: 'Apply',
  shopDetails: 'Shop details',
  renterDetails: 'Renter details',
  requestDetails: 'Request details',
  startDate: 'Start date',
  endDate: 'End date',
  decisionNote: 'Decision note',
  createLease: 'Create lease',
  rejectRequest: 'Reject request',
  paymentAmount: 'Payment amount',
  reversalReason: 'Reversal reason',
  closeMonthConfirm: 'Close this month and lock partner shares?',
  undo: 'Undo',
  copied: 'Exported',
  noActiveLease: 'No active lease is linked to your account.',
  sampleLogin: 'Use demo login or create a sample applicant account.'
}

const PS = {
  brand: 'نامدار مارکټ',
  full: 'د نامدار سوداګریز مارکټ د مدیریت سیسټم',
  place: 'ځاځي اریوب، پکتیا',
  sample: 'بېلګه معلومات — سرور لا نه دی نښلول شوی',
  market: 'مارکټ',
  login: 'ننوتل',
  register: 'نوم لیکنه',
  logout: 'وتل',
  dashboard: 'ډشبورډ',
  shops: 'دوکانونه',
  requests: 'غوښتنلیکونه',
  renters: 'کرایه داران',
  ledger: 'د کرایې دفتر',
  maintenance: 'ساتنه',
  partner: 'د شریک پورټال',
  renter: 'د کرایه دار پورټال',
  available: 'خالي',
  reserved: 'ځانګړی شوی',
  rented: 'کرایه شوی',
  maintenanceStatus: 'تر ترمیم لاندې',
  all: 'ټول',
  search: 'دوکان، کرایه دار یا کاروبار ولټوئ…',
  block: 'بلاک',
  status: 'حالت',
  sort: 'ترتیب',
  number: 'د دوکان شمېره',
  rentLow: 'کرایه لږه → زیاته',
  rentHigh: 'کرایه زیاته → لږه',
  sizeLarge: 'لویه کچه',
  tileSize: 'د خانې کچه',
  density: 'ګڼوالی',
  compact: 'کم ځای',
  comfortable: 'مناسب',
  spacious: 'پراخ',
  colorBy: 'رنګ له مخې',
  collection: 'راټولونه',
  rentLevel: 'د کرایې کچه',
  labels: 'شمېرې',
  lanes: 'کوڅې',
  heat: 'سلنه',
  glow: 'ځلا',
  selectMode: 'غوره کول',
  reset: 'بیا تنظیم',
  randomize: 'بدلون',
  export: 'CSV صادرول',
  saveView: 'لیدنه خوندي کړئ',
  savedViews: 'خوندي لیدنې',
  viewName: 'د لیدنې نوم',
  selected: 'غوره شوي',
  clear: 'پاکول',
  details: 'تفصیل',
  close: 'بندول',
  requestShop: 'دا دوکان غوښتنه کړئ',
  recordPayment: 'نقدي تادیه ثبت کړئ',
  editStatus: 'حالت بدل کړئ',
  monthlyRent: 'میاشتنۍ کرایه',
  deposit: 'ضمانتي پیسې',
  size: 'کچه',
  trade: 'کاروبار',
  lane: 'کوڅه',
  renterName: 'کرایه دار',
  lease: 'تړون',
  noLease: 'فعال تړون نشته',
  totalShops: 'ټول دوکانونه',
  occupancy: 'د ډکوالي کچه',
  collected: 'روانې میاشتې راټولونه',
  collectionRate: 'د راټولونې کچه',
  arrears: 'ټوله بقایا',
  due: 'د تادیې وړ',
  paid: 'تادیه شوی',
  balance: 'پاتې',
  month: 'میاشت',
  amount: 'اندازه',
  date: 'نېټه',
  note: 'یادښت',
  receipt: 'رسید',
  reverse: 'بیرته اړول',
  closeMonth: 'میاشت بنده کړئ',
  monthClosed: 'میاشت بنده شوه',
  partnerShare: 'د شریک برخه',
  statements: 'حسابونه',
  approve: 'منل',
  reject: 'ردول',
  pending: 'په تمه',
  approved: 'منظور شوی',
  rejected: 'رد شوی',
  addRenter: 'کرایه دار زیات کړئ',
  editRenter: 'کرایه دار سم کړئ',
  name: 'نوم',
  email: 'بریښنالیک',
  phone: 'تلیفون',
  nationalId: 'د تذکرې شمېره',
  address: 'پته',
  guarantor: 'ضامن',
  password: 'پټنوم',
  createAccount: 'حساب جوړ کړئ',
  demoAccounts: 'بېلګه حسابونه',
  manager: 'مدیر',
  applicant: 'غوښتونکی / کرایه دار',
  business: 'د کاروبار نوم',
  message: 'پیغام',
  submitRequest: 'غوښتنلیک وسپارئ',
  myRequests: 'زما غوښتنلیکونه',
  myLease: 'زما تړون',
  myPayments: 'زما تادیات',
  newMaintenance: 'د ساتنې نوې غوښتنه',
  title: 'سرلیک',
  description: 'تشریح',
  priority: 'لومړیتوب',
  open: 'پرانیستی',
  progress: 'روان کار',
  resolved: 'بشپړ شوی',
  high: 'لوړ',
  medium: 'منځنی',
  low: 'ټیټ',
  cashOnly: 'کرایه یوازې نقدي ده. مدیر یې ثبتوي. آنلاین تادیه نشته.',
  required: 'اړین',
  saved: 'خوندي شو',
  deleted: 'ړنګ شو',
  undone: 'بدلون بیرته شو',
  requestSent: 'غوښتنلیک وسپارل شو',
  paymentSaved: 'نقدي تادیه ثبت شوه او رسید چمتو شو',
  reversed: 'تادیه بیرته واړول شوه',
  approvedLease: 'غوښتنلیک منظور او تړون جوړ شو',
  rejectedRequest: 'غوښتنلیک رد شو',
  maintenanceSaved: 'د ساتنې غوښتنه خوندي شوه',
  loginFailed: 'بریښنالیک یا پټنوم ناسم دی',
  accountCreated: 'حساب جوړ شو',
  noResults: 'هیڅ ثبت ونه موندل شو',
  readOnly: 'د شریک یوازې لوستلو بڼه',
  current: 'روان',
  locked: 'قلف',
  print: 'چاپ',
  actions: 'چارې',
  delete: 'ړنګول',
  edit: 'سمول',
  add: 'زیاتول',
  cancel: 'لغوه',
  confirm: 'تایید',
  total: 'ټول',
  share: 'برخه',
  partner: 'شریک',
  statementFor: 'حساب د',
  sumShares: 'د شپږو برخو مجموعه',
  difference: 'توپیر',
  recentActivity: 'وروستۍ چارې',
  quickActions: 'چټکې چارې',
  highestArrears: 'زیاته بقایا',
  leaseExpiry: 'د تړون پای',
  language: 'ژبه',
  theme: 'بڼه',
  publicNote: 'غوښتونکي خالي دوکانونه لیدلی او غوښتنلیک سپارلی شي.',
  backendNote: 'وروسته به دا بېلګه معلومات د Django REST API سره بدل شي.',
  notAvailable: 'دا دوکان د غوښتنې لپاره خالي نه دی.',
  selectShop: 'دوکان غوره کړئ',
  paymentHistory: 'د تادیاتو تاریخ',
  activeLease: 'فعال تړون',
  requestStatus: 'د غوښتنلیک حالت',
  noRequest: 'لا غوښتنلیک نشته',
  noPayment: 'لا تادیه نشته',
  amountDue: 'د تادیې وړ اندازه',
  paidThisMonth: 'روانه میاشت تادیه',
  remaining: 'پاتې',
  welcome: 'ښه راغلاست',
  signInTitle: 'خپل پورټال ته ننوځئ',
  registerTitle: 'د غوښتونکي حساب جوړ کړئ',
  role: 'رول',
  save: 'خوندي کول',
  dragHint: 'کارتونه د حالت بدلولو لپاره بلې څانګې ته راکش کړئ.',
  totalCollected: 'ټوله راټولونه',
  sixWaySplit: 'شپږ برخې',
  remainderRule: 'تر ۵ افغانیو پاتې پیسې د شریکانو ترمنځ ګرځي.',
  shopCount: 'دوکانونه',
  matching: 'سمون',
  view: 'کتل',
  apply: 'غوښتنه',
  shopDetails: 'د دوکان تفصیل',
  renterDetails: 'د کرایه دار تفصیل',
  requestDetails: 'د غوښتنلیک تفصیل',
  startDate: 'د پیل نېټه',
  endDate: 'د پای نېټه',
  decisionNote: 'د پریکړې یادښت',
  createLease: 'تړون جوړ کړئ',
  rejectRequest: 'غوښتنلیک رد کړئ',
  paymentAmount: 'د تادیې اندازه',
  reversalReason: 'د بیرته اړولو دلیل',
  closeMonthConfirm: 'دا میاشت بنده شي او برخې قلف شي؟',
  undo: 'بیرته',
  copied: 'صادر شو',
  noActiveLease: 'ستاسو له حساب سره فعال تړون نشته.',
  sampleLogin: 'بېلګه ننوتل وکاروئ یا نوی حساب جوړ کړئ.'
}

const DEFAULT_FILTERS = {
  query: '',
  status: 'all',
  block: 'all',
  sort: 'number',
  tileSize: 82,
  density: 'comfortable',
  colorBy: 'status',
  labels: true,
  lanes: true,
  heat: true,
  glow: 10,
  selectMode: false
}

function cx(...items) {
  return items.filter(Boolean).join(' ')
}

function statusText(status, L) {
  if (status === 'maintenance') return L.maintenanceStatus
  return L[status] || status
}

function loadDb() {
  try {
    const raw = localStorage.getItem(DB_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed?.shops?.length === 150) return parsed
    }
  } catch {
    // ignore
  }
  return buildSeed()
}

function loadSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
  } catch {
    return null
  }
}

function homeFor(role) {
  if (role === 'manager') return 'dashboard'
  if (role === 'partner') return 'partner'
  if (role === 'renter') return 'renter'
  return 'market'
}

function Pill({ status, L }) {
  const meta = STATUS_META[status] || { color: 'rgb(var(--muted))' }
  return (
    <span className="pill" style={{ '--tone': meta.color }}>
      <span>{meta.icon || '●'}</span>
      {statusText(status, L)}
    </span>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      {children}
    </label>
  )
}

function Modal({ title, onClose, children, wide = false }) {
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={onClose} />
      <div className={cx('panel relative max-h-[92vh] w-full overflow-y-auto p-5 fade-in', wide ? 'max-w-3xl' : 'max-w-lg')}>
        <div className="mb-5 flex items-start justify-between gap-4">
          <h2 className="text-xl font-extrabold">{title}</h2>
          <button className="btn btn-sm btn-ghost" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

function Drawer({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" onClick={onClose} />
      <aside className="panel absolute inset-y-0 end-0 w-full max-w-[470px] overflow-y-auto rounded-none border-y-0 border-e-0 p-5 fade-in">
        <div className="mb-5 flex items-start justify-between gap-4">
          <h2 className="text-xl font-extrabold">{title}</h2>
          <button className="btn btn-sm btn-ghost" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        {children}
      </aside>
    </div>
  )
}

function Stat({ icon: Icon, label, value, tone = 'lapis', sub }) {
  return (
    <div className="panel p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="label">{label}</p>
          <p className="font-display text-2xl font-extrabold" style={{ color: `rgb(var(--${tone}))` }}>
            {value}
          </p>
          {sub && <p className="mt-1 text-xs text-[rgb(var(--muted))]">{sub}</p>}
        </div>
        <span className="grid h-10 w-10 place-items-center rounded-2xl" style={{ background: `rgb(var(--${tone}) / .15)`, color: `rgb(var(--${tone}))` }}>
          <Icon size={19} />
        </span>
      </div>
    </div>
  )
}

function Bars({ data, lang, money = true }) {
  const max = Math.max(...data.map((d) => d.value), 1)

  return (
    <div className="flex h-52 items-end gap-3">
      {data.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex h-40 w-full items-end rounded-xl bg-[rgb(var(--bg2))] p-1">
            <div
              className="w-full rounded-lg"
              style={{
                height: `${Math.max(6, (d.value / max) * 100)}%`,
                background: d.color || 'linear-gradient(rgb(var(--lapis)), rgb(var(--turquoise)))'
              }}
              title={money ? formatMoney(d.value, lang) : formatNum(d.value, lang)}
            />
          </div>
          <span className="text-[10px] font-bold text-[rgb(var(--faint))]">{d.label}</span>
        </div>
      ))}
    </div>
  )
}

function Donut({ counts, L }) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0)
  const rentedPct = total ? Math.round((counts.rented / total) * 100) : 0
  let start = 0

  const stops = STATUSES.map((status) => {
    const pct = total ? (counts[status] / total) * 100 : 0
    const end = start + pct
    const stop = `${STATUS_META[status].color} ${start}% ${end}%`
    start = end
    return stop
  }).join(', ')

  return (
    <div className="grid place-items-center gap-4 sm:grid-cols-[180px_1fr]">
      <div className="relative grid h-44 w-44 place-items-center rounded-full" style={{ background: `conic-gradient(${stops})` }}>
        <div className="grid h-28 w-28 place-items-center rounded-full bg-[rgb(var(--surface))] text-center">
          <div>
            <p className="font-display text-3xl font-extrabold">{rentedPct}%</p>
            <p className="text-[10px] font-bold text-[rgb(var(--faint))]">{L.occupancy}</p>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {STATUSES.map((status) => (
          <div key={status} className="flex items-center justify-between gap-4">
            <Pill status={status} L={L} />
            <b>{counts[status]}</b>
          </div>
        ))}
      </div>
    </div>
  )
}

function Empty({ text }) {
  return (
    <div className="panel p-10 text-center text-sm text-[rgb(var(--muted))]">
      {text}
    </div>
  )
}

function MiniTable({ columns, rows, empty }) {
  if (!rows.length) return <Empty text={empty} />

  return (
    <div className="panel overflow-x-auto">
      <table className="table min-w-[720px]">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id || i}>
              {columns.map((col) => (
                <td key={col.key}>{col.render ? col.render(row) : row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function App() {
  const [db, setDb] = useState(loadDb)
  const [session, setSession] = useState(loadSession)
  const [view, setView] = useState(() => homeFor(loadSession()?.role))
  const [lang, setLang] = useState(localStorage.getItem('namdar.lang') || 'en')
  const [theme, setTheme] = useState(localStorage.getItem('namdar.theme') || 'night')
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [viewName, setViewName] = useState('')
  const [selectedShopId, setSelectedShopId] = useState(null)
  const [selectedIds, setSelectedIds] = useState([])
  const [modal, setModal] = useState(null)
  const [toast, setToast] = useState(null)
  const [undoStack, setUndoStack] = useState([])
  const [month, setMonth] = useState(CURRENT_MONTH)
  const [dragId, setDragId] = useState(null)

  const L = lang === 'ps' ? PS : EN

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ps' ? 'rtl' : 'ltr'
    localStorage.setItem('namdar.lang', lang)
  }, [lang])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('namdar.theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem(DB_KEY, JSON.stringify(db))
  }, [db])

  useEffect(() => {
    if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    else localStorage.removeItem(SESSION_KEY)
  }, [session])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 4200)
    return () => clearTimeout(timer)
  }, [toast])

  const shopMap = useMemo(() => new Map(db.shops.map((s) => [s.id, s])), [db.shops])
  const renterMap = useMemo(() => new Map(db.renters.map((r) => [r.id, r])), [db.renters])
  const leaseByShop = useMemo(() => {
    const map = new Map()
    db.leases.forEach((lease) => {
      if (lease.status === 'active') map.set(lease.shopId, lease)
    })
    return map
  }, [db.leases])

  const counts = useMemo(() => {
    const result = { available: 0, reserved: 0, rented: 0, maintenance: 0 }
    db.shops.forEach((shop) => {
      result[shop.status] += 1
    })
    return result
  }, [db.shops])

  function paidForLease(leaseId, targetMonth) {
    return db.payments
      .filter((p) => p.leaseId === leaseId && p.month === targetMonth && !p.reversed)
      .reduce((sum, p) => sum + p.amount, 0)
  }

  function collected(targetMonth) {
    return db.payments
      .filter((p) => p.month === targetMonth && !p.reversed)
      .reduce((sum, p) => sum + p.amount, 0)
  }

  function ledgerRows(targetMonth) {
    return db.leases
      .filter((lease) => leaseCovers(lease, targetMonth))
      .map((lease) => {
        const paid = paidForLease(lease.id, targetMonth)
        const due = lease.monthlyRent
        const balance = Math.max(0, due - paid)
        const status = paid >= due ? 'paid' : paid > 0 ? 'partial' : targetMonth < CURRENT_MONTH ? 'overdue' : 'unpaid'

        return {
          id: `${lease.id}-${targetMonth}`,
          lease,
          shop: shopMap.get(lease.shopId),
          renter: renterMap.get(lease.renterId),
          due,
          paid,
          balance,
          status
        }
      })
  }

  const currentLedger = ledgerRows(month)
  const dueTotal = currentLedger.reduce((sum, row) => sum + row.due, 0)
  const paidTotal = currentLedger.reduce((sum, row) => sum + row.paid, 0)
  const arrearsTotal = lastMonths(6).reduce((sum, m) => {
    return sum + ledgerRows(m).reduce((s, row) => s + row.balance, 0)
  }, 0)
  const collectionRate = dueTotal ? Math.round((paidTotal / dueTotal) * 100) : 0
  const occupancy = Math.round((counts.rented / db.shops.length) * 100)

  const shopCollection = useMemo(() => {
    const map = new Map()
    currentLedger.forEach((row) => {
      map.set(row.shop.id, row.due ? row.paid / row.due : 0)
    })
    return map
  }, [currentLedger])

  const filteredShops = useMemo(() => {
    const q = filters.query.trim().toLowerCase()

    const rows = db.shops.filter((shop) => {
      const lease = leaseByShop.get(shop.id)
      const renter = lease ? renterMap.get(lease.renterId) : null
      const text = `${shop.id} ${shop.block} ${shop.category} ${renter?.name || ''}`.toLowerCase()

      return (
        (!q || text.includes(q)) &&
        (filters.status === 'all' || shop.status === filters.status) &&
        (filters.block === 'all' || shop.block === filters.block)
      )
    })

    const sorters = {
      number: (a, b) => a.number - b.number,
      rentLow: (a, b) => a.rent - b.rent,
      rentHigh: (a, b) => b.rent - a.rent,
      sizeLarge: (a, b) => b.size - a.size
    }

    return [...rows].sort(sorters[filters.sort])
  }, [db.shops, filters, leaseByShop, renterMap])

  const selectedShop = selectedShopId ? shopMap.get(selectedShopId) : null
  const selectedLease = selectedShop ? leaseByShop.get(selectedShop.id) : null
  const selectedRenter = selectedLease ? renterMap.get(selectedLease.renterId) : null

  function notify(message, undo = false) {
    setToast({ message, undo })
  }

  function commit(message, updater, undoable = true) {
    if (undoable) setUndoStack((stack) => [{ db, message }, ...stack].slice(0, 8))
    setDb((prev) => updater(prev))
    notify(message, undoable)
  }

  function undo() {
    const last = undoStack[0]
    if (!last) return
    setDb(last.db)
    setUndoStack((stack) => stack.slice(1))
    notify(L.undone)
  }

  function resetDemo() {
    setDb(buildSeed())
    setSelectedIds([])
    setSelectedShopId(null)
    setUndoStack([])
    notify(L.saved)
  }

  function handleLogin(email, password) {
    const user = db.users.find(
      (u) => u.email.toLowerCase() === String(email).toLowerCase() && u.password === password
    )

    if (!user) {
      notify(L.loginFailed)
      return
    }

    const nextSession = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      renterId: user.renterId,
      partnerId: user.partnerId
    }

    setSession(nextSession)
    setView(homeFor(user.role))
    notify(`${L.welcome}, ${user.name}`)
  }

  function handleRegister(form) {
    const renterId = uid('R')
    const userId = uid('U')

    const renter = {
      id: renterId,
      name: form.name,
      email: form.email,
      phone: form.phone,
      nationalId: form.nationalId || '',
      address: form.address || '',
      guarantor: '',
      createdAt: TODAY
    }

    const user = {
      id: userId,
      name: form.name,
      email: form.email,
      password: form.password,
      role: 'renter',
      renterId,
      verified: true
    }

    commit(L.accountCreated, (prev) => ({
      ...prev,
      renters: [renter, ...prev.renters],
      users: [user, ...prev.users]
    }))

    setSession({
      id: userId,
      name: form.name,
      email: form.email,
      role: 'renter',
      renterId
    })
    setView('renter')
  }

  function logout() {
    setSession(null)
    setView('market')
  }

  function updateFilter(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS)
    setSelectedIds([])
  }

  function randomizeControls() {
    setFilters((prev) => ({
      ...prev,
      status: ['all', ...STATUSES][Math.floor(Math.random() * 5)],
      block: ['all', ...BLOCKS][Math.floor(Math.random() * 7)],
      sort: ['number', 'rentLow', 'rentHigh', 'sizeLarge'][Math.floor(Math.random() * 4)],
      tileSize: 62 + Math.floor(Math.random() * 48),
      colorBy: ['status', 'collection', 'rent'][Math.floor(Math.random() * 3)],
      glow: Math.floor(Math.random() * 24)
    }))
  }

  function saveCurrentView() {
    const name = viewName.trim() || `${L.view} ${db.savedViews.length + 1}`
    commit(L.saved, (prev) => ({
      ...prev,
      savedViews: [
        ...prev.savedViews.filter((v) => v.name !== name),
        { id: uid('V'), name, filters }
      ]
    }), false)
    setViewName('')
  }

  function exportShops() {
    downloadCSV('namdar-shops.csv', [
      ['Shop', 'Block', 'Lane', 'Status', 'Size', 'Rent', 'Category'],
      ...filteredShops.map((s) => [s.id, s.block, s.lane, s.status, s.size, s.rent, s.category])
    ])
    notify(L.copied)
  }

  function toggleShopSelection(id) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  function bulkStatus(status) {
    commit(L.saved, (prev) => ({
      ...prev,
      shops: prev.shops.map((shop) =>
        selectedIds.includes(shop.id) ? { ...shop, status } : shop
      )
    }))
    setSelectedIds([])
  }

  function openRequest(shop) {
    if (shop.status !== 'available') {
      notify(L.notAvailable)
      return
    }

    if (!session) {
      setView('login')
      return
    }

    if (session.role !== 'renter') {
      setView('renter')
      return
    }

    setModal({ type: 'request', shop })
  }

  function submitRequest(form) {
    const shop = modal.shop
    const applicantId = session.renterId || db.renters[0].id

    commit(L.requestSent, (prev) => ({
      ...prev,
      requests: [
        {
          id: uid('Q'),
          applicantId,
          shopId: shop.id,
          business: form.business,
          message: form.message,
          requestedAt: TODAY,
          status: 'pending',
          decisionNote: ''
        },
        ...prev.requests
      ]
    }), false)

    setModal(null)
    setSelectedShopId(null)
    setView(session?.role === 'manager' ? 'requests' : 'renter')
  }

  function decideRequest(form) {
    const request = modal.request
    const action = modal.action

    if (action === 'reject') {
      commit(L.rejectedRequest, (prev) => ({
        ...prev,
        requests: prev.requests.map((r) =>
          r.id === request.id
            ? { ...r, status: 'rejected', decisionNote: form.decisionNote }
            : r
        )
      }))
      setModal(null)
      return
    }

    const shop = shopMap.get(request.shopId)
    const lease = {
      id: uid('L'),
      shopId: request.shopId,
      renterId: request.applicantId,
      start: form.start,
      end: form.end,
      monthlyRent: Number(form.monthlyRent),
      deposit: Number(form.deposit),
      status: 'active',
      createdAt: TODAY
    }

    commit(L.approvedLease, (prev) => ({
      ...prev,
      requests: prev.requests.map((r) =>
        r.id === request.id
          ? { ...r, status: 'approved', decisionNote: form.decisionNote }
          : r
      ),
      leases: [lease, ...prev.leases],
      shops: prev.shops.map((s) =>
        s.id === shop.id ? { ...s, status: 'rented' } : s
      )
    }))

    setModal(null)
  }

  function recordPayment(form) {
    const lease = db.leases.find((l) => l.id === modal.leaseId)
    const receiptNo = `RC-${4200 + db.payments.length + 1}`

    commit(L.paymentSaved, (prev) => ({
      ...prev,
      payments: [
        {
          id: uid('P'),
          leaseId: lease.id,
          shopId: lease.shopId,
          renterId: lease.renterId,
          month: modal.month,
          amount: Number(form.amount),
          date: form.date,
          method: 'cash',
          receiptNo,
          enteredBy: session?.id || 'U-manager',
          reversed: false,
          reversalNote: '',
          note: form.note
        },
        ...prev.payments
      ],
      audit: [
        {
          id: uid('A'),
          userId: session?.id || 'U-manager',
          action: 'payment.record',
          entity: receiptNo,
          at: new Date().toISOString()
        },
        ...prev.audit
      ]
    }), false)

    setModal(null)
  }

  function reversePayment(payment) {
    const reason = window.prompt(L.reversalReason, 'Correction')
    if (reason === null) return

    commit(L.reversed, (prev) => ({
      ...prev,
      payments: prev.payments.map((p) =>
        p.id === payment.id ? { ...p, reversed: true, reversalNote: reason } : p
      )
    }))
  }

  function closeMonth() {
    if (db.closings.some((c) => c.month === month)) return

    if (!window.confirm(L.closeMonthConfirm)) return

    const total = collected(month)
    const amounts = splitSix(total, month)

    commit(L.monthClosed, (prev) => ({
      ...prev,
      closings: [
        {
          id: uid('C'),
          month,
          total,
          closedAt: new Date().toISOString(),
          closedBy: session?.id || 'U-manager',
          locked: true,
          shares: prev.partners.map((partner, i) => ({
            partnerId: partner.id,
            amount: amounts[i]
          }))
        },
        ...prev.closings
      ]
    }), false)
  }

  function saveRenter(form) {
    const editing = modal.renter
    const renter = {
      id: editing?.id || uid('R'),
      name: form.name,
      email: form.email,
      phone: form.phone,
      nationalId: form.nationalId,
      address: form.address,
      guarantor: form.guarantor,
      createdAt: editing?.createdAt || TODAY
    }

    commit(L.saved, (prev) => ({
      ...prev,
      renters: editing
        ? prev.renters.map((r) => (r.id === editing.id ? renter : r))
        : [renter, ...prev.renters]
    }))

    setModal(null)
  }

  function deleteRenter(renter) {
    commit(L.deleted, (prev) => ({
      ...prev,
      renters: prev.renters.filter((r) => r.id !== renter.id)
    }))
  }

  function saveMaintenance(form) {
    const renterId = session?.role === 'renter' ? session.renterId : form.renterId
    const lease = db.leases.find((l) => l.renterId === renterId && l.status === 'active')

    commit(L.maintenanceSaved, (prev) => ({
      ...prev,
      maintenance: [
        {
          id: uid('M'),
          shopId: form.shopId || lease?.shopId || db.shops[0].id,
          renterId,
          title: form.title,
          description: form.description,
          priority: form.priority,
          status: 'open',
          createdAt: TODAY
        },
        ...prev.maintenance
      ]
    }))

    setModal(null)
  }

  function moveMaintenance(id, status, beforeId = null) {
    commit(L.saved, (prev) => {
      const list = [...prev.maintenance]
      const from = list.findIndex((m) => m.id === id)
      if (from < 0) return prev

      const [item] = list.splice(from, 1)
      const updated = { ...item, status }
      const target = beforeId ? list.findIndex((m) => m.id === beforeId) : -1

      if (target >= 0) list.splice(target, 0, updated)
      else list.push(updated)

      return { ...prev, maintenance: list }
    })
  }

  function deleteMaintenance(id) {
    commit(L.deleted, (prev) => ({
      ...prev,
      maintenance: prev.maintenance.filter((m) => m.id !== id)
    }))
  }

  function handleModalSubmit(e) {
    e.preventDefault()
    const form = Object.fromEntries(new FormData(e.currentTarget))

    if (modal.type === 'request') submitRequest(form)
    if (modal.type === 'decision') decideRequest(form)
    if (modal.type === 'payment') recordPayment(form)
    if (modal.type === 'renter') saveRenter(form)
    if (modal.type === 'maintenance') saveMaintenance(form)
  }

  function shopTone(shop) {
    if (filters.colorBy === 'status') return STATUS_META[shop.status].color

    if (filters.colorBy === 'collection') {
      const value = shopCollection.get(shop.id)
      if (value == null) return 'rgb(var(--faint))'
      if (value >= 1) return '#57D98A'
      if (value >= 0.5) return '#FFB020'
      if (value > 0) return '#D98A5B'
      return '#FF4D5E'
    }

    if (shop.rent > 24000) return '#A97BFF'
    if (shop.rent > 18000) return '#3B72FF'
    if (shop.rent > 12000) return '#22C7C0'
    return '#57D98A'
  }

  const navItems = session?.role === 'manager'
    ? [
        ['dashboard', LayoutDashboard, L.dashboard],
        ['market', Store, L.shops],
        ['requests', FileText, L.requests],
        ['renters', Users, L.renters],
        ['ledger', Wallet, L.ledger],
        ['maintenance', Wrench, L.maintenance]
      ]
    : session?.role === 'partner'
      ? [
          ['partner', Landmark, L.partner],
          ['market', Store, L.market]
        ]
      : session?.role === 'renter'
        ? [
            ['renter', Home, L.renter],
            ['market', Store, L.market],
            ['maintenance', Wrench, L.maintenance]
          ]
        : [
            ['market', Store, L.market],
            ['login', LogIn, L.login],
            ['register', UserPlus, L.register]
          ]

  const currentRenterId = session?.renterId || db.renters[0]?.id
  const currentRenter = renterMap.get(currentRenterId)
  const currentRenterLease = db.leases.find((l) => l.renterId === currentRenterId && l.status === 'active')
  const currentRenterShop = currentRenterLease ? shopMap.get(currentRenterLease.shopId) : null
  const currentRenterRows = currentRenterLease ? ledgerRows(month).filter((row) => row.lease.id === currentRenterLease.id) : []
  const currentPartnerId = session?.partnerId || db.partners[0].id
  const currentPartner = db.partners.find((p) => p.id === currentPartnerId)
  const currentClosing = db.closings.find((c) => c.month === month)
  const currentShares = currentClosing
    ? currentClosing.shares
    : splitSix(collected(month), month).map((amount, i) => ({
        partnerId: db.partners[i].id,
        amount
      }))

  return (
    <div className="min-h-screen">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[rgb(var(--line))] bg-[rgb(var(--bg)/.86)] backdrop-blur-2xl">
        <div className="mx-auto flex min-h-16 max-w-[1500px] items-center gap-3 px-4">
          <button className="flex items-center gap-3" onClick={() => setView('market')}>
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-[rgb(var(--lapis))] to-[rgb(var(--violet))] text-white">
              <Store size={20} />
            </span>
            <span className="hidden text-start sm:block">
              <span className="block font-display text-sm font-extrabold">{L.brand}</span>
              <span className="block text-[10px] text-[rgb(var(--faint))]">{L.place}</span>
            </span>
          </button>

          <nav className="hidden flex-1 items-center gap-1 overflow-x-auto lg:flex">
            {navItems.map(([key, Icon, label]) => (
              <button
                key={key}
                className={cx('navlink', view === key && 'navlink-on')}
                onClick={() => setView(key)}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </nav>

          <div className="flex-1 lg:hidden" />

          <button className="btn btn-sm" onClick={() => setLang(lang === 'en' ? 'ps' : 'en')}>
            <Languages size={15} />
            {lang === 'en' ? 'پښتو' : 'EN'}
          </button>

          <button className="btn btn-sm" onClick={() => setTheme(theme === 'night' ? 'day' : 'night')}>
            {theme === 'night' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {session ? (
            <button className="btn btn-sm btn-danger" onClick={logout}>
              <LogOut size={15} />
              <span className="hidden sm:inline">{L.logout}</span>
            </button>
          ) : (
            <button className="btn btn-sm btn-primary" onClick={() => setView('login')}>
              <LogIn size={15} />
              <span className="hidden sm:inline">{L.login}</span>
            </button>
          )}
        </div>

        <div className="flex gap-1 overflow-x-auto border-t border-[rgb(var(--line))] px-3 py-2 lg:hidden">
          {navItems.map(([key, Icon, label]) => (
            <button
              key={key}
              className={cx('navlink shrink-0', view === key && 'navlink-on')}
              onClick={() => setView(key)}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-4 pb-16 pt-28 lg:pt-24">
        {view === 'market' && (
          <MarketPage
            L={L}
            lang={lang}
            counts={counts}
            occupancy={occupancy}
            paidTotal={paidTotal}
            collectionRate={collectionRate}
            arrearsTotal={arrearsTotal}
            filters={filters}
            updateFilter={updateFilter}
            resetFilters={resetFilters}
            randomizeControls={randomizeControls}
            exportShops={exportShops}
            filteredShops={filteredShops}
            shopCollection={shopCollection}
            shopTone={shopTone}
            selectedIds={selectedIds}
            toggleShopSelection={toggleShopSelection}
            setSelectedShopId={setSelectedShopId}
            bulkStatus={bulkStatus}
            setSelectedIds={setSelectedIds}
            db={db}
            viewName={viewName}
            setViewName={setViewName}
            saveCurrentView={saveCurrentView}
            setFilters={setFilters}
            commit={commit}
            session={session}
            setView={setView}
            resetDemo={resetDemo}
          />
        )}

        {view === 'login' && (
          <LoginPage L={L} handleLogin={handleLogin} setView={setView} />
        )}

        {view === 'register' && (
          <RegisterPage L={L} handleRegister={handleRegister} setView={setView} />
        )}

        {view === 'dashboard' && session?.role === 'manager' && (
          <ManagerDashboard
            L={L}
            lang={lang}
            counts={counts}
            occupancy={occupancy}
            paidTotal={paidTotal}
            dueTotal={dueTotal}
            collectionRate={collectionRate}
            arrearsTotal={arrearsTotal}
            db={db}
            collected={collected}
            ledgerRows={ledgerRows}
            setView={setView}
            setMonth={setMonth}
            month={month}
          />
        )}

        {view === 'requests' && session?.role === 'manager' && (
          <RequestsPage
            L={L}
            lang={lang}
            db={db}
            shopMap={shopMap}
            renterMap={renterMap}
            setModal={setModal}
          />
        )}

        {view === 'renters' && session?.role === 'manager' && (
          <RentersPage
            L={L}
            db={db}
            setModal={setModal}
            deleteRenter={deleteRenter}
          />
        )}

        {view === 'ledger' && session?.role === 'manager' && (
          <LedgerPage
            L={L}
            lang={lang}
            db={db}
            month={month}
            setMonth={setMonth}
            rows={currentLedger}
            dueTotal={dueTotal}
            paidTotal={paidTotal}
            collectionRate={collectionRate}
            setModal={setModal}
            reversePayment={reversePayment}
            closeMonth={closeMonth}
            currentClosing={currentClosing}
          />
        )}

        {view === 'maintenance' && (
          <MaintenancePage
            L={L}
            db={db}
            session={session}
            renterMap={renterMap}
            shopMap={shopMap}
            setModal={setModal}
            dragId={dragId}
            setDragId={setDragId}
            moveMaintenance={moveMaintenance}
            deleteMaintenance={deleteMaintenance}
          />
        )}

        {view === 'renter' && session?.role === 'renter' && (
          <RenterPage
            L={L}
            lang={lang}
            db={db}
            month={month}
            currentRenter={currentRenter}
            currentRenterLease={currentRenterLease}
            currentRenterShop={currentRenterShop}
            currentRenterRows={currentRenterRows}
            openRequest={openRequest}
            setModal={setModal}
            setView={setView}
          />
        )}

        {view === 'partner' && session?.role === 'partner' && (
          <PartnerPage
            L={L}
            lang={lang}
            db={db}
            month={month}
            setMonth={setMonth}
            currentPartner={currentPartner}
            currentShares={currentShares}
            currentClosing={currentClosing}
            collected={collected}
          />
        )}
      </main>

      {selectedShop && (
        <ShopDrawer
          L={L}
          lang={lang}
          shop={selectedShop}
          lease={selectedLease}
          renter={selectedRenter}
          db={db}
          session={session}
          onClose={() => setSelectedShopId(null)}
          openRequest={openRequest}
          setModal={setModal}
          commit={commit}
          paidForLease={paidForLease}
          month={month}
        />
      )}

      {modal && (
        <FormModal
          modal={modal}
          L={L}
          lang={lang}
          db={db}
          shopMap={shopMap}
          renterMap={renterMap}
          onClose={() => setModal(null)}
          onSubmit={handleModalSubmit}
        />
      )}

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-[90] flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-[rgb(var(--line))] bg-[rgb(var(--surface))] px-4 py-3 shadow-2xl">
          <CheckCircle2 size={18} className="text-[rgb(var(--pistachio))]" />
          <span className="text-sm font-bold">{toast.message}</span>
          {toast.undo && (
            <button className="btn btn-sm" onClick={undo}>
              <Undo2 size={14} />
              {L.undo}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function MarketPage(props) {
  const {
    L,
    lang,
    counts,
    occupancy,
    paidTotal,
    collectionRate,
    arrearsTotal,
    filters,
    updateFilter,
    resetFilters,
    randomizeControls,
    exportShops,
    filteredShops,
    shopCollection,
    shopTone,
    selectedIds,
    toggleShopSelection,
    setSelectedShopId,
    bulkStatus,
    setSelectedIds,
    db,
    viewName,
    setViewName,
    saveCurrentView,
    setFilters,
    commit,
    session,
    setView,
    resetDemo
  } = props

  const gap = filters.density === 'compact' ? 6 : filters.density === 'spacious' ? 16 : 10

  return (
    <div className="space-y-6 fade-in">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <span className="chip chip-on mb-4">
            <ShieldCheck size={14} />
            {L.sample}
          </span>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight sm:text-6xl">
            {L.full}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[rgb(var(--muted))]">
            {L.publicNote} {L.cashOnly}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {!session && (
              <>
                <button className="btn btn-primary" onClick={() => setView('register')}>
                  <UserPlus size={16} />
                  {L.register}
                </button>
                <button className="btn" onClick={() => setView('login')}>
                  <LogIn size={16} />
                  {L.login}
                </button>
              </>
            )}
            <button className="btn" onClick={resetDemo}>
              <RotateCcw size={16} />
              {L.reset}
            </button>
          </div>
        </div>

        <div className="panel p-5">
          <div className="mb-4 flex items-center gap-2 text-sm font-bold text-[rgb(var(--muted))]">
            <MapPin size={16} />
            {L.place}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Stat icon={Store} label={L.totalShops} value={formatNum(150, lang)} />
            <Stat icon={LayoutDashboard} label={L.occupancy} value={`${formatNum(occupancy, lang)}%`} tone="turquoise" />
            <Stat icon={Wallet} label={L.collected} value={formatMoney(paidTotal, lang)} tone="saffron" />
            <Stat icon={AlertTriangle} label={L.arrears} value={formatMoney(arrearsTotal, lang)} tone="pom" />
          </div>
        </div>
      </section>

      <section className="panel p-4">
        <div className="mb-4 flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-[rgb(var(--saffron))]" />
          <h2 className="font-display text-lg font-extrabold">{L.shops}</h2>
          <span className="ms-auto text-xs font-bold text-[rgb(var(--faint))]">
            {formatNum(filteredShops.length, lang)} {L.matching}
          </span>
        </div>

        <div className="grid gap-3 lg:grid-cols-[1fr_150px_170px_150px]">
          <div className="relative">
            <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-[rgb(var(--faint))]" />
            <input
              className="input ps-9"
              value={filters.query}
              onChange={(e) => updateFilter('query', e.target.value)}
              placeholder={L.search}
            />
          </div>

          <select className="input" value={filters.block} onChange={(e) => updateFilter('block', e.target.value)}>
            <option value="all">{L.block}: {L.all}</option>
            {BLOCKS.map((b) => <option key={b} value={b}>{L.block} {b}</option>)}
          </select>

          <select className="input" value={filters.sort} onChange={(e) => updateFilter('sort', e.target.value)}>
            <option value="number">{L.number}</option>
            <option value="rentLow">{L.rentLow}</option>
            <option value="rentHigh">{L.rentHigh}</option>
            <option value="sizeLarge">{L.sizeLarge}</option>
          </select>

          <select className="input" value={filters.colorBy} onChange={(e) => updateFilter('colorBy', e.target.value)}>
            <option value="status">{L.colorBy}: {L.status}</option>
            <option value="collection">{L.colorBy}: {L.collection}</option>
            <option value="rent">{L.colorBy}: {L.rentLevel}</option>
          </select>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <button className={cx('chip', filters.status === 'all' && 'chip-on')} onClick={() => updateFilter('status', 'all')}>
            {L.all}
          </button>
          {STATUSES.map((status) => (
            <button key={status} className={cx('chip', filters.status === status && 'chip-on')} onClick={() => updateFilter('status', status)}>
              <span style={{ color: STATUS_META[status].color }}>●</span>
              {statusText(status, L)}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Field label={`${L.tileSize}: ${formatNum(filters.tileSize, lang)}`}>
            <input type="range" min="54" max="118" value={filters.tileSize} onChange={(e) => updateFilter('tileSize', Number(e.target.value))} className="w-full accent-[rgb(var(--lapis))]" />
          </Field>

          <Field label={`${L.glow}: ${formatNum(filters.glow, lang)}`}>
            <input type="range" min="0" max="28" value={filters.glow} onChange={(e) => updateFilter('glow', Number(e.target.value))} className="w-full accent-[rgb(var(--saffron))]" />
          </Field>

          <Field label={L.density}>
            <select className="input" value={filters.density} onChange={(e) => updateFilter('density', e.target.value)}>
              <option value="compact">{L.compact}</option>
              <option value="comfortable">{L.comfortable}</option>
              <option value="spacious">{L.spacious}</option>
            </select>
          </Field>

          <div className="flex flex-wrap items-end gap-2">
            <button className={cx('chip', filters.labels && 'chip-on')} onClick={() => updateFilter('labels', !filters.labels)}>{L.labels}</button>
            <button className={cx('chip', filters.lanes && 'chip-on')} onClick={() => updateFilter('lanes', !filters.lanes)}>{L.lanes}</button>
            <button className={cx('chip', filters.heat && 'chip-on')} onClick={() => updateFilter('heat', !filters.heat)}>{L.heat}</button>
            <button className={cx('chip', filters.selectMode && 'chip-on')} onClick={() => updateFilter('selectMode', !filters.selectMode)}>{L.selectMode}</button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button className="btn btn-sm" onClick={resetFilters}><RotateCcw size={14} />{L.reset}</button>
          <button className="btn btn-sm" onClick={randomizeControls}><Shuffle size={14} />{L.randomize}</button>
          <button className="btn btn-sm" onClick={exportShops}><Download size={14} />{L.export}</button>
          <input className="input max-w-[180px]" value={viewName} onChange={(e) => setViewName(e.target.value)} placeholder={L.viewName} />
          <button className="btn btn-sm btn-primary" onClick={saveCurrentView}><Save size={14} />{L.saveView}</button>
        </div>

        {!!db.savedViews.length && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="label mb-0">{L.savedViews}</span>
            {db.savedViews.map((saved) => (
              <span key={saved.id} className="chip">
                <button onClick={() => setFilters(saved.filters)}>{saved.name}</button>
                <button
                  onClick={() =>
                    commit(L.deleted, (prev) => ({
                      ...prev,
                      savedViews: prev.savedViews.filter((v) => v.id !== saved.id)
                    }))
                  }
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
      </section>

      {!!selectedIds.length && (
        <section className="panel flex flex-wrap items-center gap-2 p-3">
          <b className="text-sm">{formatNum(selectedIds.length, lang)} {L.selected}</b>
          <div className="flex-1" />
          {session?.role === 'manager' && (
            <>
              <button className="btn btn-sm" onClick={() => bulkStatus('available')}>{L.available}</button>
              <button className="btn btn-sm" onClick={() => bulkStatus('maintenance')}>{L.maintenanceStatus}</button>
            </>
          )}
          <button className="btn btn-sm" onClick={() => setSelectedIds([])}>{L.clear}</button>
        </section>
      )}

      <section className="space-y-5">
        {BLOCKS.map((block) => {
          const rows = filteredShops.filter((shop) => shop.block === block)
          if (!rows.length) return null

          return (
            <div key={block} className="panel2 p-4">
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-[rgb(var(--lapis))] to-[rgb(var(--turquoise))] font-display font-extrabold text-white">
                  {block}
                </span>
                <div>
                  <h3 className="font-display font-extrabold">{L.block} {block}</h3>
                  <p className="text-xs text-[rgb(var(--faint))]">
                    {formatNum(rows.length, lang)} {L.shopCount}
                  </p>
                </div>
              </div>

              <div
                className="grid"
                style={{
                  gap,
                  gridTemplateColumns: `repeat(auto-fill, minmax(${filters.tileSize}px, 1fr))`
                }}
              >
                {rows.map((shop, index) => {
                  const collection = shopCollection.get(shop.id)
                  const selected = selectedIds.includes(shop.id)

                  return (
                    <React.Fragment key={shop.id}>
                      {filters.lanes && index > 0 && index % 5 === 0 && (
                        <div className="col-span-full h-[2px] bg-[repeating-linear-gradient(90deg,rgb(var(--line))_0_8px,transparent_8px_18px)]" />
                      )}

                      <button
                        className="shop-tile"
                        data-selected={selected}
                        style={{
                          '--tone': shopTone(shop),
                          '--glow': filters.glow,
                          minHeight: filters.tileSize
                        }}
                        onClick={() => {
                          if (filters.selectMode) toggleShopSelection(shop.id)
                          else setSelectedShopId(shop.id)
                        }}
                      >
                        {filters.labels && (
                          <div className="relative z-10 flex items-start justify-between gap-1">
                            <b className="font-display text-sm">{shop.id}</b>
                            <span style={{ color: shopTone(shop) }}>●</span>
                          </div>
                        )}

                        <div className="relative z-10 mt-3">
                          <p className="truncate text-[10px] text-[rgb(var(--muted))]">{shop.category}</p>
                          <p className="mt-1 text-xs font-extrabold text-[rgb(var(--saffron))]">
                            {formatMoney(shop.rent, lang)}
                          </p>
                          {filters.heat && collection != null && (
                            <p className="mt-1 text-[10px] font-bold" style={{ color: shopTone(shop) }}>
                              {Math.round(collection * 100)}%
                            </p>
                          )}
                        </div>
                      </button>
                    </React.Fragment>
                  )
                })}
              </div>
            </div>
          )
        })}
      </section>

      {!filteredShops.length && <Empty text={L.noResults} />}

      <p className="panel p-4 text-center text-xs text-[rgb(var(--faint))]">
        {L.backendNote}
      </p>
    </div>
  )
}

function LoginPage({ L, handleLogin, setView }) {
  return (
    <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_420px] fade-in">
      <section className="panel p-6">
        <h1 className="text-3xl font-extrabold">{L.signInTitle}</h1>
        <p className="mt-2 text-sm text-[rgb(var(--muted))]">{L.sampleLogin}</p>

        <div className="mt-6 grid gap-3">
          {[
            ['manager@namdar.af', L.manager, ShieldCheck],
            ['renter@namdar.af', L.applicant, Home],
            ['partner1@namdar.af', L.partner, Landmark]
          ].map(([email, label, Icon]) => (
            <button key={email} className="btn justify-start" onClick={() => handleLogin(email, 'namdar123')}>
              <Icon size={16} />
              {label}
              <span className="ms-auto text-xs text-[rgb(var(--faint))]">{email}</span>
            </button>
          ))}
        </div>
      </section>

      <form
        className="panel p-6"
        onSubmit={(e) => {
          e.preventDefault()
          const form = Object.fromEntries(new FormData(e.currentTarget))
          handleLogin(form.email, form.password)
        }}
      >
        <h2 className="mb-5 text-xl font-extrabold">{L.login}</h2>
        <div className="space-y-4">
          <Field label={L.email}>
            <input className="input" name="email" type="email" defaultValue="manager@namdar.af" required />
          </Field>
          <Field label={L.password}>
            <input className="input" name="password" type="password" defaultValue="namdar123" required />
          </Field>
          <button className="btn btn-primary w-full">
            <LogIn size={16} />
            {L.login}
          </button>
          <button type="button" className="btn w-full" onClick={() => setView('register')}>
            <UserPlus size={16} />
            {L.register}
          </button>
        </div>
      </form>
    </div>
  )
}

function RegisterPage({ L, handleRegister, setView }) {
  return (
    <form
      className="panel mx-auto max-w-2xl p-6 fade-in"
      onSubmit={(e) => {
        e.preventDefault()
        const form = Object.fromEntries(new FormData(e.currentTarget))
        handleRegister(form)
      }}
    >
      <h1 className="text-3xl font-extrabold">{L.registerTitle}</h1>
      <p className="mt-2 text-sm text-[rgb(var(--muted))]">{L.publicNote}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label={L.name}><input className="input" name="name" required /></Field>
        <Field label={L.email}><input className="input" name="email" type="email" required /></Field>
        <Field label={L.phone}><input className="input" name="phone" required /></Field>
        <Field label={L.password}><input className="input" name="password" type="password" minLength="6" required /></Field>
        <Field label={L.nationalId}><input className="input" name="nationalId" /></Field>
        <Field label={L.address}><input className="input" name="address" /></Field>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button className="btn btn-primary"><UserPlus size={16} />{L.createAccount}</button>
        <button type="button" className="btn" onClick={() => setView('login')}>{L.login}</button>
      </div>
    </form>
  )
}

function ManagerDashboard({ L, lang, counts, occupancy, paidTotal, dueTotal, collectionRate, arrearsTotal, db, collected, ledgerRows, setView, month, setMonth }) {
  const months = lastMonths(6)
  const chart = months.map((m) => ({
    label: monthLabel(m, lang).split(' ')[0],
    value: collected(m)
  }))

  const arrearsRows = ledgerRows(month)
    .filter((row) => row.balance > 0)
    .sort((a, b) => b.balance - a.balance)
    .slice(0, 6)

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold">{L.dashboard}</h1>
          <p className="mt-1 text-sm text-[rgb(var(--muted))]">{L.manager}</p>
        </div>
        <select className="input max-w-[220px]" value={month} onChange={(e) => setMonth(e.target.value)}>
          {months.map((m) => <option key={m} value={m}>{monthLabel(m, lang)}</option>)}
        </select>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={LayoutDashboard} label={L.occupancy} value={`${formatNum(occupancy, lang)}%`} tone="turquoise" />
        <Stat icon={Wallet} label={L.collected} value={formatMoney(paidTotal, lang)} tone="saffron" />
        <Stat icon={Banknote} label={L.collectionRate} value={`${formatNum(collectionRate, lang)}%`} sub={`${L.due}: ${formatMoney(dueTotal, lang)}`} />
        <Stat icon={AlertTriangle} label={L.arrears} value={formatMoney(arrearsTotal, lang)} tone="pom" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
        <div className="panel p-5">
          <h2 className="mb-4 font-display text-lg font-extrabold">{L.collected}</h2>
          <Bars data={chart} lang={lang} />
        </div>
        <div className="panel p-5">
          <h2 className="mb-4 font-display text-lg font-extrabold">{L.status}</h2>
          <Donut counts={counts} L={L} />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div>
          <h2 className="mb-3 font-display text-lg font-extrabold">{L.highestArrears}</h2>
          <MiniTable
            empty={L.noResults}
            rows={arrearsRows}
            columns={[
              { key: 'shop', label: L.shops, render: (r) => <b>{r.shop?.id}</b> },
              { key: 'renter', label: L.renterName, render: (r) => r.renter?.name },
              { key: 'due', label: L.due, render: (r) => formatMoney(r.due, lang) },
              { key: 'paid', label: L.paid, render: (r) => formatMoney(r.paid, lang) },
              { key: 'balance', label: L.balance, render: (r) => <b className="text-[rgb(var(--pom))]">{formatMoney(r.balance, lang)}</b> }
            ]}
          />
        </div>

        <div className="panel p-5">
          <h2 className="mb-4 font-display text-lg font-extrabold">{L.quickActions}</h2>
          <div className="grid gap-2">
            <button className="btn justify-start" onClick={() => setView('requests')}><FileText size={16} />{L.requests}</button>
            <button className="btn justify-start" onClick={() => setView('ledger')}><Wallet size={16} />{L.recordPayment}</button>
            <button className="btn justify-start" onClick={() => setView('market')}><Store size={16} />{L.shops}</button>
            <button className="btn justify-start" onClick={() => setView('maintenance')}><Wrench size={16} />{L.maintenance}</button>
          </div>
        </div>
      </section>
    </div>
  )
}

function RequestsPage({ L, lang, db, shopMap, renterMap, setModal }) {
  const [status, setStatus] = useState('pending')
  const rows = db.requests.filter((r) => status === 'all' || r.status === status)

  return (
    <div className="space-y-5 fade-in">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-extrabold">{L.requests}</h1>
        <div className="flex flex-wrap gap-2">
          {['pending', 'approved', 'rejected', 'all'].map((s) => (
            <button key={s} className={cx('chip', status === s && 'chip-on')} onClick={() => setStatus(s)}>
              {s === 'all' ? L.all : L[s]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {rows.map((request) => {
          const shop = shopMap.get(request.shopId)
          const renter = renterMap.get(request.applicantId)

          return (
            <div key={request.id} className="panel p-5">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl font-extrabold">{shop?.id}</h2>
                  <p className="text-sm text-[rgb(var(--muted))]">{renter?.name}</p>
                </div>
                <span className="pill" style={{ '--tone': request.status === 'pending' ? '#FFB020' : request.status === 'approved' ? '#57D98A' : '#FF4D5E' }}>
                  {L[request.status]}
                </span>
              </div>

              <p className="text-sm"><b>{L.business}:</b> {request.business}</p>
              <p className="mt-2 text-sm text-[rgb(var(--muted))]">{request.message}</p>
              <p className="mt-2 text-xs text-[rgb(var(--faint))]">{request.requestedAt}</p>

              {request.status === 'pending' && (
                <div className="mt-4 flex gap-2">
                  <button className="btn btn-ok btn-sm" onClick={() => setModal({ type: 'decision', action: 'approve', request })}>
                    <Check size={14} />
                    {L.approve}
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => setModal({ type: 'decision', action: 'reject', request })}>
                    <X size={14} />
                    {L.reject}
                  </button>
                </div>
              )}

              {request.decisionNote && (
                <p className="mt-3 rounded-xl bg-[rgb(var(--bg2))] p-3 text-xs text-[rgb(var(--muted))]">
                  {request.decisionNote}
                </p>
              )}
            </div>
          )
        })}
      </div>

      {!rows.length && <Empty text={L.noResults} />}
    </div>
  )
}

function RentersPage({ L, db, setModal, deleteRenter }) {
  const [query, setQuery] = useState('')

  const rows = db.renters.filter((r) =>
    `${r.name} ${r.email} ${r.phone} ${r.nationalId}`.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="space-y-5 fade-in">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-extrabold">{L.renters}</h1>
        <button className="btn btn-primary" onClick={() => setModal({ type: 'renter' })}>
          <Plus size={16} />
          {L.addRenter}
        </button>
      </div>

      <input className="input max-w-xl" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={L.search} />

      <MiniTable
        empty={L.noResults}
        rows={rows}
        columns={[
          { key: 'name', label: L.name, render: (r) => <b>{r.name}</b> },
          { key: 'phone', label: L.phone, render: (r) => r.phone },
          { key: 'email', label: L.email, render: (r) => r.email },
          { key: 'nationalId', label: L.nationalId, render: (r) => r.nationalId },
          {
            key: 'actions',
            label: L.actions,
            render: (r) => (
              <div className="flex gap-2">
                <button className="btn btn-sm" onClick={() => setModal({ type: 'renter', renter: r })}><Edit3 size={13} /></button>
                <button className="btn btn-sm btn-danger" onClick={() => deleteRenter(r)}><Trash2 size={13} /></button>
              </div>
            )
          }
        ]}
      />
    </div>
  )
}

function LedgerPage({ L, lang, db, month, setMonth, rows, dueTotal, paidTotal, collectionRate, setModal, reversePayment, closeMonth, currentClosing }) {
  const months = lastMonths(6)
  const recentPayments = db.payments.slice(0, 12)

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold">{L.ledger}</h1>
          <p className="mt-1 text-sm text-[rgb(var(--muted))]">{L.cashOnly}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <select className="input max-w-[220px]" value={month} onChange={(e) => setMonth(e.target.value)}>
            {months.map((m) => <option key={m} value={m}>{monthLabel(m, lang)}</option>)}
          </select>
          <button className="btn btn-accent" disabled={!!currentClosing} onClick={closeMonth}>
            <CalendarCheck size={16} />
            {currentClosing ? L.monthClosed : L.closeMonth}
          </button>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-3">
        <Stat icon={Wallet} label={L.due} value={formatMoney(dueTotal, lang)} />
        <Stat icon={Banknote} label={L.paid} value={formatMoney(paidTotal, lang)} tone="pistachio" />
        <Stat icon={LayoutDashboard} label={L.collectionRate} value={`${formatNum(collectionRate, lang)}%`} tone="turquoise" />
      </section>

      <MiniTable
        empty={L.noResults}
        rows={rows}
        columns={[
          { key: 'shop', label: L.shops, render: (r) => <b>{r.shop?.id}</b> },
          { key: 'renter', label: L.renterName, render: (r) => r.renter?.name },
          { key: 'due', label: L.due, render: (r) => formatMoney(r.due, lang) },
          { key: 'paid', label: L.paid, render: (r) => formatMoney(r.paid, lang) },
          { key: 'balance', label: L.balance, render: (r) => <b className={r.balance ? 'text-[rgb(var(--pom))]' : 'text-[rgb(var(--pistachio))]'}>{formatMoney(r.balance, lang)}</b> },
          {
            key: 'actions',
            label: L.actions,
            render: (r) => (
              <button
                className="btn btn-sm btn-primary"
                disabled={!!currentClosing || r.balance <= 0}
                onClick={() => setModal({ type: 'payment', leaseId: r.lease.id, month, balance: r.balance })}
              >
                <Plus size={13} />
                {L.recordPayment}
              </button>
            )
          }
        ]}
      />

      <section>
        <h2 className="mb-3 font-display text-lg font-extrabold">{L.paymentHistory}</h2>
        <MiniTable
          empty={L.noPayment}
          rows={recentPayments}
          columns={[
            { key: 'receiptNo', label: L.receipt, render: (p) => <b>{p.receiptNo}</b> },
            { key: 'shopId', label: L.shops, render: (p) => p.shopId },
            { key: 'month', label: L.month, render: (p) => monthLabel(p.month, lang) },
            { key: 'amount', label: L.amount, render: (p) => formatMoney(p.amount, lang) },
            { key: 'date', label: L.date, render: (p) => p.date },
            {
              key: 'actions',
              label: L.actions,
              render: (p) => p.reversed
                ? <span className="text-[rgb(var(--pom))]">{L.reversed}</span>
                : <button className="btn btn-sm btn-danger" disabled={!!currentClosing} onClick={() => reversePayment(p)}>{L.reverse}</button>
            }
          ]}
        />
      </section>
    </div>
  )
}

function MaintenancePage({ L, db, session, renterMap, shopMap, setModal, dragId, setDragId, moveMaintenance, deleteMaintenance }) {
  const columns = [
    ['open', L.open],
    ['progress', L.progress],
    ['resolved', L.resolved]
  ]

  const visible = session?.role === 'renter'
    ? db.maintenance.filter((m) => m.renterId === session.renterId)
    : db.maintenance

  return (
    <div className="space-y-5 fade-in">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold">{L.maintenance}</h1>
          <p className="mt-1 text-sm text-[rgb(var(--muted))]">{L.dragHint}</p>
        </div>
        <button className="btn btn-primary" onClick={() => setModal({ type: 'maintenance' })}>
          <Plus size={16} />
          {L.newMaintenance}
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {columns.map(([status, label]) => {
          const rows = visible.filter((m) => m.status === status)

          return (
            <div
              key={status}
              className="panel min-h-[360px] p-4"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (dragId) moveMaintenance(dragId, status)
                setDragId(null)
              }}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display font-extrabold">{label}</h2>
                <span className="chip">{rows.length}</span>
              </div>

              <div className="space-y-3">
                {rows.map((item) => (
                  <div
                    key={item.id}
                    className="kanban-card"
                    draggable={session?.role === 'manager'}
                    onDragStart={() => setDragId(item.id)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.stopPropagation()
                      if (dragId && dragId !== item.id) moveMaintenance(dragId, status, item.id)
                      setDragId(null)
                    }}
                  >
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <b>{item.title}</b>
                      <span className="pill" style={{ '--tone': item.priority === 'high' ? '#FF4D5E' : item.priority === 'medium' ? '#FFB020' : '#22C7C0' }}>
                        {L[item.priority]}
                      </span>
                    </div>
                    <p className="text-xs text-[rgb(var(--muted))]">{item.description}</p>
                    <p className="mt-2 text-xs font-bold text-[rgb(var(--faint))]">
                      {shopMap.get(item.shopId)?.id} · {renterMap.get(item.renterId)?.name}
                    </p>

                    {session?.role === 'manager' && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {status !== 'open' && <button className="btn btn-sm" onClick={() => moveMaintenance(item.id, 'open')}>{L.open}</button>}
                        {status !== 'progress' && <button className="btn btn-sm" onClick={() => moveMaintenance(item.id, 'progress')}>{L.progress}</button>}
                        {status !== 'resolved' && <button className="btn btn-sm btn-ok" onClick={() => moveMaintenance(item.id, 'resolved')}>{L.resolved}</button>}
                        <button className="btn btn-sm btn-danger" onClick={() => deleteMaintenance(item.id)}><Trash2 size={13} /></button>
                      </div>
                    )}
                  </div>
                ))}

                {!rows.length && <p className="py-10 text-center text-sm text-[rgb(var(--faint))]">{L.noResults}</p>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function RenterPage({ L, lang, db, month, currentRenter, currentRenterLease, currentRenterShop, currentRenterRows, openRequest, setModal, setView }) {
  const myRequests = db.requests.filter((r) => r.applicantId === currentRenter?.id)
  const myPayments = db.payments.filter((p) => p.renterId === currentRenter?.id).slice(0, 8)
  const available = db.shops.filter((s) => s.status === 'available').slice(0, 8)
  const row = currentRenterRows[0]

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-extrabold">{L.renter}</h1>
        <p className="mt-1 text-sm text-[rgb(var(--muted))]">{currentRenter?.name}</p>
      </div>

      <section className="grid gap-4 sm:grid-cols-3">
        <Stat icon={Store} label={L.myLease} value={currentRenterShop?.id || L.noLease} />
        <Stat icon={Wallet} label={L.paidThisMonth} value={formatMoney(row?.paid || 0, lang)} tone="pistachio" />
        <Stat icon={AlertTriangle} label={L.remaining} value={formatMoney(row?.balance || 0, lang)} tone={row?.balance ? 'pom' : 'pistachio'} />
      </section>

      {!currentRenterLease && (
        <Empty text={L.noActiveLease} />
      )}

      <section className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="panel p-5">
          <h2 className="mb-4 font-display text-lg font-extrabold">{L.available}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {available.map((shop) => (
              <button key={shop.id} className="panel2 p-4 text-start transition hover:-translate-y-1" onClick={() => openRequest(shop)}>
                <b className="font-display text-lg">{shop.id}</b>
                <p className="mt-1 text-xs text-[rgb(var(--muted))]">{shop.category}</p>
                <p className="mt-3 font-bold text-[rgb(var(--saffron))]">{formatMoney(shop.rent, lang)}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="panel p-5">
          <h2 className="mb-4 font-display text-lg font-extrabold">{L.maintenance}</h2>
          <button className="btn btn-primary w-full" onClick={() => setModal({ type: 'maintenance' })}>
            <Plus size={16} />
            {L.newMaintenance}
          </button>
          <button className="btn mt-2 w-full" onClick={() => setView('maintenance')}>
            <Wrench size={16} />
            {L.maintenance}
          </button>
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-display text-lg font-extrabold">{L.myRequests}</h2>
        <MiniTable
          empty={L.noRequest}
          rows={myRequests}
          columns={[
            { key: 'shopId', label: L.shops, render: (r) => <b>{r.shopId}</b> },
            { key: 'business', label: L.business, render: (r) => r.business },
            { key: 'status', label: L.status, render: (r) => L[r.status] },
            { key: 'requestedAt', label: L.date, render: (r) => r.requestedAt }
          ]}
        />
      </section>

      <section>
        <h2 className="mb-3 font-display text-lg font-extrabold">{L.myPayments}</h2>
        <MiniTable
          empty={L.noPayment}
          rows={myPayments}
          columns={[
            { key: 'receiptNo', label: L.receipt, render: (p) => <b>{p.receiptNo}</b> },
            { key: 'month', label: L.month, render: (p) => monthLabel(p.month, lang) },
            { key: 'amount', label: L.amount, render: (p) => formatMoney(p.amount, lang) },
            { key: 'date', label: L.date, render: (p) => p.date },
            { key: 'reversed', label: L.status, render: (p) => p.reversed ? L.reversed : L.paid }
          ]}
        />
      </section>
    </div>
  )
}

function PartnerPage({ L, lang, db, month, setMonth, currentPartner, currentShares, currentClosing, collected }) {
  const months = lastMonths(6)
  const total = collected(month)
  const myShare = currentShares.find((s) => s.partnerId === currentPartner?.id)?.amount || 0
  const shareSum = currentShares.reduce((sum, s) => sum + s.amount, 0)

  const chart = months.map((m) => ({
    label: monthLabel(m, lang).split(' ')[0],
    value: collected(m)
  }))

  function exportStatement() {
    downloadCSV(`partner-statement-${month}.csv`, [
      [L.partner, L.share],
      ...db.partners.map((p) => [
        p.name,
        currentShares.find((s) => s.partnerId === p.id)?.amount || 0
      ]),
      [L.total, total]
    ])
  }

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold">{L.partner}</h1>
          <p className="mt-1 text-sm text-[rgb(var(--muted))]">{L.readOnly} · {currentPartner?.name}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <select className="input max-w-[220px]" value={month} onChange={(e) => setMonth(e.target.value)}>
            {months.map((m) => <option key={m} value={m}>{monthLabel(m, lang)}</option>)}
          </select>
          <button className="btn" onClick={exportStatement}><Download size={16} />{L.export}</button>
          <button className="btn" onClick={() => window.print()}><Receipt size={16} />{L.print}</button>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-3">
        <Stat icon={Landmark} label={L.partnerShare} value={formatMoney(myShare, lang)} tone="saffron" />
        <Stat icon={Wallet} label={L.totalCollected} value={formatMoney(total, lang)} tone="pistachio" />
        <Stat icon={CalendarCheck} label={L.status} value={currentClosing ? L.locked : L.current} tone={currentClosing ? 'pom' : 'turquoise'} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="panel p-5">
          <h2 className="mb-4 font-display text-lg font-extrabold">{L.collected}</h2>
          <Bars data={chart} lang={lang} />
        </div>

        <div className="panel p-5">
          <h2 className="mb-2 font-display text-lg font-extrabold">{L.sixWaySplit}</h2>
          <p className="mb-4 text-xs text-[rgb(var(--muted))]">{L.remainderRule}</p>

          <div className="space-y-3">
            {db.partners.map((partner) => {
              const amount = currentShares.find((s) => s.partnerId === partner.id)?.amount || 0
              return (
                <div key={partner.id} className="flex items-center justify-between gap-3 rounded-xl bg-[rgb(var(--bg2))] p-3">
                  <span className="text-sm font-bold">{partner.name}</span>
                  <b className="text-[rgb(var(--saffron))]">{formatMoney(amount, lang)}</b>
                </div>
              )
            })}
          </div>

          <div className="mt-4 border-t border-[rgb(var(--line))] pt-4 text-sm">
            <div className="flex justify-between"><span>{L.sumShares}</span><b>{formatMoney(shareSum, lang)}</b></div>
            <div className="mt-1 flex justify-between"><span>{L.difference}</span><b>{formatMoney(total - shareSum, lang)}</b></div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ShopDrawer({ L, lang, shop, lease, renter, db, session, onClose, openRequest, setModal, commit, paidForLease, month }) {
  const payments = lease
    ? db.payments.filter((p) => p.leaseId === lease.id).slice(0, 6)
    : []

  return (
    <Drawer title={`${L.shopDetails} · ${shop.id}`} onClose={onClose}>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <Pill status={shop.status} L={L} />
          <b className="text-[rgb(var(--saffron))]">{formatMoney(shop.rent, lang)}</b>
        </div>

        <div className="panel2 p-4">
          <InfoRow label={L.trade} value={shop.category} />
          <InfoRow label={L.size} value={`${formatNum(shop.size, lang)} m²`} />
          <InfoRow label={L.block} value={shop.block} />
          <InfoRow label={L.lane} value={formatNum(shop.lane, lang)} />
          <InfoRow label={L.deposit} value={formatMoney(shop.deposit, lang)} />
        </div>

        {session?.role === 'manager' && (
          <Field label={L.editStatus}>
            <select
              className="input"
              value={shop.status}
              onChange={(e) =>
                commit(L.saved, (prev) => ({
                  ...prev,
                  shops: prev.shops.map((s) =>
                    s.id === shop.id ? { ...s, status: e.target.value } : s
                  )
                }))
              }
            >
              {STATUSES.map((s) => <option key={s} value={s}>{statusText(s, L)}</option>)}
            </select>
          </Field>
        )}

        {lease ? (
          <div className="panel2 p-4">
            <h3 className="mb-3 font-display font-extrabold">{L.activeLease}</h3>
            <InfoRow label={L.renterName} value={renter?.name} />
            <InfoRow label={L.phone} value={renter?.phone} />
            <InfoRow label={L.startDate} value={lease.start} />
            <InfoRow label={L.endDate} value={lease.end} />
            <InfoRow label={L.monthlyRent} value={formatMoney(lease.monthlyRent, lang)} />
            <InfoRow label={L.paidThisMonth} value={formatMoney(paidForLease(lease.id, month), lang)} />

            {session?.role === 'manager' && (
              <button
                className="btn btn-primary mt-4 w-full"
                onClick={() => setModal({ type: 'payment', leaseId: lease.id, month, balance: Math.max(0, lease.monthlyRent - paidForLease(lease.id, month)) })}
              >
                <Wallet size={16} />
                {L.recordPayment}
              </button>
            )}
          </div>
        ) : (
          <Empty text={L.noLease} />
        )}

        {shop.status === 'available' && (
          <button className="btn btn-accent w-full" onClick={() => openRequest(shop)}>
            <FileText size={16} />
            {L.requestShop}
          </button>
        )}

        {!!payments.length && (
          <div>
            <h3 className="mb-3 font-display font-extrabold">{L.paymentHistory}</h3>
            <div className="space-y-2">
              {payments.map((p) => (
                <div key={p.id} className="rounded-xl bg-[rgb(var(--bg2))] p-3 text-sm">
                  <div className="flex justify-between gap-3">
                    <b>{p.receiptNo}</b>
                    <span>{formatMoney(p.amount, lang)}</span>
                  </div>
                  <p className="mt-1 text-xs text-[rgb(var(--faint))]">{p.date} · {p.reversed ? L.reversed : L.paid}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-xs leading-relaxed text-[rgb(var(--faint))]">{L.cashOnly}</p>
      </div>
    </Drawer>
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[rgb(var(--line))] py-2 last:border-b-0">
      <span className="text-xs font-bold text-[rgb(var(--faint))]">{label}</span>
      <span className="text-end text-sm font-bold">{value || '—'}</span>
    </div>
  )
}

function FormModal({ modal, L, db, shopMap, renterMap, onClose, onSubmit }) {
  if (modal.type === 'request') {
    return (
      <Modal title={`${L.requestShop} · ${modal.shop.id}`} onClose={onClose}>
        <form onSubmit={onSubmit} className="space-y-4">
          <Field label={L.business}>
            <input className="input" name="business" required />
          </Field>
          <Field label={L.message}>
            <textarea className="input" name="message" required />
          </Field>
          <button className="btn btn-primary w-full">{L.submitRequest}</button>
        </form>
      </Modal>
    )
  }

  if (modal.type === 'decision') {
    const shop = shopMap.get(modal.request.shopId)
    const renter = renterMap.get(modal.request.applicantId)
    const approve = modal.action === 'approve'

    return (
      <Modal title={approve ? L.createLease : L.rejectRequest} onClose={onClose}>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="panel2 p-4">
            <InfoRow label={L.shops} value={shop?.id} />
            <InfoRow label={L.renterName} value={renter?.name} />
            <InfoRow label={L.business} value={modal.request.business} />
          </div>

          {approve && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={L.startDate}><input className="input" name="start" type="date" defaultValue={TODAY} required /></Field>
              <Field label={L.endDate}><input className="input" name="end" type="date" defaultValue="2027-11-15" required /></Field>
              <Field label={L.monthlyRent}><input className="input" name="monthlyRent" type="number" defaultValue={shop?.rent} required /></Field>
              <Field label={L.deposit}><input className="input" name="deposit" type="number" defaultValue={shop?.deposit} required /></Field>
            </div>
          )}

          <Field label={L.decisionNote}>
            <textarea className="input" name="decisionNote" defaultValue={approve ? 'Approved after document verification.' : 'Incomplete documents.'} />
          </Field>

          <button className={cx('btn w-full', approve ? 'btn-ok' : 'btn-danger')}>
            {approve ? L.approve : L.reject}
          </button>
        </form>
      </Modal>
    )
  }

  if (modal.type === 'payment') {
    return (
      <Modal title={L.recordPayment} onClose={onClose}>
        <form onSubmit={onSubmit} className="space-y-4">
          <Field label={L.paymentAmount}>
            <input className="input" name="amount" type="number" min="1" defaultValue={modal.balance || 1} required />
          </Field>
          <Field label={L.date}>
            <input className="input" name="date" type="date" defaultValue={TODAY} required />
          </Field>
          <Field label={L.note}>
            <textarea className="input" name="note" />
          </Field>
          <button className="btn btn-primary w-full">
            <Wallet size={16} />
            {L.recordPayment}
          </button>
        </form>
      </Modal>
    )
  }

  if (modal.type === 'renter') {
    const renter = modal.renter

    return (
      <Modal title={renter ? L.editRenter : L.addRenter} onClose={onClose}>
        <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
          <Field label={L.name}><input className="input" name="name" defaultValue={renter?.name} required /></Field>
          <Field label={L.email}><input className="input" name="email" type="email" defaultValue={renter?.email} required /></Field>
          <Field label={L.phone}><input className="input" name="phone" defaultValue={renter?.phone} required /></Field>
          <Field label={L.nationalId}><input className="input" name="nationalId" defaultValue={renter?.nationalId} /></Field>
          <Field label={L.address}><input className="input" name="address" defaultValue={renter?.address} /></Field>
          <Field label={L.guarantor}><input className="input" name="guarantor" defaultValue={renter?.guarantor} /></Field>
          <button className="btn btn-primary sm:col-span-2">{L.save}</button>
        </form>
      </Modal>
    )
  }

  if (modal.type === 'maintenance') {
    return (
      <Modal title={L.newMaintenance} onClose={onClose}>
        <form onSubmit={onSubmit} className="space-y-4">
          <Field label={L.title}><input className="input" name="title" required /></Field>
          <Field label={L.description}><textarea className="input" name="description" required /></Field>
          <Field label={L.priority}>
            <select className="input" name="priority" defaultValue="medium">
              <option value="high">{L.high}</option>
              <option value="medium">{L.medium}</option>
              <option value="low">{L.low}</option>
            </select>
          </Field>
          <button className="btn btn-primary w-full">{L.save}</button>
        </form>
      </Modal>
    )
  }

  return null
}