// Recuperando Nome e Email de SESSION STORAGE
const nameUser = sessionStorage.NOME_USUARIO;
const emailUser = sessionStorage.EMAIL_USUARIO;
const fkEmpresa = sessionStorage.FK_EMPRESA;

// Inicializa a variável firstNameUser fora do bloco if para garantir que ela esteja disponível
let firstNameUser = '';

if (nameUser) {
    firstNameUser = nameUser.trim().split(' ')[0];
} else {
    console.warn("Nome não encontrado");
}

// Seleciona todos os spans pelos identificadores de classe
const userNameSpans = document.querySelectorAll('.userNameSpan');
const userEmailSpans = document.querySelectorAll('.userEmailSpan');

function guardarUnidade(unidadeId) {
    sessionStorage.FK_Unidade = unidadeId;
}

// Atualiza o conteúdo de todos os spans encontrados
userNameSpans.forEach(span => span.textContent = firstNameUser);
userEmailSpans.forEach(span => span.textContent = emailUser);

document.addEventListener('DOMContentLoaded', function () {

    fetch(`../empresas/unidades/${fkEmpresa}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fkEmpresa: fkEmpresa
        })
    }).then(response => response.json())

        .then(unidades => {
            const submenuList = document.querySelector('.submenu-list');
            

            unidades.forEach(unidade => {
                const li = document.createElement('li');
                li.className = 'submenu-item';
                li.innerHTML = `
                    <a href="#" onclick="guardarUnidade(${unidade.id}); window.location.href='unidade.html';">                        <i class='bx bxs-store'></i>
                        <p>${unidade.apelido}</p>
                    </a>
                `;
                submenuList.appendChild(li);
            });
        })
        .catch(error => console.error('Erro ao carregar unidades:', error));
});

document.addEventListener('DOMContentLoaded', function () {

    fetch(`../empresas/unidades/${fkEmpresa}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fkEmpresa: fkEmpresa
        })
    }).then(response => response.json())
        .then(unidades => {
            const container = document.querySelector('.swiper-wrapper');
            container.innerHTML = ''; // Limpa o conteúdo existente, se necessário

            unidades.forEach(unidade => {
                console.log(unidade);

                const card = document.createElement('div');
                card.className = 'card-body swiper-slide';
                card.innerHTML = `
                <div class="chart-box flex-display">
                    <div class="wrap-area">
                        <div class="unit-desc">
                            <h3 class="name">${unidade.nomeFantasia}</h3>
                            <p class="adress">${unidade.logradouro}</p>
                        </div>
                        <div class="unit-stats">
                            <span class="review-rating">3.5</span>
                            <span class="star-rating" data-rating-value="3.5"></span>
                            <span class="review-number">(679 avaliações)</span>
                        </div>
                        <div class="chart-mini-box">
                            <canvas id="myBarChart${unidade.id}"></canvas> 
                        </div>
                    </div>
                    <div class="wrap-area">
                        <a href="unidadeMatriz.html" class="linkBtn">acessar</a>
                    </div>
                </div>
            `;
                container.appendChild(card); // Adicione o card ao container
            });

            // Inicialize o Swiper após todos os elementos serem adicionados
            const swiper = new Swiper('.swiper', {
                pagination: {
                    el: '.swiper-pagination',
                    type: 'progressbar',
                }
            });

            // Obtenha o campo select
            const slideSelector = document.getElementById('slideSelector');

            // Adicione um ouvinte de eventos para mudar o slide quando o valor do select mudar
            slideSelector.addEventListener('change', function () {
                const selectedSlideIndex = parseInt(this.value, 10);
                swiper.slideTo(selectedSlideIndex);
            });

            // Adicione um ouvinte de eventos ao carrossel para detectar mudanças de slide
            swiper.on('slideChange', function () {
                const currentSlideIndex = swiper.activeIndex;
                slideSelector.value = currentSlideIndex;
            });
        })
        .catch(error => console.error('Erro ao carregar unidades:', error));
});
