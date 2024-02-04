export interface Result {
    name: string
    dnsNames?: string[]
    ipAddresses?: string[]
    error?: string
}

export interface LookupResponse {
    results: Result[]
    error: string
}