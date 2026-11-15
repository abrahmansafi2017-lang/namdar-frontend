export const BLOCKS = ['A', 'B', 'C', 'D', 'E', 'F']
export const STATUSES = ['available', 'reserved', 'rented', 'maintenance']
export const TODAY = '2026-11-15'
export const CURRENT_MONTH = '2026-11'

export const STATUS_META = {
  available: { color: '#57D98A', icon: '●' },
  reserved: { color: '#FFB020', icon: '●' },
  rented: { color: '#3B72FF', icon: '●' },
  maintenance: { color: '#D98A5B', icon: '●' }
}

const TRADES = ['General Store', 'Mobile Center', 'Tailoring', 'Carpets', 'Electronics', 'Dry Fruits', 'Pharmacy', 'Hardware', 'Fabrics', 'Bakery', 'Tea House', 'Stationery', 'Jewellery', 'Barber', 'Shoes']

const FIRST = ['Abdul Rahman', 'Dilawar', 'Sayeed Faisal', 'Zmarai', 'Gulbuddin', 'Najibullah', 'Habib', 'Sardar Wali', 'Mir Alam', 'Zahir', 'Bakhtiar', 'Noor Wali', 'Shah Mahmood', 'Abdul Basir', 'Rahmat Gul', 'Ajmal', 'Farid Ahmad', 'Ikramullah', 'Sultan Mohammad', 'Wali Khan', 'Nazo', 'Malalai', 'Zarghuna', 'Palwasha', 'Spogmai']

const LAST = ['Zazai', 'Safi', 'Kishwary', 'Ahmadzai', 'Aryoubi', 'Paktiawal', 'Chamkani', 'Zadran', 'Mangal', 'Gurbuz', 'Stanikzai', 'Ahmadi', 'Wali Khel', 'Gul Khel', 'Sarhadi', 'Bakhtari', 'Gardezi', 'Shinwari']

export const PARTNERS = [
  { id: 'PT-1', name: 'Haji Namdar Khan', email: 'partner1@namdar.af' },
  { id: 'PT-2', name: 'Haji Sher Wali', email: 'partner2@namdar.af' },
  { id: 'PT-3', name: 'Haji Abdul Qayum', email: 'partner3@namdar.af' },
  { id: 'PT-4', name: 'Haji Gul Rahman', email: 'partner4@namdar.af' },
  { id: 'PT-5', name: 'Haji Mir Bacha', email: 'partner5@namdar.af' },
  { id: 'PT-6', name: 'Haji Sardar Gul', email: 'partner6@namdar.af' }
]

