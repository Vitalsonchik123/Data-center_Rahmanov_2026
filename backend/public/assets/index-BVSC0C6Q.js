(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{constructor(e){this.parent=e}getHTML(){return`
            <nav class="navbar navbar-expand-lg bg-success mb-4">
                <div class="container-fluid">
                    <a class="navbar-brand text-white" href="#"> Датацентр. Комплектующие ПК</a>
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
            `}addListeners(e,t){let n=document.getElementById(`home-button`);n&&n.addEventListener(`click`,e);let r=document.getElementById(`orders-button`);r&&r.addEventListener(`click`,t)}render(e,t){let n=this.getHTML();this.parent.insertAdjacentHTML(`afterbegin`,n),this.addListeners(e,t)}},t=class{constructor(e){this.parent=e}getHTML(e){return`
            <div class="card product-card" style="width: 350px;" data-id="${e.id}">
                <img class="card-img-top"
                     src="${e.src}"
                     alt="картинка"
                     style="height: 220px; object-fit: cover;"
                     onerror="this.src='https://via.placeholder.com/350x220?text=No+Image'">
                <div class="card-body">
                    <h5 class="card-title">${e.title}</h5>
                    <p class="card-text">${e.text}</p>
                    <div class="d-flex flex-column gap-2">
                        <button class="btn btn-success btn-sm detail-btn" data-id="${e.id}">Подробнее</button>
                        <button class="btn btn-orange btn-sm edit-btn" data-id="${e.id}">Редактировать</button>
                        <button class="btn btn-orange btn-sm delete-btn" data-id="${e.id}">Удалить</button>
                    </div>
                </div>
            </div>
        `}addListeners(e,t,n,r){let i=document.querySelector(`.detail-btn[data-id="${e.id}"]`),a=document.querySelector(`.edit-btn[data-id="${e.id}"]`),o=document.querySelector(`.delete-btn[data-id="${e.id}"]`);i&&i.addEventListener(`click`,n=>{n.stopPropagation(),t(e.id)}),a&&a.addEventListener(`click`,t=>{t.stopPropagation(),n(e.id)}),o&&o.addEventListener(`click`,t=>{t.stopPropagation(),r(e.id)})}render(e,t,n,r){let i=this.getHTML(e);this.parent.insertAdjacentHTML(`beforeend`,i),this.addListeners(e,t,n,r)}},n=class{constructor(e){this.parent=e}getHTML(e){return`
            <div class="card mb-3" style="max-width: 100%;">
                <div class="row g-0">
                    <div class="col-md-5">
                        <img src="${e.src}"
                             class="img-fluid rounded-start"
                             alt="картинка"
                             style="height: 300px; width: 100%; object-fit: cover;">
                    </div>
                    <div class="col-md-7">
                        <div class="card-body">
                            <h3 class="card-title">${e.title}</h3>
                            <p class="card-text">${e.text}</p>
                            <p class="card-text"><small class="text-muted">ID продукта: ${e.id}</small></p>
                            <hr>
                            <h5>Детали:</h5>
                            <ul>
                                <li>Условия: подробности уточняйте у консультанта</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            `}render(e){let t=this.getHTML(e);this.parent.insertAdjacentHTML(`beforeend`,t)}},r=class{constructor(e,t){this.parent=e,this.modelPath=t,this.scene=null,this.camera=null,this.renderer=null,this.controls=null,this.model=null,this.THREE=null,this.OrbitControls=null,this.GLTFLoader=null}getHTML(){return`
            <div id="three-container" style="width: 100%; height: 350px; background-color: #111; border-radius: 12px; overflow: hidden; position: relative;">
                <div id="loading-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.7); color: white; border-radius: 12px;">
                    Загрузка 3D модели...
                </div>
            </div>
            <div class="mt-2 text-center">
                <small class="text-muted">Вращайте и маштабируйте модель мышью</small>
            </div>
        `}loadScript(e){return new Promise((t,n)=>{let r=document.createElement(`script`);r.type=`text/javascript`,r.src=e,r.onload=t,r.onerror=n,document.head.appendChild(r)})}async loadThreeJS(){await this.loadScript(`https://unpkg.com/three@0.128.0/build/three.min.js`),await this.loadScript(`https://unpkg.com/three@0.128.0/examples/js/controls/OrbitControls.js`),await this.loadScript(`https://unpkg.com/three@0.128.0/examples/js/loaders/GLTFLoader.js`),this.THREE=window.THREE,this.OrbitControls=window.THREE.OrbitControls,this.GLTFLoader=window.THREE.GLTFLoader}initThree(){let e=document.getElementById(`three-container`);if(!e)return;let t=e.clientWidth;this.scene=new this.THREE.Scene,this.scene.background=new this.THREE.Color(1118481),this.camera=new this.THREE.PerspectiveCamera(45,t/350,.1,1e3),this.camera.position.set(3,2,4),this.renderer=new this.THREE.WebGLRenderer({antialias:!0}),this.renderer.setSize(t,350),e.appendChild(this.renderer.domElement),this.controls=new this.OrbitControls(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.enableZoom=!0;let n=new this.THREE.AmbientLight(4210784);this.scene.add(n);let r=new this.THREE.DirectionalLight(16777215,1);r.position.set(5,10,7),this.scene.add(r);let i=new this.THREE.GridHelper(5,20,6710886,3355443);i.position.y=-1,this.scene.add(i),this.loadModel()}loadModel(){new this.GLTFLoader().load(this.modelPath,e=>{this.model=e.scene;let t=new this.THREE.Box3().setFromObject(this.model),n=t.getCenter(new this.THREE.Vector3),r=t.getSize(new this.THREE.Vector3);this.model.position.x=-n.x,this.model.position.z=-n.z,this.model.position.y=-t.min.y;let i=Math.max(r.x,r.y,r.z);if(i>2.5){let e=2.5/i;this.model.scale.set(e,e,e)}this.scene.add(this.model);let a=Math.max(r.x,r.z)*1.5;this.camera.position.set(a,a*.6,a),this.controls.target.set(0,r.y/2,0),this.controls.update();let o=document.getElementById(`loading-overlay`);o&&(o.style.display=`none`),this.animate()},void 0,e=>{console.error(`Ошибка загрузки модели:`,e);let t=document.getElementById(`loading-overlay`);t&&(t.textContent=`Ошибка загрузки`)})}animate(){!this.renderer||!this.scene||!this.camera||(requestAnimationFrame(()=>this.animate()),this.controls&&this.controls.update(),this.renderer.render(this.scene,this.camera))}resize(){let e=document.getElementById(`three-container`);if(e&&this.camera&&this.renderer){let t=e.clientWidth;this.camera.aspect=t/350,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,350)}}async render(){let e=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,e),await this.loadThreeJS(),setTimeout(()=>{this.initThree()},100),window.addEventListener(`resize`,()=>this.resize())}},i=class{constructor(e){this.parent=e,this.orders=this.getInitialOrders()}getInitialOrders(){return[{id:1,name:`Процессор AMD Ryzen 9 7950X`},{id:2,name:`Видеокарта NVIDIA GeForce RTX 4080 SUPER`},{id:3,name:`Оперативная память DDR5 32 ГБ (2x16)`},{id:4,name:`SSD NVMe Samsung 990 PRO 2 ТБ`},{id:5,name:`Материнская плата ASUS ROG STRIX B650E-F`},{id:6,name:`Блок питания Corsair RM850x 850W`},{id:7,name:`Кулер Noctua NH-D15`},{id:8,name:`Корпус Fractal Design North`},{id:9,name:`Монитор ASUS ROG Swift 27" 240 Гц`},{id:10,name:`Клавиатура механическая Logitech G Pro X`}]}getHTML(){return`
            <div class="orders-container">
                <div class="orders-title">Заказы комплектующих</div>
                <div class="orders-controls">
                    <button id="add-order-button" class="btn btn-orange"> Добавить заказ</button>
                </div>
                <div class="orders-list" id="orders-list"></div>
            </div>
        `}addOrder(){if(this.orders.length===0)return;let e=this.orders[0],t={id:Math.max(...this.orders.map(e=>e.id))+1,name:`${e.name} (копия)`};this.orders.push(t),this.renderOrders()}deleteOrder(e){this.orders=this.orders.filter(t=>t.id!==e),this.renderOrders()}renderOrders(){let e=document.getElementById(`orders-list`);e&&(e.innerHTML=this.orders.map(e=>`
            <div class="order-card">
                <div class="order-number">Заказ #${e.id}</div>
                <div class="order-name">${e.name}</div>
                <button class="btn-delete-order" data-id="${e.id}">🗑 Удалить</button>
            </div>
        `).join(``),document.querySelectorAll(`.btn-delete-order`).forEach(e=>{e.addEventListener(`click`,t=>{let n=parseInt(e.getAttribute(`data-id`));this.deleteOrder(n)})}))}goToHome(){new u(this.parent).render()}render(){this.parent.innerHTML=``,new e(this.parent).render(this.goToHome.bind(this),()=>{});let t=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,t);let n=document.getElementById(`add-order-button`);n&&n.addEventListener(`click`,()=>this.addOrder()),this.renderOrders()}},a=new class{async get(e){let t=await fetch(e);if(!t.ok)throw Error(`HTTP ${t.status}`);return t.json()}async post(e,t){let n=await fetch(e,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)});if(!n.ok)throw Error(`HTTP ${n.status}`);return n.json()}async patch(e,t){let n=await fetch(e,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)});if(!n.ok)throw Error(`HTTP ${n.status}`);return n.json()}async delete(e){let t=await fetch(e,{method:`DELETE`});if(!t.ok)throw Error(`HTTP ${t.status}`);if(t.status!==204)return t.json()}},o=new class{constructor(){this.baseUrl=`http://localhost:3000`}getStocks(e=``){let t=`${this.baseUrl}/stocks`;return e&&(t+=`?search=${encodeURIComponent(e)}`),t}getStockById(e){return`${this.baseUrl}/stocks/${e}`}createStock(){return`${this.baseUrl}/stocks`}removeStockById(e){return`${this.baseUrl}/stocks/${e}`}updateStockById(e){return`${this.baseUrl}/stocks/${e}`}addComment(e){return`${this.baseUrl}/stocks/${e}/comments`}};function s(e){return e?e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`):``}var c=class{constructor(e,t){this.parent=e,this.id=parseInt(t),this.pollingInterval=null}get pageRoot(){return document.getElementById(`product-page`)}getHTML(){return`
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
        `}async loadData(){try{let e=await a.get(o.getStockById(this.id)),t=document.getElementById(`product-info-container`),n=document.getElementById(`three-model-container`);t&&(t.innerHTML=``),n&&(n.innerHTML=``),this.renderData(e),this.renderComments(e.comments||[])}catch(e){console.error(`Ошибка загрузки карточки:`,e);let t=document.getElementById(`product-info-container`);t&&(t.innerHTML=`<div class="alert alert-danger">Не удалось загрузить данные</div>`)}}renderData(e){let t=document.getElementById(`product-info-container`),i=document.getElementById(`three-model-container`);!t||!i||(new n(t).render(e),new r(i,e.modelPath||`./models/computer.glb`).render())}renderComments(e){let t=document.getElementById(`comments-list`);if(t){if(!e||e.length===0){t.innerHTML=`<p class="text-muted">Нет комментариев. Будьте первым!</p>`;return}t.innerHTML=e.map(e=>`
            <div class="card mb-2">
                <div class="card-body">
                    <strong>${s(e.author)}</strong>
                    <small class="text-muted">${new Date(e.createdAt).toLocaleString()}</small>
                    <p class="mb-0 mt-1">${s(e.text)}</p>
                </div>
            </div>
        `).join(``)}}async addComment(){let e=document.getElementById(`comment-author`),t=document.getElementById(`comment-text`),n=e.value.trim(),r=t.value.trim();if(!n||!r){alert(`Заполните имя и текст комментария`);return}try{await a.post(o.addComment(this.id),{author:n,text:r}),e.value=``,t.value=``;let i=await a.get(o.getStockById(this.id));this.renderComments(i.comments||[])}catch(e){console.error(`Ошибка добавления комментария:`,e),alert(`Не удалось добавить комментарий`)}}startPolling(){this.pollingInterval&&clearInterval(this.pollingInterval),this.pollingInterval=setInterval(async()=>{try{let e=await a.get(o.getStockById(this.id));this.renderComments(e.comments||[])}catch(e){console.error(`Polling error:`,e)}},2500)}stopPolling(){this.pollingInterval&&=(clearInterval(this.pollingInterval),null)}goToHome(){this.stopPolling(),new u(this.parent).render()}goBack(){this.stopPolling(),new u(this.parent).render()}goToOrders(){this.stopPolling(),new i(this.parent).render()}render(){this.parent.innerHTML=``,new e(this.parent).render(this.goToHome.bind(this),this.goToOrders.bind(this));let t=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,t);let n=document.getElementById(`back-button`);n&&n.addEventListener(`click`,()=>this.goBack());let r=document.getElementById(`submit-comment`);r&&r.addEventListener(`click`,()=>this.addComment()),this.loadData().then(()=>{this.startPolling()})}},l=class{constructor(e,t=null){this.parent=e,this.id=t?parseInt(t):null,this.stock=null}getHTML(){return`
            <div class="edit-container" style="max-width: 600px; margin: 20px auto;">
                <h2 class="edit-title">${this.id?`Редактировать акцию`:`Добавить акцию`}</h2>
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
        `}async loadData(){if(this.id)try{this.stock=await a.get(o.getStockById(this.id))}catch{throw Error(`Не удалось загрузить данные`)}}populateForm(){this.stock&&(document.getElementById(`title`).value=this.stock.title||``,document.getElementById(`text`).value=this.stock.text||``,document.getElementById(`src`).value=this.stock.src||``,document.getElementById(`category`).value=this.stock.category||``,document.getElementById(`discount`).value=this.stock.discount??0,document.getElementById(`promoCodes`).value=(this.stock.promoCodes||[]).join(`, `))}getFormData(){return{title:document.getElementById(`title`).value,text:document.getElementById(`text`).value,src:document.getElementById(`src`).value,category:document.getElementById(`category`).value,discount:parseInt(document.getElementById(`discount`).value)||0,promoCodes:document.getElementById(`promoCodes`).value.split(`,`).map(e=>e.trim()).filter(e=>e)}}async save(e){e.preventDefault();let t=this.getFormData(),n=this.id?o.updateStockById(this.id):o.createStock(),r=this.id?`patch`:`post`;try{r===`patch`?await a.patch(n,t):await a.post(n,t),new u(this.parent).render()}catch{alert(`Ошибка сохранения`)}}cancel(){new u(this.parent).render()}async render(){this.parent.innerHTML=``,new e(this.parent).render(()=>{new u(this.parent).render()},()=>{});let t=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,t),this.id&&(await this.loadData(),this.populateForm()),document.getElementById(`edit-form`).addEventListener(`submit`,e=>this.save(e)),document.getElementById(`cancel-btn`).addEventListener(`click`,()=>this.cancel())}},u=class{constructor(e){this.parent=e,this.products=[],this.filteredProducts=[]}get pageRoot(){return document.getElementById(`main-page`)}getHTML(){return`
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
                            <button id="add-button" class="btn btn-orange w-100"> Добавить акцию</button>
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
        `}getFilterInput(){return document.getElementById(`filter-input`)}getProductsContainer(){return document.getElementById(`products-container`)}getAddButton(){return document.getElementById(`add-button`)}async loadStocks(e=``){try{let t=o.getStocks(e),n=await a.get(t);this.products=n,this.filteredProducts=[...this.products],this.renderProducts()}catch(e){console.error(`Ошибка загрузки данных:`,e);let t=this.getProductsContainer();t&&(t.innerHTML=`<div class="alert alert-danger">Не удалось загрузить акции</div>`)}}performSearch(){let e=this.getFilterInput(),t=e?e.value.trim():``;this.loadStocks(t)}renderProducts(){let e=this.getProductsContainer();if(e){if(e.innerHTML=``,this.filteredProducts.length===0){e.innerHTML=`<div class="alert alert-orange">Ничего не найдено</div>`;return}this.filteredProducts.forEach(n=>{new t(e).render(n,e=>this.goToProduct(e),e=>this.goToEdit(e),e=>this.deleteProduct(e))})}}addProduct(){new l(this.parent).render()}goToEdit(e){new l(this.parent,e).render()}async deleteProduct(e){try{await a.delete(o.removeStockById(e)),this.loadStocks()}catch{alert(`Ошибка удаления`)}}goToProduct(e){new c(this.parent,e).render()}goToHome(){this.render()}goToOrders(){new i(this.parent).render()}countDuplicateCategories(){let e=this.products.map(e=>e.category),t=e.reduce((e,t)=>(e[t]=(e[t]||0)+1,e),{}),n=Object.entries(t).filter(([e,t])=>t>1).map(([e,t])=>`${e} (${t} раз)`);return{totalCategories:e.length,uniqueCategories:Object.keys(t).length,duplicateCount:n.length,duplicateDetails:n,hasDuplicates:n.length>0}}calculateAverageDiscount(){let e=this.products.map(e=>e.discount);if(e.length===0)return{average:0};let t=e.reduce((e,t)=>e+t,0);return{average:Math.round(t/e.length*10)/10}}countPrefixPromoCodes(e){if(!e||e.trim()===``)return{count:0,matchingCodes:[]};let t=this.products.flatMap(e=>e.promoCodes||[]),n=[...new Set(t)].filter(t=>t.length<=e.length&&e.startsWith(t));return{count:n.length,matchingCodes:n}}render(){this.parent.innerHTML=``,new e(this.parent).render(this.goToHome.bind(this),this.goToOrders.bind(this));let t=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,t);let n=this.getAddButton();n&&n.addEventListener(`click`,()=>this.addProduct());let r=document.getElementById(`search-button`);r&&r.addEventListener(`click`,()=>this.performSearch());let i=document.getElementById(`task-1-2-btn`),a=document.getElementById(`task-1-2-result`);i&&a&&i.addEventListener(`click`,()=>{let e=this.countDuplicateCategories();a.textContent=e.hasDuplicates?`Найдено повторяющихся категорий: ${e.duplicateCount} (${e.duplicateDetails.join(`, `)})`:`Повторяющихся категорий не найдено`,setTimeout(()=>{a.textContent=``},5e3)});let o=document.getElementById(`task-1-8-btn`),s=document.getElementById(`task-1-8-result`);o&&s&&o.addEventListener(`click`,()=>{s.textContent=`Средняя скидка: ${this.calculateAverageDiscount().average}%`,setTimeout(()=>{s.textContent=``},5e3)});let c=document.getElementById(`promo-input`),l=document.getElementById(`check-promo-btn`),u=document.getElementById(`promo-result`);l&&c&&u&&l.addEventListener(`click`,()=>{let e=c.value,t=this.countPrefixPromoCodes(e);e?t.count>0?u.textContent=`Найдено ${t.count} промокод(ов): ${t.matchingCodes.join(`, `)}`:u.textContent=`Не найдено промокодов-префиксов для "${e}"`:u.textContent=`Введите промокод`,setTimeout(()=>{u.textContent=``},5e3)}),this.loadStocks()}};document.addEventListener(`DOMContentLoaded`,()=>{let e=document.getElementById(`root`);if(!e){console.error(`Элемент root не найден!`);return}new u(e).render()});
