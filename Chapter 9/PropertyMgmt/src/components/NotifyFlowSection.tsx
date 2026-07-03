import { type FormEvent, useState } from 'react'
import { PM_NotifyService } from '../generated/services/PM_NotifyService.ts'

type SubmitState = 'idle' | 'sending' | 'success' | 'error'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function formatError(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message
  }

  if (typeof error === 'string') {
    return error
  }

  return 'Unable to call PM_NotifyService right now.'
}

export function NotifyFlowSection() {
  const [email, setEmail] = useState('')
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [message, setMessage] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const normalizedEmail = email.trim()
    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      setSubmitState('error')
      setMessage('Enter a valid email address before sending.')
      return
    }

    setSubmitState('sending')
    setMessage(null)

    try {
      const result = await PM_NotifyService.Run({ email: normalizedEmail })
      if (result.success) {
        setSubmitState('success')
        setMessage('Flow executed successfully.')
        return
      }

      setSubmitState('error')
      setMessage(result.error?.message ?? 'Flow execution failed.')
    } catch (error: unknown) {
      setSubmitState('error')
      setMessage(formatError(error))
    }
  }

  return (
    <section className="panel">
      <h2>Notify Service</h2>
      <p className="status">Provide an email and invoke PM_NotifyService.</p>

      <form className="notify-form" onSubmit={handleSubmit}>
        <label className="notify-label" htmlFor="notify-email-input">Email</label>
        <div className="notify-row">
          <input
            id="notify-email-input"
            className="notify-input"
            type="email"
            placeholder="user@contoso.com"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={submitState === 'sending'}
            required
          />
          <button className="notify-button" type="submit" disabled={submitState === 'sending'}>
            {submitState === 'sending' ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>

      {message && (
        <p className={`status ${submitState === 'error' ? 'error' : 'success'}`}>{message}</p>
      )}
    </section>
  )
}
