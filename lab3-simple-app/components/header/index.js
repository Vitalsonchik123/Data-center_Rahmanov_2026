export class HeaderComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return (
            `
            <nav class="navbar navbar-expand-lg bg-success mb-4">
                <div class="container-fluid">
                    <a class="navbar-brand text-white" href="#"> Датацентр. Комплектующие для ПК</a>
                    <div class="collapse navbar-collapse">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item me-2">
                                <button id="home-button" class="btn btn-outline-light"> Домой</button>
                            </li>
                            <li class="nav-item">
                                <button id="orders-button" class="btn btn-outline-light"> Заказы комплектующих</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            `
        );
    }

    addListeners(homeListener, ordersListener) {
        const homeButton = document.getElementById("home-button");
        if (homeButton) {
            homeButton.addEventListener("click", homeListener);
        }
        const ordersButton = document.getElementById("orders-button");
        if (ordersButton) {
            ordersButton.addEventListener("click", ordersListener);
        }
    }

    render(homeListener, ordersListener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('afterbegin', html);
        this.addListeners(homeListener, ordersListener);
    }
}
