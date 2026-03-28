import { useNavigate } from 'react-router-dom'

export function Landing() {
  const navigate = useNavigate()

  return (
    <section className="landingPage">
      <div className="landingTopBar">
        <div className="landingBrand">
          <img src="/graduate-hat.svg" alt="EduMin logo" width="28" height="28" />
          <span>EduMin</span>
        </div>
        <a className="landingContact" href="mailto:emmba67@gmail.com">
          emmba67@gmail.com
        </a>
      </div>

      <div className="landingHero">
        <p className="landingEyebrow">School Management Platform</p>
        <h1>Manage Students and Events from one place</h1>
        <p>
          Track enrollment, update student records, and monitor upcoming activities with a clean, simple,
          and fast workflow.
        </p>
        <button type="button" className="landingCta" onClick={() => navigate('/onboard')}>
          Get Started 🙂
        </button>
      </div>

      <div className="landingFeatures">
        <article className="landingFeatureCard">
          <h3>Student Enrollment</h3>
          <p>Add and maintain student records with easy editing and deletion tools.</p>
        </article>
        <article className="landingFeatureCard">
          <h3>Event Tracking</h3>
          <p>Create campus events and keep your dashboard aligned with upcoming activities.</p>
        </article>
        <article className="landingFeatureCard">
          <h3>Action Notifications</h3>
          <p>Stay informed with notifications for student and event updates.</p>
        </article>
      </div>
    </section>
  )
}
