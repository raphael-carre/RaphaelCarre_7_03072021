class Request {
    constructor() {
        this.BASE_API_URL = 'http://localhost:3080/api'
    }

    apiCall = async (uri, data = null, method = null) => {
        const response = await fetch(`${this.BASE_API_URL}${uri}`, {
            method: this.getFetchMethod(data, method),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: typeof data === 'object' && data !== null  ? JSON.stringify(data) : null
        })
        
        const responseData = await response.json()
        
        if (!response.ok) return { data: responseData, error: true }

        return { data: responseData }
    }

    getFetchMethod = (data, method) => {
        if (typeof data === 'string') {
            if (data === 'DELETE') return data
            throw new Error('Invalid method')
        }
        
        if (typeof data === 'object' && data !== null) {
            if (method && method === 'PUT') return method
            if (method && method !== 'PUT') throw new Error('Invalid method')
            return 'POST'
        }

        return 'GET'
    }
}

export default new Request()