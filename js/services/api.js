window.ApiService = {
    async getData() {
        const res = await fetch('data/dataBahanAjar.json')
        return await res.json()
    }
}