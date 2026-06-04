export class DatacenterUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getDatacenter(search = '') {
        let url = `${this.baseUrl}/datacenter`;
        if (search) {
            url += `?search=${encodeURIComponent(search)}`;
        }
        return url;
    }

    getDatacenterById(id) {
        return `${this.baseUrl}/datacenter/${id}`;
    }

    createDatacenter() {
        return `${this.baseUrl}/datacenter`;
    }

    removeDatacenterById(id) {
        return `${this.baseUrl}/datacenter/${id}`;
    }

    updateDatacenterById(id) {
        return `${this.baseUrl}/datacenter/${id}`;
    }
}

export const datacenterUrls = new DatacenterUrls();
