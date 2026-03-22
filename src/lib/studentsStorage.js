const STORAGE_KEY = 'students'

export function loadStudents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveStudents(students) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students))
}

export function normalizeStudent(student) {
  return {
    studentID: String(student?.studentID ?? '').trim(),
    firstName: String(student?.firstName ?? '').trim(),
    otherNames: String(student?.otherNames ?? student?.otherName ?? '').trim(),
    secondName: String(student?.secondName ?? student?.lastName ?? '').trim(),
    dateOfBirth: String(student?.dateOfBirth ?? '').trim(),
    level: String(student?.level ?? '').trim(),
    programOfStudy: String(student?.programOfStudy ?? student?.program ?? '').trim(),
  }
}

export function getStudentFullName(student) {
  const s = normalizeStudent(student)
  return [s.firstName, s.otherNames, s.secondName].filter(Boolean).join(' ')
}

