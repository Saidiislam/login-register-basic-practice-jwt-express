const qs = require('qs');

const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH'
} 

export const CONTENT_TYPE = {
    MULTIPART: 'multipart/form-data',
    JSON: 'application/json',
    URLENCODED: 'application/x-www-form-urlencoded'
}

class ApiStructure {
    HOST = 'http://localhost:5000/'

    async get(endpoint, payload) {
        const params = qs.stringify(payload)
        return this.genericFetch(`${endpoint}?${params}`, METHOD.GET, null)
    }

    async post(endpoint, payload, contentType) {
        let requestBody
        let extheaders

        if (contentType === CONTENT_TYPE.JSON) {
            requestBody = JSON.stringify(payload)
        }
        if (contentType === CONTENT_TYPE.MULTIPART) {
            requestBody = new FormData()
            for (const name in payload) {
                requestBody.append(name, payload[name])
            }
        }
        if (contentType === CONTENT_TYPE.URLENCODED) {
            requestBody = qs.stringify(payload)
        }

        extheaders = {
            'Content-Type' : 'application/json'
        }

        return this.genericFetch(endpoint, METHOD.POST, requestBody, extheaders)
    }

    async put(endpoint, payload, contentType) {
        let requestBody
        let extheaders

        if (contentType === CONTENT_TYPE.JSON) {
            requestBody = JSON.stringify(payload)
        }
        if (contentType === CONTENT_TYPE.MULTIPART) {
            requestBody = new FormData()
            for (const name in payload) {
                requestBody.append(name, payload[name])
            }
        }
        if (contentType === CONTENT_TYPE.URLENCODED) {
            requestBody = qs.stringify(payload)
        }

        extheaders = {
            'Content-Type' : 'application/json'
        }

        return this.genericFetch(endpoint, METHOD.PUT, requestBody, extheaders)
    }

    async delete(endpoint, payload, contentType) {
        let requestBody
        let extheaders

        if (contentType === CONTENT_TYPE.JSON) {
            requestBody = JSON.stringify(payload)
        }
        if (contentType === CONTENT_TYPE.MULTIPART) {
            requestBody = new FormData()
            for (const name in payload) {
                requestBody.append(name, payload[name])
            }
        }
        if (contentType === CONTENT_TYPE.URLENCODED) {
            requestBody = qs.stringify(payload)
        }

        extheaders = {
            'Content-type' : 'application/json'
        }

        return this.genericFetch(endpoint, METHOD.DELETE, requestBody, extheaders)
    }


    async genericFetch (endpoint, method, body, extheaders = null) {
        
        const url = this.HOST + endpoint

        let headers = {
            "accept" : CONTENT_TYPE.JSON,
            "Cache-control" : "no-cache"
        }
        
        if (extheaders) {
            Object.keys(extheaders).forEach(headerName => {
                headers[headerName] = extheaders[headerName]
            })
        }
        
        const options = {
            method,
            headers,
            body
        }
        

        const result = await fetch(url, options)
        const response = await this.parseResult(result)
        return response
    }
    async parseResult(result) {
        return result.json()
    }
}

export default ApiStructure
