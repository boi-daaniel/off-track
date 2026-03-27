function StatCard({ label, value, hint, accent }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${accent}`}>{label}</div>
      <p className="mt-4 text-3xl font-semibold text-slate-900">{value}</p>
      <p className="mt-2 text-sm text-slate-500">{hint}</p>
    </article>
  )
}

export default StatCard
