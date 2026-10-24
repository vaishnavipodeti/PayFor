
const navigation = [
  { id: 'home', label: 'Overview' },
  { id: 'send', label: 'Send Money' },
  { id: 'transactions', label: 'Transactions' },
  { id: 'analytics', label: 'Analytics' },
]

function Navbar({ page, onNavigate }) {
  return (
    <header className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <button
          onClick={() => onNavigate('home')}
          className="flex w-fit items-center gap-3 text-left"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
            P
          </span>
          <span>
            <span className="block text-xl font-bold tracking-tight text-white">
              PayFlow
            </span>
            <span className="block text-xs text-slate-400">
              Personal finance
            </span>
          </span>
        </button>

        <nav className="flex flex-wrap gap-2">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition sm:px-4 ${
                page === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
