import type { IncomingMessage, ServerResponse } from 'http'
import { createProxyMiddleware } from 'http-proxy-middleware'
import config from '#config'

// Temporary dev proxy until @nuxtjs/proxy module is available.

const apiProxyMiddleware = createProxyMiddleware('/v1/**', {
	target: 'https://api.spotify.com/v1/',
	changeOrigin: true,
	pathRewrite: { '^/v1/': '/' },
	logLevel: 'debug',
  onError(err, req, res) {
    console.error(err)
  }
})

export default async (req: IncomingMessage, res: ServerResponse) => {
	// Workaround for h3 not awaiting next.
	await new Promise<void>((resolve, reject) => {
		const next = (err?: unknown) => {
			if (err) {
				reject(err)
			} else {
				resolve()
			}
		}

		// @ts-expect-error -- incompatible types express.Request and http.IncomingMessage. This still works though.
		apiProxyMiddleware(req, res, next)
	})
}