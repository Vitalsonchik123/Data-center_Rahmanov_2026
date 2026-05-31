export class StockUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getStocks(search = '') {
        let url = `${this.baseUrl}/datacenter`;
        if (search) {
            url += `?search=${encodeURIComponent(search)}`;
        }
        return url;
    }

    getStockById(id) {
        return `${this.baseUrl}/datacenter/${id}`;
    }

    createStock() {
        return `${this.baseUrl}/datacenter`;
    }

    removeStockById(id) {
        return `${this.baseUrl}/datacenter/${id}`;
    }

    updateStockById(id) {
        return `${this.baseUrl}/datacenter/${id}`;
    }

    addComment(id) {
    return `${this.baseUrl}/datacenter/${id}/comments`;
}
}

export const stockUrls = new StockUrls();
