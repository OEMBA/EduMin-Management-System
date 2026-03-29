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
  const guardianName = String(student?.guardianName ?? student?.guardian?.name ?? '').trim()
  const guardianContact = String(student?.guardianContact ?? student?.guardian?.contact ?? '').trim()
  const studentRelationship = String(student?.studentRelationship ?? student?.guardian?.relationship ?? '').trim()

  return {
    studentID: String(student?.studentID ?? '').trim(),
    firstName: String(student?.firstName ?? '').trim(),
    otherNames: String(student?.otherNames ?? student?.otherName ?? '').trim(),
    secondName: String(student?.secondName ?? student?.lastName ?? '').trim(),
    gender: String(student?.gender ?? '').trim(),
    dateOfBirth: String(student?.dateOfBirth ?? '').trim(),
    email: String(student?.email ?? '').trim(),
    phone: String(student?.phone ?? '').trim(),
    level: String(student?.level ?? '').trim(),
    programOfStudy: String(student?.programOfStudy ?? student?.program ?? '').trim(),
    guardianName,
    guardianContact,
    studentRelationship,
    guardian: {
      name: guardianName,
      contact: guardianContact,
      relationship: studentRelationship,
    },
  }
}

export function getStudentFullName(student) {
  const s = normalizeStudent(student)
  return [s.firstName, s.otherNames, s.secondName].filter(Boolean).join(' ')
}

