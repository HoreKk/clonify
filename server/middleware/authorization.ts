import type { IncomingMessage, ServerResponse } from 'http'
import { useCookie } from 'h3'

export default async (req: IncomingMessage, res: ServerResponse) => {
  const token = useCookie(req, 'clonify-auth-token')
  if (token && !req.headers['Authorization']) req.headers['Authorization'] = token
}