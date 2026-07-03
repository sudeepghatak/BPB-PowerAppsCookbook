import type { DataverseTablePreview } from '../features/dataversePreview.ts'
import { formatDataverseValue, getVisibleColumnNames } from '../features/dataversePreview.ts'

type DataverseTablesSectionProps = {
  tables: DataverseTablePreview[]
  loading: boolean
  error: string | null
}

export function DataverseTablesSection({ tables, loading, error }: DataverseTablesSectionProps) {
  return (
    <section className="panel">
      <div className="section-heading">
        <h2>Dataverse Tables</h2>
        {loading && <span className="status">Loading table items...</span>}
      </div>
      {error && <p className="status error">Error: {error}</p>}
      {!loading && !error && tables.length === 0 && (
        <p className="status">No Dataverse tables were returned.</p>
      )}
      <div className="table-list">
        {tables.map((table) => {
          const columnNames = getVisibleColumnNames(table.rows)

          return (
            <article className="table-card" key={table.logicalName}>
              <div className="table-card-header">
                <div>
                  <h3>{table.displayName}</h3>
                  <p>{table.logicalName}</p>
                </div>
                <span>{table.rows.length} item{table.rows.length === 1 ? '' : 's'}</span>
              </div>

              {table.error && <p className="status error">{table.error}</p>}
              {!table.error && table.rows.length === 0 && <p className="status">No rows returned for this table.</p>}
              {!table.error && table.rows.length > 0 && columnNames.length === 0 && (
                <p className="status">No business columns available to display for this table.</p>
              )}

              {table.rows.length > 0 && columnNames.length > 0 && (
                <div className="records-table-wrap">
                  <table className="records-table">
                    <thead>
                      <tr>
                        {columnNames.map((columnName) => (
                          <th key={columnName}>{columnName}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {table.rows.map((row, rowIndex) => (
                        <tr key={`${table.logicalName}-${rowIndex}`}>
                          {columnNames.map((columnName) => (
                            <td key={columnName}>{formatDataverseValue(row[columnName])}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}

