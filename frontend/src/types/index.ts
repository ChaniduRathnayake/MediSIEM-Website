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

// The API strips internal-only fields (IDs, emails) before sending.
export interface TeamMember {
  _id: string
  name: string
  role: string
  component: string
  linkedin: string
  photoUrl: string
  order: number
}

export interface ApiResponse<T> {
  success: boolean
  data: T
}
