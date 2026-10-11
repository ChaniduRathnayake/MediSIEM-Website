// Lead-form topics. The key is used in links as ?intent=<key>.
export const INTENTS = {
  pilot: 'Request a pilot',
  research: 'Research collaboration',
  enterprise: 'Enterprise discussion',
  demo: 'Book a demo',
  expert: 'Talk to a security expert',
  partner: 'Design partner',
  integration: 'Request an integration',
  security: 'Security report or question',
  resource: 'Request a resource',
  general: 'General question',
} as const

export type Intent = keyof typeof INTENTS

/** Topics that also ask for device count and current SIEM. */
export const DEPLOYMENT_INTENTS: Intent[] = ['pilot', 'enterprise', 'demo']

export function parseIntent(value: string | null): Intent {
  return value && value in INTENTS ? (value as Intent) : 'general'
}
