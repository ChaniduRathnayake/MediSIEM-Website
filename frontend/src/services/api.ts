import axios from 'axios'
import fallbackData from '../data/fallbackData.json'
import type { ApiResponse, Milestone, ProjectDocument, TeamMember } from '../types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// The Render free tier can take several seconds to wake from sleep, but the
// site must never look empty during a demo. 5s is long enough for a warm
// server to respond, short enough that a sleeping one falls back fast.
const REQUEST_TIMEOUT_MS = 5000

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: REQUEST_TIMEOUT_MS,
})

export async function fetchMilestones(): Promise<Milestone[]> {
  try {
    const { data } = await api.get<ApiResponse<Milestone[]>>('/milestones')
    return data.data
  } catch {
    return fallbackData.milestones as Milestone[]
  }
}

export async function fetchDocuments(category?: 'document' | 'presentation'): Promise<ProjectDocument[]> {
  try {
    const { data } = await api.get<ApiResponse<ProjectDocument[]>>('/documents', {
      params: category ? { category } : undefined,
    })
    return data.data
  } catch {
    const docs = fallbackData.documents as ProjectDocument[]
    return category ? docs.filter((doc) => doc.category === category) : docs
  }
}

export async function fetchTeam(): Promise<TeamMember[]> {
  try {
    const { data } = await api.get<ApiResponse<TeamMember[]>>('/team')
    return data.data
  } catch {
    return fallbackData.team as TeamMember[]
  }
}

export interface ContactPayload {
  name: string
  email: string
  message: string
  /** Honeypot: always empty for humans. See LeadForm. */
  website?: string
}

export async function submitContactMessage(payload: ContactPayload): Promise<void> {
  await api.post('/contact', payload)
}
