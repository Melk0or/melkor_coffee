interface SuccessData {
    databaseID: number
    sum: number
    from: number
    to: number
}

interface FailedData {
    errorMessage: string
    errorCode: number
}

interface PaymentData {
    sum: string
    from: number
    to: number
}

interface RequestInterface extends PaymentData {}

enum ResStatus {
    SUCCESS = 'success',
    FAILED = 'FAILED',
}

interface ResponseInterface {
    status: ResStatus
    data: SuccessData | FailedData
}

async function fetchingData(req: RequestInterface): Promise<ResponseInterface> {
    const data = await fetch('/dfd')
    const res: ResponseInterface = await data.json()
    return res
}
