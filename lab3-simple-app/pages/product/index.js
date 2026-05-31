import { HeaderComponent } from "../../components/header/index.js";
import { ProductComponent } from "../../components/product/index.js";
import { ThreeModelComponent } from "../../components/3Dmodel/index.js";
import { MainPage } from "../main/index.js";
import { OrdersPage } from "../orders/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

// Функция для защиты от XSS (определяем до использования)
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id);
        this.pollingInterval = null;
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `
            <div id="product-page" class="container py-3">
                <div class="mb-3">
                    <button id="back-button" class="btn btn-orange">Назад</button>
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
                <div class="row mt-4">
                    <div class="col-12">
                        <h4>Комментарии</h4>
                        <div id="comments-list" class="mb-3"></div>
                        <div class="card p-3">
                            <h5>Добавить комментарий</h5>
                            <input type="text" id="comment-author" class="form-control mb-2" placeholder="Ваше имя">
                            <textarea id="comment-text" class="form-control mb-2" rows="2" placeholder="Ваш комментарий"></textarea>
                            <button id="submit-comment" class="btn btn-success">Отправить</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async loadData() {
        try {
            const data = await ajax.get(stockUrls.getStockById(this.id));
            // Очищаем контейнеры перед рендером, чтобы избежать дублирования
            const productContainer = document.getElementById('product-info-container');
            const modelContainer = document.getElementById('three-model-container');
            if (productContainer) productContainer.innerHTML = '';
            if (modelContainer) modelContainer.innerHTML = '';

            this.renderData(data);
            this.renderComments(data.comments || []);
        } catch (error) {
            console.error('Ошибка загрузки карточки:', error);
            const container = document.getElementById('product-info-container');
            if (container) {
                container.innerHTML = '<div class="alert alert-danger">Не удалось загрузить данные</div>';
            }
        }
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

    renderComments(comments) {
        const commentsContainer = document.getElementById('comments-list');
        if (!commentsContainer) return;
        if (!comments || comments.length === 0) {
            commentsContainer.innerHTML = '<p class="text-muted">Нет комментариев. Будьте первым!</p>';
            return;
        }
        commentsContainer.innerHTML = comments.map(comment => `
            <div class="card mb-2">
                <div class="card-body">
                    <strong>${escapeHtml(comment.author)}</strong>
                    <small class="text-muted">${new Date(comment.createdAt).toLocaleString()}</small>
                    <p class="mb-0 mt-1">${escapeHtml(comment.text)}</p>
                </div>
            </div>
        `).join('');
    }

    async addComment() {
        const authorInput = document.getElementById('comment-author');
        const textInput = document.getElementById('comment-text');
        const author = authorInput.value.trim();
        const text = textInput.value.trim();
        if (!author || !text) {
            alert('Заполните имя и текст комментария');
            return;
        }
        try {
            await ajax.post(stockUrls.addComment(this.id), { author, text });
            authorInput.value = '';
            textInput.value = '';
            // Обновляем комментарии, не перегружая всю страницу
            const data = await ajax.get(stockUrls.getStockById(this.id));
            this.renderComments(data.comments || []);
        } catch (error) {
            console.error('Ошибка добавления комментария:', error);
            alert('Не удалось добавить комментарий');
        }
    }

    startPolling() {
        if (this.pollingInterval) clearInterval(this.pollingInterval);
        this.pollingInterval = setInterval(async () => {
            try {
                const data = await ajax.get(stockUrls.getStockById(this.id));
                this.renderComments(data.comments || []);
            } catch (error) {
                console.error('Polling error:', error);
            }
        }, 2500);
    }

    stopPolling() {
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
            this.pollingInterval = null;
        }
    }

    goToHome() {
        this.stopPolling();
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    goBack() {
        this.stopPolling();
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    goToOrders() {
        this.stopPolling();
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

        const submitButton = document.getElementById('submit-comment');
        if (submitButton) {
            submitButton.addEventListener('click', () => this.addComment());
        }

        this.loadData().then(() => {
            this.startPolling();
        });
    }
}
