type BrowserResponse = {
  status: number
  statusText: string
  responseHeaders: Array<{
    name: string
    value: string
  }>
}

export function extractNetworkResponse(browserResponse: BrowserResponse) {
  return {
    status: browserResponse.status,
    statusText: browserResponse.statusText,
  }
}
