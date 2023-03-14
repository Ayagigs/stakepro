class HttpResponse {
    constructor(status, message, data) {
        this.data = data
        this.status = status
        this.message = message
    }
}

export default HttpResponse;  