export function Dashboard() {
  return (
    <section className="page">
      <div className="dashGrid">
        <div className="dashHero">
          <div className="dashHeroTop">Academic Year Overview</div>
          <div className="dashHeroRow">
            <div className="dashHeroTitle">Total Enrolled&nbsp;&nbsp;Students</div>
            <div className="dashHeroStat">
              <div className="dashHeroValue">1,250</div>
              <div className="dashHeroSub">Active Records</div>
            </div>
          </div>
        </div>

        <div className="dashLower">
          <div className="dashPanelNavy">
            <div className="dashPanelHeader">
              <div className="dashPanelTitle">⏱ Recently Admitted</div>
              <a className="dashLink" href="#">
                View All
              </a>
            </div>

            <div className="dashList">
              <div className="admitRow">
                <div className="avatarCircle">AL</div>
                <div>
                  <div className="admitName">Alex Johnson</div>
                  <div className="admitMeta">Grade 10 • General Science</div>
                </div>
                <div className="pill pillVerified">Verified</div>
              </div>

              <div className="admitRow">
                <div className="avatarCircle">SS</div>
                <div>
                  <div className="admitName">Sarah Smith</div>
                  <div className="admitMeta">Grade 08 • Arts</div>
                </div>
                <div className="pill pillVerified">Verified</div>
              </div>

              <div className="admitRow">
                <div className="avatarCircle">MA</div>
                <div>
                  <div className="admitName">Michael Abbeng</div>
                  <div className="admitMeta">Grade 12 • Economics</div>
                </div>
                <div className="pill pillPending">Pending</div>
              </div>

              <div className="admitRow">
                <div className="avatarCircle">EM</div>
                <div>
                  <div className="admitName">Emily Martin</div>
                  <div className="admitMeta">Grade 09 • Commerce</div>
                </div>
                <div className="pill pillVerified">Verified</div>
              </div>

              <div className="admitRow">
                <div className="avatarCircle">DL</div>
                <div>
                  <div className="admitName">David Lee</div>
                  <div className="admitMeta">Grade 11 • General Science</div>
                </div>
                <div className="pill pillVerified">Verified</div>
              </div>
            </div>
          </div>

          <div className="dashPanelNavy">
            <div className="dashPanelHeader">
              <div className="dashPanelTitle">📅 Upcoming Activities</div>
              <span />
            </div>

            <div className="events">
              <div className="eventRow">
                <div className="dateBox">
                  <div className="dateBoxMonth">MAR</div>
                  <div className="dateBoxDay">30</div>
                </div>
                <div>
                  <div className="eventTitle">Project Presentation</div>
                  <div className="eventSub">9:00 AM - 12:00 PM</div>
                </div>
              </div>

              <div className="eventRow">
                <div className="dateBox">
                  <div className="dateBoxMonth">APR</div>
                  <div className="dateBoxDay">04</div>
                </div>
                <div>
                  <div className="eventTitle">Faculty Meeting</div>
                  <div className="eventSub">Conference Hall A</div>
                </div>
              </div>

              <div className="eventRow">
                <div className="dateBox">
                  <div className="dateBoxMonth">AUG</div>
                  <div className="dateBoxDay">01</div>
                </div>
                <div>
                  <div className="eventTitle">Annual Sports Day</div>
                  <div className="eventSub">Main Stadium</div>
                </div>
              </div>

              <button className="dashAddEvent" type="button">
                Add Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard

