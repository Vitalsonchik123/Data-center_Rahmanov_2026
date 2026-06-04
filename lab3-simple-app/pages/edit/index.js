import { HeaderComponent } from "../../components/header/index.js";
import { MainPage } from "../main/index.js";
import { ajax } from "../../modules/ajax.js";
import { datacenterUrls } from "../../modules/datacenterUrls.js";

export class EditPage {
    constructor(parent, id = null) {
        this.parent = parent;
        this.id = id ? parseInt(id) : null;
        this.stock = null;
    }

    getHTML() {
        const isEdit = !!this.id;
        return `
            <div class="edit-container" style="max-width: 600px; margin: 20px auto;">
                <h2 class="edit-title">${isEdit ? 'Редактировать акцию' : 'Добавить акцию'}</h2>
                <form id="edit-form">
                    <div class="mb-3">
                        <label class="form-label">Название</label>
                        <input type="text" id="title" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Текст</label>
                        <textarea id="text" class="form-control" rows="3" required></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">URL картинки</label>
                        <input type="text" id="src" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Категория</label>
                        <input type="text" id="category" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Скидка (%)</label>
                        <input type="number" id="discount" class="form-control" value="0">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Промокоды (через запятую)</label>
                        <input type="text" id="promoCodes" class="form-control" placeholder="sale, sale50">
                    </div>
                    <button type="submit" class="btn btn-orange">Сохранить</button>
                    <button type="button" id="cancel-btn" class="btn btn-secondary ms-2">Отмена</button>
                </form>
            </div>
        `;
    }

    loadData() {
        if (!this.id) return Promise.resolve();
        return new Promise((resolve, reject) => {
            ajax.get(DatacenterUrls.getDatacenterById(this.id), (data, status) => {
                if (status === 200 && data) {
                    this.stock = data;
                    resolve(data);
                } else {
                    reject(new Error('Не удалось загрузить данные'));
                }
            });
        });
    }

    populateForm() {
        if (!this.stock) return;
        document.getElementById('title').value = this.stock.title || '';
        document.getElementById('text').value = this.stock.text || '';
        document.getElementById('src').value = this.stock.src || '';
        document.getElementById('category').value = this.stock.category || '';
        document.getElementById('discount').value = this.stock.discount ?? 0;
        document.getElementById('promoCodes').value = (this.stock.promoCodes || []).join(', ');
    }

    getFormData() {
        return {
            title: document.getElementById('title').value,
            text: document.getElementById('text').value,
            src: document.getElementById('src').value,
            category: document.getElementById('category').value,
            discount: parseInt(document.getElementById('discount').value) || 0,
            promoCodes: document.getElementById('promoCodes').value.split(',').map(s => s.trim()).filter(s => s)
        };
    }

    save(event) {
        event.preventDefault();
        const data = this.getFormData();
        const url = this.id ? DatacenterUrls.updateDatacenterById(this.id) : DatacenterUrls.createDatacenter();
        const method = this.id ? 'patch' : 'post';

        ajax[method](url, data, (responseData, status) => {
            if (status === 200 || status === 201) {
                const mainPage = new MainPage(this.parent);
                mainPage.render();
            } else {
                alert('Ошибка сохранения');
            }
        });
    }

    cancel() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    async render() {
        this.parent.innerHTML = '';
        const header = new HeaderComponent(this.parent);
        header.render(() => {
            const mainPage = new MainPage(this.parent);
            mainPage.render();
        }, () => {});
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        if (this.id) {
            await this.loadData();
            this.populateForm();
        }

        const form = document.getElementById('edit-form');
        form.addEventListener('submit', (e) => this.save(e));
        const cancelBtn = document.getElementById('cancel-btn');
        cancelBtn.addEventListener('click', () => this.cancel());
    }
}
