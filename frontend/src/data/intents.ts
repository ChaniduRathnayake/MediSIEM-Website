// Lead-form topics. The key is used in links as ?intent=<key>.
export const INTENTS = {
  demo: 'Book a demo',
  quote: 'Request a setup quote',
  trial: 'Start a free trial',
  sales: 'Talk to sales',
  expert: 'Talk to a security expert',
  partner: 'Early-access / design partner',
  integration: 'Request an integration',
  security: 'Security report or question',
  resource: 'Request a resource',
  general: 'General question',
} as const

export type Intent = keyof typeof INTENTS

export function parseIntent(value: string | null): Intent {
  return value && value in INTENTS ? (value as Intent) : 'general'
}
