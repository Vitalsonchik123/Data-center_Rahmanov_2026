import { HeaderComponent } from "../../components/header/index.js";
import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { EditPage } from "../edit/index.js";
import { OrdersPage } from "../orders/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.products = [];        // все данные с API
        this.filteredProducts = []; // отображаемые данные (после запроса на сервер)
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div id="main-page">
                <div class="container">
                    <div class="row mb-4">
                        <div class="col-md-5">
                            <input type="text" id="filter-input" class="form-control filter-input" placeholder="Фильтр по названию...">
                        </div>
                        <div class="col-md-2">
                            <button id="search-button" class="btn btn-success w-100"> Поиск</button>
                        </div>
                        <div class="col-md-5 text-end">
                            <button id="add-button" class="btn btn-orange w-100"> Добавить товар</button>
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col-md-4">
                            <div class="card h-100 border-green">
                                <div class="card-header bg-white text-green border-green">
                                    <strong>Задание 1.2</strong>
                                </div>
                                <div class="card-body">
                                    <p class="card-text">Подсчет повторяющихся категорий товаров</p>
                                    <button id="task-1-2-btn" class="btn btn-outline-success btn-sm">Вычислить</button>
                                    <div id="task-1-2-result" class="mt-2 small text-muted"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card h-100 border-green">
                                <div class="card-header bg-white text-green border-green">
                                    <strong>Задание 1.8</strong>
                                </div>
                                <div class="card-body">
                                    <p class="card-text">Среднее арифметическое скидок по акциям</p>
                                    <button id="task-1-8-btn" class="btn btn-outline-success btn-sm">Вычислить</button>
                                    <div id="task-1-8-result" class="mt-2 small text-muted"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card h-100 border-green">
                                <div class="card-header bg-white text-green border-green">
                                    <strong>Задание 2.10</strong>
                                </div>
                                <div class="card-body">
                                    <p class="card-text">Проверка промокодов (префиксы)</p>
                                    <div class="input-group input-group-sm mb-2">
                                        <input type="text" id="promo-input" class="form-control" placeholder="Введите промокод">
                                        <button id="check-promo-btn" class="btn btn-outline-success btn-sm">Проверить</button>
                                    </div>
                                    <div id="promo-result" class="small text-muted"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="products-container" class="d-flex flex-wrap gap-3"></div>
                </div>
            </div>
        `;
    }

    getFilterInput() {
        return document.getElementById('filter-input');
    }

    getProductsContainer() {
        return document.getElementById('products-container');
    }

    getAddButton() {
        return document.getElementById('add-button');
    }

    // Загрузка карточек с сервера (с поддержкой поиска)
    loadStocks(search = '') {
        const url = stockUrls.getStocks(search);
        ajax.get(url, (data, status) => {
            if (status === 200 && data) {
                this.products = data;
                this.filteredProducts = [...this.products];
                this.renderProducts();
            } else {
                console.error('Ошибка загрузки данных:', status);
                const container = this.getProductsContainer();
                if (container) {
                    container.innerHTML = '<div class="alert alert-danger">Не удалось загрузить акции</div>';
                }
            }
        });
    }

    // Выполнить поиск по нажатию кнопки
    performSearch() {
        const searchInput = this.getFilterInput();
        const searchText = searchInput ? searchInput.value.trim() : '';
        this.loadStocks(searchText);
    }

    renderProducts() {
        const container = this.getProductsContainer();
        if (!container) return;
        container.innerHTML = '';
        if (this.filteredProducts.length === 0) {
            container.innerHTML = '<div class="alert alert-orange">Ничего не найдено</div>';
            return;
        }
        this.filteredProducts.forEach((item) => {
            const productCard = new ProductCardComponent(container);
            productCard.render(
                item,
                (id) => this.goToProduct(id),
                (id) => this.goToEdit(id),
                (id) => this.deleteProduct(id)
            );
        });
    }

    addProduct() {
        const editPage = new EditPage(this.parent);
        editPage.render();
    }

    goToEdit(id) {
        const editPage = new EditPage(this.parent, id);
        editPage.render();
    }

    deleteProduct(id) {
        ajax.delete(stockUrls.removeStockById(id), (data, status) => {
            if (status === 204) {
                this.loadStocks();  // перезагружаем список (без поиска)
            } else {
                alert('Ошибка удаления');
            }
        });
    }

    goToProduct(id) {
        const productPage = new ProductPage(this.parent, id);
        productPage.render();
    }

    goToHome() {
        this.render();
    }

    goToOrders() {
        const ordersPage = new OrdersPage(this.parent);
        ordersPage.render();
    }

    // Задание 1.2
    countDuplicateCategories() {
        const categories = this.products.map(product => product.category);
        const categoryCount = categories.reduce((acc, category) => {
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {});
        const duplicates = Object.entries(categoryCount)
            .filter(([_, count]) => count > 1)
            .map(([category, count]) => `${category} (${count} раз)`);
        return {
            totalCategories: categories.length,
            uniqueCategories: Object.keys(categoryCount).length,
            duplicateCount: duplicates.length,
            duplicateDetails: duplicates,
            hasDuplicates: duplicates.length > 0
        };
    }

    // Задание 1.8
    calculateAverageDiscount() {
        const discounts = this.products.map(product => product.discount);
        if (discounts.length === 0) return { average: 0 };
        const sum = discounts.reduce((a, b) => a + b, 0);
        return { average: Math.round(sum / discounts.length * 10) / 10 };
    }

    // Задание 2.10
    countPrefixPromoCodes(enteredCode) {
        if (!enteredCode || enteredCode.trim() === "") {
            return { count: 0, matchingCodes: [] };
        }
        const allPromoCodes = this.products.flatMap(product => product.promoCodes || []);
        const uniquePromoCodes = [...new Set(allPromoCodes)];
        const matchingCodes = uniquePromoCodes.filter(code =>
            code.length <= enteredCode.length && enteredCode.startsWith(code)
        );
        return { count: matchingCodes.length, matchingCodes };
    }

    render() {
        this.parent.innerHTML = '';
        const header = new HeaderComponent(this.parent);
        header.render(this.goToHome.bind(this), this.goToOrders.bind(this));
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        // Кнопка "Добавить акцию"
        const addButton = this.getAddButton();
        if (addButton) {
            addButton.addEventListener('click', () => this.addProduct());
        }

        // Кнопка "Поиск"
        const searchButton = document.getElementById('search-button');
        if (searchButton) {
            searchButton.addEventListener('click', () => this.performSearch());
        }

        // Задание 1.2
        const task12Btn = document.getElementById('task-1-2-btn');
        const task12Result = document.getElementById('task-1-2-result');
        if (task12Btn && task12Result) {
            task12Btn.addEventListener('click', () => {
                const res = this.countDuplicateCategories();
                task12Result.textContent = res.hasDuplicates
                    ? `Найдено повторяющихся категорий: ${res.duplicateCount} (${res.duplicateDetails.join(", ")})`
                    : `Повторяющихся категорий не найдено`;
                setTimeout(() => { task12Result.textContent = ""; }, 5000);
            });
        }

        // Задание 1.8
        const task18Btn = document.getElementById('task-1-8-btn');
        const task18Result = document.getElementById('task-1-8-result');
        if (task18Btn && task18Result) {
            task18Btn.addEventListener('click', () => {
                const res = this.calculateAverageDiscount();
                task18Result.textContent = `Средняя скидка: ${res.average}%`;
                setTimeout(() => { task18Result.textContent = ""; }, 5000);
            });
        }

        // Задание 2.10
        const promoInput = document.getElementById('promo-input');
        const checkButton = document.getElementById('check-promo-btn');
        const promoResult = document.getElementById('promo-result');
        if (checkButton && promoInput && promoResult) {
            checkButton.addEventListener('click', () => {
                const entered = promoInput.value;
                const res = this.countPrefixPromoCodes(entered);
                if (!entered) {
                    promoResult.textContent = "Введите промокод";
                } else if (res.count > 0) {
                    promoResult.textContent = `Найдено ${res.count} промокод(ов): ${res.matchingCodes.join(", ")}`;
                } else {
                    promoResult.textContent = `Не найдено промокодов-префиксов для "${entered}"`;
                }
                setTimeout(() => { promoResult.textContent = ""; }, 5000);
            });
        }

        this.loadStocks(); // Начальная загрузка всех карточек (без поиска)
    }
}
