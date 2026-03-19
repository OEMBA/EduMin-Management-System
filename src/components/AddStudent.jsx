import { useState } from "react"
import "../styling/addstudent.css"

function AddStudent() {
    const [formData, setFormData] = useState({
        firstName: "",
        secondName: "",
        otherName: "",
        dateOfBirth: "",
        email: "",
        phoneNumber: "",
        program: "",
        level: "",
        studentId: ""
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newStudent = {
            id: formData.studentId,
            fullName: `${formData.firstName} ${formData.secondName} ${formData.otherName}`.trim(),
            dateOfBirth: formData.dateOfBirth,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            program: formData.program,
            level: formData.level,
        }

        const existing = JSON.parse(localStorage.getItem("students")) || []
        existing.push(newStudent)
        localStorage.setItem("students", JSON.stringify(existing))

        // Reset form
        setFormData({
            firstName: "", secondName: "", otherName: "",
            dateOfBirth: "", email: "", phoneNumber: "",
            program: "", level: "", studentId: ""
        })

        alert("Student added successfully!")
    }

    return (
        <section className="addstudent-section">
            <div className="heading">
                <h2>Add New Student</h2>
                <p>Enroll a new student into the institutional database</p>
            </div>

            <div className="some-arc"></div>

            <form className="others" onSubmit={handleSubmit}>
                <div className="personal-info">
                    <i className="fa-regular fa-user"></i>
                    <h3>Personal Information</h3>
                </div>

                <div className="personal-inputs">
                    <div className="input">
                        <label htmlFor="firstName">First Name*</label>
                        <input type="text" name="firstName" autoFocus placeholder="eg. Samuel" value={formData.firstName} onChange={handleChange} required />
                    </div>

                    <div className="input">
                        <label htmlFor="secondName">Second Name</label>
                        <input type="text" name="secondName" placeholder="eg. Samuel" value={formData.secondName} onChange={handleChange} />
                    </div>

                    <div className="input">
                        <label htmlFor="otherName">Other Name*</label>
                        <input type="text" name="otherName" placeholder="eg. Samuel" value={formData.otherName} onChange={handleChange} required />
                    </div>

                    <div className="input">
                        <label htmlFor="dateOfBirth">Date Of Birth*</label>
                        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                    </div>

                    <div className="input">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder="name@gmail.com" value={formData.email} onChange={handleChange} />
                    </div>

                    <div className="input">
                        <label htmlFor="phoneNumber">Phone Number*</label>
                        <input type="tel" name="phoneNumber" placeholder="0212345667" maxLength={10} minLength={10} pattern="[0-9]{10}" value={formData.phoneNumber} onChange={handleChange} required />
                    </div>
                </div>

                <div className="academic-details">
                    <div className="top">
                        <i className="fa-solid fa-graduation-cap"></i>
                        <h5>Academic Details</h5>
                    </div>

                    <div className="academic-inputs">
                        <div className="inputs">
                            <div className="input">
                                <label htmlFor="program">Program Of Study*</label>
                                <select name="program" id="programs" value={formData.program} onChange={handleChange} required>
                                    <option value="" disabled hidden>Choose your program</option>
                                    <option value="BSc. Computer Science">BSc. Computer Science</option>
                                    <option value="BSc. Information Technology">BSc. Information Technology</option>
                                    <option value="BBA. Business Administration">BBA. Business Administration</option>
                                    <option value="BSc. Data Science & AI">BSc. Data Science & AI</option>
                                    <option value="BSc. Cyber Security">BSc. Cyber Security</option>
                                    <option value="BEng. Mechanical Engineering">BEng. Mechanical Engineering</option>
                                    <option value="BSc. Accounting & Finance">BSc. Accounting & Finance</option>
                                </select>
                            </div>

                            <div className="input">
                                <label htmlFor="level">Level*</label>
                                <select name="level" id="level" value={formData.level} onChange={handleChange} required>
                                    <option value="" disabled hidden>Select your level</option>
                                    <option value="Undergraduate">Undergraduate</option>
                                    <option value="Graduate">Graduate</option>
                                    <option value="Postgraduate">Postgraduate</option>
                                </select>
                            </div>

                            <div className="input">
                                <label htmlFor="studentId">Student Id*</label>
                                <input type="text" name="studentId" placeholder="eg. STU-2024-001" value={formData.studentId} onChange={handleChange} required />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="buttons">
                    <button type="submit">Submit Student Record</button>
                    <button type="button" onClick={() => setFormData({
                        firstName: "", secondName: "", otherName: "",
                        dateOfBirth: "", email: "", phoneNumber: "",
                        program: "", level: "", studentId: ""
                    })}>Cancel</button>
                </div>
            </form>
        </section>
    )
}

export default AddStudent