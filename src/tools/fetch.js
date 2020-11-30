class Fetch {
    get(url) {
         return fetch(url);
    }

    async post(url,data) {
        return fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
    }
}

export default Fetch
