export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
            <div class="card mb-3" style="max-width: 100%;">
                <div class="row g-0">
                    <div class="col-md-5">
                        <img src="${data.src}"
                             class="img-fluid rounded-start"
                             alt="картинка"
                             style="height: 300px; width: 100%; object-fit: cover;">
                    </div>
                    <div class="col-md-7">
                        <div class="card-body">
                            <h3 class="card-title">${data.title}</h3>
                            <p class="card-text">${data.text}</p>
                            <p class="card-text"><small class="text-muted">ID продукта: ${data.id}</small></p>
                            <hr>
                            <h5>Детали:</h5>
                            <ul>
                                <li>Условия: подробности уточняйте у консультанта</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            `
        );
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}
