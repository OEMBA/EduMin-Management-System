import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInstitution } from '../../context/InstitutionContext.jsx'

export function Onboarding() {
  const navigate = useNavigate()
  const { setInstitution } = useInstitution()
  const [form, setForm] = useState({
    institutionName: '',
    address: '',
    adminName: '',
  })

  function setField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function onSubmit(e) {
    e.preventDefault()
    if (!form.institutionName.trim() || !form.address.trim() || !form.adminName.trim()) {
      return
    }

    setInstitution(form)
    navigate('/dashboard', { replace: true })
  }

  return (
    <section className="onboardPage">
      <form className="onboardCard" onSubmit={onSubmit}>
        <h1>Set up your Institution</h1>
        <p>Provide your organization details to continue into the dashboard.</p>

        <label className="onboardField">
          <span>Institution Name</span>
          <input
            value={form.institutionName}
            onChange={(e) => setField('institutionName', e.target.value)}
            placeholder="e.g. Accra Technical College"
            required
          />
        </label>

        <label className="onboardField">
          <span>Address</span>
          <input
            value={form.address}
            onChange={(e) => setField('address', e.target.value)}
            placeholder="e.g. Ring Road Central, Accra"
            required
          />
        </label>

        <label className="onboardField">
          <span>Administrator Name</span>
          <input
            value={form.adminName}
            onChange={(e) => setField('adminName', e.target.value)}
            placeholder="e.g. Emma Boateng"
            required
          />
        </label>

        <div className="onboardActions">
          <button className="btnPrimary" type="submit">
            Continue to Dashboard
          </button>
        </div>
      </form>
    </section>
  )
}
