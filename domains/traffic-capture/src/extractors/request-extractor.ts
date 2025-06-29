type BrowserRequest = {
  requestId: string
  url: string
  method: string
  timeStamp: number
  requestHeaders: Array<{
    name: string
    value: string
  }>
}

export function extractNetworkRequest(browserRequest: BrowserRequest) {
  const headers: Record<string, string> = {}
  for (const header of browserRequest.requestHeaders) {
    headers[header.name] = header.value
  }

  return {
    id: browserRequest.requestId,
    url: browserRequest.url,
    method: browserRequest.method,
    timestamp: browserRequest.timeStamp,
    headers,
  }
}
