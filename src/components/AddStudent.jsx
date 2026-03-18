import "../styling/addstudent.css"

function AddStudent() {
    return (
        <section className="addstudent-section">
            <div className="heading">
                <h2>Add New Student</h2>
                <p>Enroll a new student into the institutional database</p>
            </div>

            <div className="some-arc"></div>

            <form className="others" action="submit">
                <div className="personal-info">
                    <i class="fa-regular fa-user"></i>
                    <h3>Personal Information</h3>
                </div>

                <div className="personal-inputs">
                    <div className="input">
                        <label htmlFor="FirstName">First Name*</label>
                        <input type="text" autoFocus placeholder="eg. Samuel" required />
                    </div>

                    <div className="input">
                        <label htmlFor="SecondName">Second Name</label>
                        <input type="text" placeholder="eg. Samuel" />
                    </div>

                    <div className="input">
                        <label htmlFor="OtherName">Other Name*</label>
                        <input type="text" placeholder="eg. Samuel" required />
                    </div>

                    <div className="input">
                        <label htmlFor="DateOfBirth">Date Of Birth*</label>
                        <input type="date" required />
                    </div>

                    <div className="input">
                        <label htmlFor="Email">Email</label>
                        <input type="email" placeholder="name@gmail.com" />
                    </div>

                    <div className="input">
                        <label htmlFor="phoneNumber">Phone Number*</label>
                        <input type="tel" placeholder="0212345667" maxLength={10} minLength={10} pattern="[0-9]{10}" required />
                    </div>
                </div>

                <div className="academic-results">
                    <div className="top">
                        <i class="fa-solid fa-graduation-cap"></i>
                        <h5>Academic Details</h5>
                    </div>

                    <div className="academic-inputs">
                        <div className="inputs">
                            <div className="input">
                                <label htmlFor="Program">Program Of Study</label>
                                <select name="Programs" id="programs" defaultValue="" placeholder="Enter">
                                    <option value="" disabled hidden>Choose your program</option>
                                    <option value="cs">BSc. Computer Science</option>
                                    <option value="it">BSc. Information Technology</option>
                                    <option value="ba">BBA. Business Administration</option>
                                    <option value="ds">BSc. Data Science & AI</option>
                                    <option value="cy">BSc. Cyber Security</option>
                                    <option value="me">BEng. Mechanical Engineering</option>
                                    <option value="acc">BSc. Accounting & Finance</option>
                                </select>
                            </div>

                            <div className="input">
                                <label htmlFor="level">Level</label>
                                <select name="level" id="level">
                                    <option value="" disabled hidden>Select your level</option>
                                    <option value="100">100</option>
                                    <option value="200">200</option>
                                    <option value="300">300</option>
                                    <option value="400">400</option>
                                </select>
                            </div>

                            <div className="input">
                                <label htmlFor="id">Student Id</label>
                                <input type="text" placeholder="Enter your ID" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="buttons">
                    <button type="sumbit">Submit Student Record</button>
                    <button type="button">Cancel</button>
                </div>
            </form>
        </section>
    )
}

export default AddStudent
