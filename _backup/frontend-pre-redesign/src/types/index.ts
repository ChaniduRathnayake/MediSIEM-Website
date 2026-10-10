export interface Milestone {
  _id: string
  title: string
  date: string
  dateLabel: string
  description: string
  status: 'completed' | 'upcoming'
  marks: number | null
  order: number
}

export interface ProjectDocument {
  _id: string
  title: string
  category: 'document' | 'presentation'
  fileUrl: string
  date: string
  description: string
}

export interface TeamMember {
  _id: string
  name: string
  studentId: string
  role: string
  component: string
  email: string
  linkedin: string
  photoUrl: string
  order: number
}

export interface ApiResponse<T> {
  success: boolean
  data: T
}
