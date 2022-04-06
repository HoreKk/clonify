import { murmurHashV3 } from 'murmurhash-es'
import { useClonify } from '~~/stores/spotify';

type RequestOptions = {
	method?: string
	body?: Record<string, unknown>
	pick?: string
	headers?: HeadersInit
	params?: Record<string, unknown>,
	server?: boolean,
	default?: () => unknown,
	transform?: (data: unknown) => unknown,
}

function getBaseURL() {
	// const config = useRuntimeConfig() as { API_URL: string }
	return process.server ? 'https://api.spotify.com/' : '/v1'
}

export const useApi = async <Result = unknown>(
	endpoint: string,
	opts?: RequestOptions
) => {
  const clonifyStore = useClonify();  
	const baseURL = getBaseURL()
	let headers = process.server ? useRequestHeaders(['Authorization']) : { 'Authorization': clonifyStore.token }

	headers = { ...headers, ...opts?.headers }

	return useLazyFetch(endpoint, {
		method: opts?.method,
		body: opts?.body,
		baseURL,
		headers,
		server: opts?.server,
		default: opts?.default ? opts?.default : () => undefined,
		params: opts?.params,
		transform: (data) => {
			let result = data
			if (opts?.pick) result = data[opts.pick]
			if (opts?.transform) result = opts.transform(result)
			return result
		},
		// The default key implementation includes the baseURL in the hasing process.
		// As this is different for server and client, the default implementation leads to different
		// keys, resulting in hydration errors.
		key: '$api-' + murmurHashV3(JSON.stringify({ endpoint, opts })).toString(),
	})
}