export function uid(prefix = 'id') {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

export function formatNum(value, lang = 'en') {
  return new Intl.NumberFormat(lang === 'ps' ? 'fa-AF' : 'en-US').format(Math.round(Number(value) || 0))
}

export function formatMoney(value, lang = 'en') {
  const n = formatNum(Math.abs(value), lang)
  return lang === 'ps' ? `${n} ؋` : `؋ ${n}`
}

export function monthShift(month, delta) {
  const [y, m] = month.split('-').map(Number)
  const d = new Date(y, m - 1 + delta, 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

export function monthLabel(month, lang = 'en') {
  const en = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const ps = ['جنوري', 'فبروري', 'مارچ', 'اپریل', 'مې', 'جون', 'جولای', 'اګست', 'سپتمبر', 'اکتوبر', 'نومبر', 'دسمبر']
  const [y, m] = month.split('-').map(Number)
  const name = lang === 'ps' ? ps[m - 1] : en[m - 1]
  return `${name} ${formatNum(y, lang).replace(/[٬,]/g, '')}`
}

export function monthIndex(month) {
  const [y, m] = month.split('-').map(Number)
  return y * 12 + m - 1
}

export function lastMonths(count = 6, end = CURRENT_MONTH) {
  return Array.from({ length: count }, (_, i) => monthShift(end, i - count + 1))
}

export function leaseCovers(lease, month) {
  return lease.status === 'active' && lease.start.slice(0, 7) <= month && lease.end.slice(0, 7) >= month
}

export function splitSix(total, month) {
  const t = Math.max(0, Math.round(Number(total) || 0))
  const base = Math.floor(t / 6)
  const rem = t - base * 6
  const start = monthIndex(month) % 6
  return Array.from({ length: 6 }, (_, i) => base + (((i - start + 6) % 6) < rem ? 1 : 0))
}

export function downloadCSV(filename, rows) {
  const esc = (c) => `"${String(c ?? '').replace(/"/g, '""')}"`
  const csv = rows.map((r) => r.map(esc).join(',')).join('\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function shopStatus(n) {
  if (n % 13 === 0) return 'maintenance'
  if (n % 7 === 0) return 'reserved'
  if (n % 4 === 0) return 'available'
  return 'rented'
}

function personName(i) {
  return `${FIRST[i % FIRST.length]} ${LAST[(i * 5) % LAST.length]}`
}

export function buildSeed() {
  const shops = Array.from({ length: 150 }, (_, index) => {
    const number = index + 1
    const block = BLOCKS[Math.floor(index / 25)]
    const inBlock = (index % 25) + 1
    const size = 12 + ((number * 7) % 49)
    const rent = Math.round((6000 + size * 380 + (number % 9) * 250) / 100) * 100
    return {
      id: `${block}-${String(inBlock).padStart(2, '0')}`,
      number,
      block,
      lane: Math.floor((inBlock - 1) / 5) + 1,
      size,
      rent,
      deposit: rent * 2,
      status: shopStatus(number),
      category: TRADES[index % TRADES.length],
      note: ''
    }
  })

  const renters = []
  const leases = []

  shops.filter((s) => s.status === 'rented').forEach((shop, i) => {
    const renterId = `R-${String(i + 1).padStart(3, '0')}`
    const name = personName(i)
    renters.push({
      id: renterId,
      name,
      phone: `+93 70 ${100 + i} ${1000 + i * 7}`,
      email: i === 0 ? 'renter@namdar.af' : `${name.toLowerCase().replace(/ /g, '.')}@example.af`,
      nationalId: `13-${1000 + i}-${10000 + i * 11}`,
      address: 'Zazi Aryoub, Paktia',
      guarantor: i % 3 === 0 ? personName(i + 9) : '',
      createdAt: TODAY
    })
    const startMonth = monthShift(CURRENT_MONTH, -((i % 16) + 2))
    const endMonth = monthShift(startMonth, 18 + (i % 12))
    leases.push({
      id: `L-${String(i + 1).padStart(3, '0')}`,
      shopId: shop.id,
      renterId,
      start: `${startMonth}-01`,
      end: `${endMonth}-28`,
      monthlyRent: shop.rent,
      deposit: shop.deposit,
      status: 'active',
      createdAt: `${startMonth}-01`
    })
  })

  const applicants = Array.from({ length: 8 }, (_, i) => {
    const name = personName(i + 60)
    return {
      id: `RA-${String(i + 1).padStart(2, '0')}`,
      name,
      phone: `+93 72 ${200 + i} ${2000 + i * 13}`,
      email: `${name.toLowerCase().replace(/ /g, '.')}@example.af`,
      nationalId: `13-${2000 + i}-${20000 + i * 17}`,
      address: 'Paktia',
      guarantor: '',
      createdAt: TODAY
    }
  })
  renters.push(...applicants)

  const months = lastMonths(6)
  const payments = []
  let receiptNo = 4200

  leases.forEach((lease, i) => {
    months.forEach((month, j) => {
      const isCurrent = month === CURRENT_MONTH
      const skip = isCurrent ? i % 4 === 0 : (i + j) % 11 === 0
      if (skip) return
      const partial = isCurrent ? i % 6 === 0 : (i + j) % 9 === 0
      const amount = partial ? Math.round((lease.monthlyRent * 0.55) / 100) * 100 : lease.monthlyRent
      const reversed = i === 4 && j === 2
      const day = String(5 + (i % 18)).padStart(2, '0')
      payments.push({
        id: `P-${receiptNo}`,
        leaseId: lease.id,
        shopId: lease.shopId,
        renterId: lease.renterId,
        month,
        amount,
        date: `${month}-${day}`,
        method: 'cash',
        receiptNo: `RC-${receiptNo}`,
        enteredBy: 'U-manager',
        reversed,
        reversalNote: reversed ? 'Duplicate entry corrected' : '',
        note: partial ? 'Partial cash payment' : ''
      })
      receiptNo += 1
    })
  })

  const available = shops.filter((s) => s.status === 'available')
  const requests = applicants.map((applicant, i) => ({
    id: `Q-${100 + i}`,
    applicantId: applicant.id,
    shopId: available[i % available.length].id,
    business: `${applicant.name.split(' ')[0]} ${TRADES[i % TRADES.length]}`,
    message: 'I want to rent this shop for my family business.',
    requestedAt: TODAY,
    status: i < 5 ? 'pending' : i < 7 ? 'approved' : 'rejected',
    decisionNote: i < 5 ? '' : i < 7 ? 'Documents verified.' : 'Incomplete documents.'
  }))

  const maintenance = [
    { id: 'M-1', shopId: leases[0].shopId, renterId: leases[0].renterId, title: 'Shutter lock broken', description: 'The front shutter lock needs replacement.', status: 'open', priority: 'high', createdAt: TODAY },
    { id: 'M-2', shopId: leases[3].shopId, renterId: leases[3].renterId, title: 'Water leakage', description: 'Rain water enters from the roof corner.', status: 'progress', priority: 'medium', createdAt: TODAY },
    { id: 'M-3', shopId: leases[7].shopId, renterId: leases[7].renterId, title: 'Electricity meter fault', description: 'Meter display is not clear.', status: 'resolved', priority: 'low', createdAt: TODAY }
  ]

  const users = [
    { id: 'U-manager', name: 'Zmarai Ahmadzai', email: 'manager@namdar.af', password: 'namdar123', role: 'manager', verified: true },
    { id: 'U-renter', name: renters[0].name, email: 'renter@namdar.af', password: 'namdar123', role: 'renter', renterId: renters[0].id, verified: true },
    ...PARTNERS.map((p, i) => ({ id: `U-partner-${i + 1}`, name: p.name, email: p.email, password: 'namdar123', role: 'partner', partnerId: p.id, verified: true }))
  ]

  const closings = months.slice(0, 3).map((month) => {
    const total = payments.filter((p) => p.month === month && !p.reversed).reduce((s, p) => s + p.amount, 0)
    const amounts = splitSix(total, month)
    return {
      id: `C-${month}`,
      month,
      total,
      closedAt: `${month}-28T17:00:00`,
      closedBy: 'U-manager',
      locked: true,
      shares: PARTNERS.map((p, i) => ({ partnerId: p.id, amount: amounts[i] }))
    }
  })

  const audit = payments.slice(-12).map((p, i) => ({
    id: `A-${i}`,
    userId: 'U-manager',
    action: 'payment.record',
    entity: p.receiptNo,
    at: `${p.date}T10:00:00`
  }))

  return {
    shops,
    renters,
    leases,
    payments,
    requests,
    maintenance,
    partners: PARTNERS,
    users,
    closings,
    audit,
    savedViews: []
  }
}