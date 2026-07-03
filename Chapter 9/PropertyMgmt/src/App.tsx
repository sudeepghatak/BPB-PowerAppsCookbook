import { useEffect, useState } from 'react'
import './App.css'
import { getContext } from '@microsoft/power-apps/app'
import { DataverseTablesSection } from './components/DataverseTablesSection.tsx'
import { PowerAppsContextSection } from './components/PowerAppsContextSection.tsx'
import { NotifyFlowSection } from './components/NotifyFlowSection.tsx'
import { formatError, useDataverseTables } from './features/dataversePreview.ts'

type AppContext = Awaited<ReturnType<typeof getContext>>

function App() {
  const [ctx, setCtx] = useState<AppContext | null>(null)
  const [ctxError, setCtxError] = useState<string | null>(null)
  const { tables, loading, error } = useDataverseTables(Boolean(ctx))

  useEffect(() => {
    getContext()
      .then(setCtx)
      .catch((err: unknown) => setCtxError(formatError(err)))
  }, [])

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">PropertyMgmt</p>
        <h1>Power Apps context and Dataverse preview</h1>
        <p className="hero-copy">
          The page shows the current session details and rows from the configured Dataverse tables connected to the app.
        </p>
      </section>

      <NotifyFlowSection />
      <PowerAppsContextSection ctx={ctx} error={ctxError} />
      <DataverseTablesSection tables={tables} loading={loading} error={error} />
    </main>
  )
}

export default App
