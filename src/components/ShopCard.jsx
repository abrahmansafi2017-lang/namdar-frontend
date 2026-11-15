import { ArrowUpRight } from 'lucide-react'
import { formatMoney, formatNum } from '../data/shops'

const STATUS_STYLES = {
  available: 'bg-pistachio/15 text-pistachio border-pistachio/30',
  reserved: 'bg-saffron/15 text-saffron border-saffron/30',
  rented: 'bg-lapis/15 text-lapis border-lapis/30',
  maintenance: 'bg-clay/15 text-clay border-clay/30'
}

export default function ShopCard({ shop, t, lang, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(shop)}
      className="group w-full rounded-2xl border border-line bg-surface/80 p-4 text-start transition-all duration-200 hover:-translate-y-1 hover:border-lapis/60 hover:shadow-[0_16px_32px_-16px_rgba(59,114,255,0.6)]"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-display text-lg font-extrabold text-parchment">
          {shop.id}
        </span>

        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${STATUS_STYLES[shop.status]}`}
        >
          {t[shop.status]}
        </span>
      </div>

      <p className="mt-1 text-xs text-muted">{shop.category}</p>

      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="font-display text-base font-extrabold text-saffron">
            {formatMoney(shop.rent, lang)}
          </p>
          <p className="text-[10px] text-faint">{t.perMonth}</p>
        </div>

        <div className="text-end">
          <p className="text-xs font-semibold text-parchment">
            {formatNum(shop.size, lang)} m²
          </p>

          <p className="mt-1 inline-flex items-center gap-1 text-[10px] text-lapis opacity-0 transition-opacity group-hover:opacity-100">
            {t.view}
            <ArrowUpRight size={11} />
          </p>
        </div>
      </div>
    </button>
  )
}