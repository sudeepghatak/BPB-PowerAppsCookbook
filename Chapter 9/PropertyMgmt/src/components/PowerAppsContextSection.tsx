import { getContext } from '@microsoft/power-apps/app'

type AppContext = Awaited<ReturnType<typeof getContext>>

type PowerAppsContextSectionProps = {
  ctx: AppContext | null
  error: string | null
}

export function PowerAppsContextSection({ ctx, error }: PowerAppsContextSectionProps) {
  return (
    <section className="panel">
      <h2>Power Apps Context</h2>
      {error && <p className="status error">Error: {error}</p>}
      {!ctx && !error && <p className="status">Loading context...</p>}
      {ctx && (
        <table className="context-table">
          <tbody>
            <tr><th>App ID</th><td>{ctx.app.appId}</td></tr>
            <tr><th>Environment ID</th><td>{ctx.app.environmentId}</td></tr>
            <tr><th>Query Params</th><td><code>{JSON.stringify(ctx.app.queryParams)}</code></td></tr>
            <tr><th>Full Name</th><td>{ctx.user.fullName}</td></tr>
            <tr><th>Object ID</th><td>{ctx.user.objectId}</td></tr>
            <tr><th>Tenant ID</th><td>{ctx.user.tenantId}</td></tr>
            <tr><th>User Principal Name</th><td>{ctx.user.userPrincipalName}</td></tr>
            <tr><th>Session ID</th><td>{ctx.host.sessionId}</td></tr>
          </tbody>
        </table>
      )}
    </section>
  )
}
