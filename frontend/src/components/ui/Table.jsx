export function Table({ headers, children, className = '' }) {
  return (
    <div className={`overflow-x-auto w-full bg-white rounded-xl shadow-sm border border-slate-100 ${className}`}>
      <table className="w-full text-left text-sm text-slate-600">
        <thead className="bg-slate-50 text-slate-700 font-medium border-b border-slate-100">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-4 whitespace-nowrap">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {children}
        </tbody>
      </table>
    </div>
  );
}

export function TableRow({ children, className = '' }) {
  return (
    <tr className={`hover:bg-slate-50/50 transition-colors ${className}`}>
      {children}
    </tr>
  );
}

export function TableCell({ children, className = '' }) {
  return (
    <td className={`px-6 py-4 whitespace-nowrap ${className}`}>
      {children}
    </td>
  );
}
