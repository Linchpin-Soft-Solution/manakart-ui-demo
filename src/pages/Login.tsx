import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight, Info, ArrowRight } from 'lucide-react'
import { useStore } from '../context/StoreContext'

type Mode = 'login' | 'register'

export function Login() {
  const navigate = useNavigate()
  const { toast } = useStore()
  const [mode, setMode] = useState<Mode>('login')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    toast(mode === 'login' ? 'Signed in (demo)' : 'Account created (demo)')
    navigate('/')
  }

  return (
    <main className="container page-login" data-screen-label="Login">
      <nav className="crumb" style={{ padding: '22px 0 0' }}>
        <Link to="/">Home</Link>
        <ChevronRight strokeWidth={2} />
        <span style={{ color: 'var(--ink)' }}>{mode === 'login' ? 'Login' : 'Register'}</span>
      </nav>

      <section className="content-hero" style={{ textAlign: 'center' }}>
        <h1>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
        <p className="lead-copy" style={{ margin: '14px auto 0' }}>
          {mode === 'login'
            ? 'Sign in to track orders, manage your cart and reorder from saved sellers.'
            : 'Join Manakart to source from verified MSMEs with GST invoices and bulk pricing.'}
        </p>
      </section>

      <div className="form-wrap">
        <div className="auth-card">
          <div className="auth-tabs">
            <button className={`auth-tab${mode === 'login' ? ' active' : ''}`} onClick={() => setMode('login')}>Sign in</button>
            <button className={`auth-tab${mode === 'register' ? ' active' : ''}`} onClick={() => setMode('register')}>Create account</button>
          </div>

          <form onSubmit={submit}>
            {mode === 'register' && (
              <div className="field">
                <label htmlFor="name">Full name / business name</label>
                <input id="name" type="text" placeholder="Saraswati Brass Works" required />
              </div>
            )}
            <div className="field">
              <label htmlFor="email">Email or phone</label>
              <input id="email" type="text" placeholder="you@business.in" required />
            </div>
            <div className="field">
              <label htmlFor="pwd">Password</label>
              <input id="pwd" type="password" placeholder="••••••••" required />
            </div>
            {mode === 'register' && (
              <div className="field">
                <label htmlFor="gstin">GSTIN <span style={{ color: 'var(--ink-3)', fontWeight: 400 }}>(optional)</span></label>
                <input id="gstin" type="text" placeholder="22AAAAA0000A1Z5" />
              </div>
            )}
            <button type="submit" className="btn btn-primary btn-block" style={{ height: 50, fontSize: 16, marginTop: 4 }}>
              {mode === 'login' ? 'Sign in' : 'Create account'}<ArrowRight strokeWidth={2} />
            </button>
          </form>

          <p className="form-meta">
            {mode === 'login'
              ? <>New to Manakart? <a onClick={() => setMode('register')} style={{ cursor: 'pointer' }}>Create an account</a></>
              : <>Already registered? <a onClick={() => setMode('login')} style={{ cursor: 'pointer' }}>Sign in</a></>}
          </p>

          <div className="demo-note">
            <Info strokeWidth={2} />
            <span>Demo only — no credentials are sent or stored. Submitting just fires a toast and returns you home.</span>
          </div>
        </div>
      </div>
    </main>
  )
}
