import type { LucideIcon } from 'lucide-react'
import { BookOpen, Code2, FileText, FlaskConical, GraduationCap, Newspaper, PlayCircle, Presentation, Video } from 'lucide-react'

export type ResourceTypeId =
  | 'documentation'
  | 'blog'
  | 'case-studies'
  | 'whitepapers'
  | 'research'
  | 'guides'
  | 'webinars'
  | 'videos'
  | 'api'

export interface ResourceType {
  id: ResourceTypeId
  title: string
  icon: LucideIcon
  description: string
  /** 'available' links somewhere real; 'soon' renders a request-access CTA instead of a dead link. */
  status: 'available' | 'soon'
}

export const resourceTypes: ResourceType[] = [
  { id: 'documentation', title: 'Documentation', icon: BookOpen, description: 'Deployment, configuration and administration guides.', status: 'soon' },
  { id: 'api', title: 'API Documentation', icon: Code2, description: 'Reference for alert scores, enrichment and case endpoints.', status: 'soon' },
  { id: 'whitepapers', title: 'Whitepapers', icon: FileText, description: 'Deep dives into impact-aware alert prioritization.', status: 'available' },
  { id: 'research', title: 'Research', icon: FlaskConical, description: 'Methodology and evaluation behind the CAAP engine.', status: 'available' },
  { id: 'case-studies', title: 'Case Studies', icon: Presentation, description: 'How early-access partners deploy MediSIEM.', status: 'soon' },
  { id: 'guides', title: 'Security Guides', icon: GraduationCap, description: 'Practical guidance for SOC and security leaders.', status: 'soon' },
  { id: 'blog', title: 'Blog', icon: Newspaper, description: 'Product news, threat analysis and engineering notes.', status: 'soon' },
  { id: 'webinars', title: 'Webinars', icon: Video, description: 'Live sessions with the MediSIEM team.', status: 'soon' },
  { id: 'videos', title: 'Product Videos', icon: PlayCircle, description: 'Short walkthroughs of the platform.', status: 'soon' },
]
