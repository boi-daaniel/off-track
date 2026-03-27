import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { formatCurrency } from '../utils/formatters'

const COLORS = ['#0f172a', '#10b981', '#06b6d4', '#f97316', '#8b5cf6', '#ef4444']

function SpendingChart({ data }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">Spending by Category</h2>
        <p className="mt-1 text-sm text-slate-500">A quick view of where your money is going.</p>
      </div>

      {data.length === 0 ? (
        <div className="flex h-[280px] items-center justify-center rounded-2xl border border-dashed border-slate-200 text-sm text-slate-500">
          Add expenses to see the category chart.
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[1fr_180px]">
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" innerRadius={70} outerRadius={100} paddingAngle={3}>
                  {data.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {data.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-sm font-medium text-slate-700">{item.name}</span>
                </div>
                <span className="text-sm font-semibold text-slate-900">{formatCurrency(item.value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default SpendingChart
