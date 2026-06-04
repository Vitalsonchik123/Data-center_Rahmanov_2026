import { HeaderComponent } from "../../components/header/index.js";
import { ProductComponent } from "../../components/product/index.js";
import { ThreeModelComponent } from "../../components/3Dmodel/index.js";
import { MainPage } from "../main/index.js";
import { OrdersPage } from "../orders/index.js";
import { ajax } from "../../modules/ajax.js";
import { datacenterUrls } from "../../modules/datacenterUrls.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id);
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `
            <div id="product-page" class="container py-3">
                <div class="mb-3">
                    <button id="back-button" class="btn btn-orange">Назад к акциям</button>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div id="product-info-container"></div>
                    </div>
                    <div class="col-md-6">
                        <h4 class="mb-3">3D Модель товара</h4>
                        <div id="three-model-container"></div>
                    </div>
                </div>
            </div>
        `;
    }

    getData() {
        ajax.get(datacenterUrls.getDatacenterById(this.id), (data, status) => {
            if (status === 200 && data) {
                this.renderData(data);
            } else {
                console.error('Ошибка загрузки карточки:', status);
                const container = document.getElementById('product-info-container');
                if (container) {
                    container.innerHTML = '<div class="alert alert-danger">Не удалось загрузить данные акции</div>';
                }
            }
        });
    }

    renderData(item) {
        const productContainer = document.getElementById('product-info-container');
        const modelContainer = document.getElementById('three-model-container');
        if (!productContainer || !modelContainer) return;
        const product = new ProductComponent(productContainer);
        product.render(item);
        const threeModel = new ThreeModelComponent(modelContainer, item.modelPath || './models/computer.glb');
        threeModel.render();
    }

    goToHome() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    goBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    goToOrders() {
        const ordersPage = new OrdersPage(this.parent);
        ordersPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const header = new HeaderComponent(this.parent);
        header.render(this.goToHome.bind(this), this.goToOrders.bind(this));
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        const backButton = document.getElementById('back-button');
        if (backButton) {
            backButton.addEventListener('click', () => this.goBack());
        }
        this.getData();
    }
}
