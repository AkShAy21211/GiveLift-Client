type TableProps = { label: string[]; data: any[], page: number }

function Table({ label, data, page }: TableProps) {
  return (
    <div className="overflow-x-auto  mt-10">
      <table className="min-w-full border border-gray-300">
        {/* Table Header */}
        <thead>
          <tr className="bg-gray-200">
            {label.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-w-normal"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {/* Row 1 */}

          {data.map((row, index) => (
            <tr className="border-t" key={row._id}>
              <td className="px-6 py-3">{(page - 1) * 5 + index + 1}</td>
              <td className="px-6 py-3">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Avatar"
                  className="rounded-full w-10 h-10"
                />
              </td>
              <td className="px-6 py-3">{row.name}</td>
              <td className="px-6 py-3">{row.email}</td>
              <td className="px-6 py-3">{row.phone}</td>
              <td className="px-6 py-3">{row.address.district}</td>
              <td className="px-6 py-3 text-right">{row.address.city}</td>
              <td className="px-6 py-3 text-right">{row.address.pincode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
