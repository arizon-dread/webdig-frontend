export interface Result {
    name: string
    dnsNames?: string[]
    ipAddresses?: string[]
    error?: string
    cnameFor?: string
}

export interface LookupResponse {
    results: Result[]
    error: string
}