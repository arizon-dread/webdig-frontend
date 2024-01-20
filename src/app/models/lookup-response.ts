export interface LookupResponse {
    dnsNames?: string[]
    internalIPAddresses?: string[]
    externalIPAddresses?: string[]
    err?: string
    machineLookupResponse?: string
}
