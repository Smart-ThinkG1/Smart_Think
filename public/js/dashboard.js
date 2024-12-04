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

// FUNÇÃO QUE LISTA AS EMPRESAS NA SIDEBAR
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
                    <a href="unidade.html?id=${unidade.id}" onclick="guardarUnidade(${unidade.id})">
                    <i class='bx bxs-store'></i>
                        <p>${unidade.apelido}</p>
                    </a>
                `;
                submenuList.appendChild(li);
            });
        })
        .catch(error => console.error('Erro ao carregar unidades:', error));
});

// FUNÇÃO DO 2º GRÁFICO

fetchUnidades();

function fetchUnidades() {
    fetch(`../empresas/unidades/${fkEmpresa}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ fkEmpresa })
    })
    .then(response => response.json())
    .then(unidades => {
        renderUnidades(unidades);
        initializeSwiper();
        generateStarRatings();

        // Atualiza o seletor de slides com os nomes das unidades
        updateSlideSelector(unidades);
    })
    .catch(error => console.error('Erro ao carregar unidades:', error));
}

function updateSlideSelector(unidades) {
    const slideSelector = document.getElementById('slideSelector');
    slideSelector.innerHTML = ''; // Limpa as opções existentes

    // Adiciona uma opção para cada unidade
    unidades.forEach((unidade, index) => {
        const option = document.createElement('option');
        option.value = index; // Define o valor como o índice do slide
        option.textContent = unidade.nomeFantasia; // Define o texto como o nome da unidade
        slideSelector.appendChild(option);
    });
}


function renderUnidades(unidades) {
    const container = document.querySelector('.swiper-wrapper');
    container.innerHTML = '';

    unidades.forEach(unidade => {
        const card = createCard(unidade);
        container.appendChild(card);
        initChart(unidade);  // Inicialize o gráfico após adicionar o card
    });

    
}

function createCard(unidade) {
    const card = document.createElement('div');
    card.className = 'card-body swiper-slide';
    card.innerHTML = `
            <div class="chart-box flex-display">
                <div class="wrap-area">
                    <div class="unit-desc">
                        <h3 class="name">${unidade.nomeFantasia}</h3>
                        <p class="adress">${unidade.logradouro} - ${unidade.cep}</p>
                    </div>
                    <div class="unit-stats">
                        <span class="review-rating">0</span>
                        <span class="star-rating" data-rating-value="0"></span>
                        <span class="review-number">(0)</span>
                    </div>
                    <div class="chart-mini-box">
                        <canvas id="myBarChart${unidade.id}"></canvas> 
                    </div>
                </div>
                <div class="wrap-area">
                    <a href="unidade.html?id=${unidade.id}" class="linkBtn">acessar</a>
                </div>
            </div>
        `;
    console.log(`empresa ${unidade.nomeFantasia}, sob o código de identificação ${unidade.id} foi gerada`);
    return card;
}


function initChart(unidade) {

    const ctxAu = document.getElementById(`myBarChart${unidade.id}`);
    const ctxAnaliseUnidade = new Chart(ctxAu, {
        type: 'bar',
        data: {
            labels: ['Positivos', 'Neutros', 'Negativos'], // Ordem alterada
            datasets: [{
                axis: 'y',
                label: 'Quantidade', //Legenda Vertical
                data: [],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.8)', // Cor para Positivos
                    'rgba(255, 206, 86, 0.8)', // Cor para Neutros
                    'rgba(255, 99, 132, 0.8)'  // Cor para Negativos
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            family: 'Lato',
                            size: 10
                        }
                    }
                },
                y: {
                    ticks: {
                        font: {
                            family: 'Lato',
                            size: 10
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    align: 'start',
                    text: 'Distribuição de Avaliações',
                    font: {
                        family: 'Lato',
                        size: 12
                    }
                }
            }
        }
    });

    // Chama listarAvaliacoes passando o gráfico
    listarAvaliacoes(unidade, ctxAnaliseUnidade);
}

function listarAvaliacoes(unidade, chart) {
    fetch(`../graficos/listarAvaliacoes/${unidade.id}`, {
        method: "GET",
    })
    .then(response => response.json())
    .then(avaliacao => {
        console.log(avaliacao);

        // Atualiza os dados do gráfico
        chart.data.datasets[0].data = [
            avaliacao[0].positivos,
            avaliacao[0].neutros,
            avaliacao[0].negativos
        ];
        chart.update();

        // Seleciona o card correspondente
        const card = document.getElementById(`myBarChart${unidade.id}`).closest('.card-body');

        // Atualiza os spans de review-rating e review-number dentro deste card
        const reviewRatingElements = card.querySelectorAll('.review-rating');
        const reviewNumberElements = card.querySelectorAll('.review-number');
        const starRatingElements = card.querySelectorAll('.star-rating');

        // Atualiza cada review-rating e data-rating-value
        reviewRatingElements.forEach((reviewRatingElement, index) => {
            const mediaEstrelas = avaliacao[0].mediaEstrelas;
            reviewRatingElement.textContent = mediaEstrelas;
            starRatingElements[index].setAttribute('data-rating-value', mediaEstrelas);
        });

        // Atualiza cada review-number
        reviewNumberElements.forEach(reviewNumberElement => {
            reviewNumberElement.textContent = `(${avaliacao[0].qtdAvaliacoes} avaliações)`;
        });

        // Gera as estrelas
        generateStarRatings();
    })
    .catch(error => console.error('Erro ao carregar unidades:', error));
}

function generateStarRatings() {
    const divEstrelasList = document.querySelectorAll('.star-rating');

    divEstrelasList.forEach(divEstrelas => {
        // Limpa estrelas existentes para evitar duplicação
        divEstrelas.innerHTML = '';

        const valorEstrela = Number(divEstrelas.getAttribute('data-rating-value'));
        const valorEstrelaInteiro = Math.trunc(valorEstrela);
        const valorEstrelaDecimal = valorEstrela - valorEstrelaInteiro;

        for (let i = 0; i < valorEstrelaInteiro; i++) {
            divEstrelas.appendChild(createStarIcon('fa-star', 'fill-star'));
        }

        if (valorEstrelaDecimal >= 0.5) {
            divEstrelas.appendChild(createStarIcon('fa-star-half', 'fill-star'));
        }

        const qntdEstrelaPreenchida = divEstrelas.querySelectorAll('.fill-star').length;
        for (let i = qntdEstrelaPreenchida; i < 5; i++) {
            divEstrelas.appendChild(createStarIcon('fa-star', 'null-star'));
        }
    });
}

function createStarIcon(starType, starClass) {
    const starIcon = document.createElement('i');
    starIcon.classList.add('fa-solid', starType, starClass);
    return starIcon;
}

function initializeSwiper() {
    const swiper = new Swiper('.swiper', {
        pagination: {
            el: '.swiper-pagination',
            type: 'progressbar',
        }
    });

    const slideSelector = document.getElementById('slideSelector');
    slideSelector.addEventListener('change', function () {
        const selectedSlideIndex = parseInt(this.value, 10);
        swiper.slideTo(selectedSlideIndex);
    });

    swiper.on('slideChange', function () {
        const currentSlideIndex = swiper.activeIndex;
        slideSelector.value = currentSlideIndex;
    });
}

Chart.register(ChartDataLabels);

const ctx = document.getElementById('myChart');

const unidadesReclamacao = {
    "Matriz": 1,
    "Unidade 1": 2,
    "Unidade 2": 3,
    
};

function inicializarGraficoReclamacoesPorUnidade(dados) {
    if (!Array.isArray(dados)) {
        console.error('Os dados recebidos não são um array:', dados);
        return;
    }

    const unidades = dados.map(dado => dado.unidade); // Nome das unidades
    const reclamacoes = dados.map(dado => dado.totalReclamacoes); // Total de reclamações

    console.log('Unidades:', unidades);
    console.log('Reclamações:', reclamacoes);

    if (!ctx) {
        console.error('Canvas com ID "myChart" não encontrado.');
        return;
    }

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: unidades,
            datasets: [{
                label: 'Distribuição de Reclamações por Unidade',
                data: reclamacoes,
                backgroundColor: [
                    'rgba(74, 42, 140, 0.9)',
                    'rgba(95, 59, 170, 0.9)',
                    'rgba(43, 8, 92, 0.9)',
                ],
                borderColor: ['#fff', '#fff', '#fff'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                },
                datalabels: {
                    color: '#fff',
                    formatter: (value, context) => {
                        const data = context.chart.data.datasets[0].data;
                        const total = data.reduce((acc, val) => acc + val, 0);
                        const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                        return `${percentage}%`;
                    },
                    font: {
                        weight: 'bold',
                        size: 12,
                    }
                }
            }
        }
    });
 
}

// DASH KPI

function kpiUnidadesGeral() {
    const codigo = sessionStorage.CODIGO_MARCA;
    fetch(`/kpi/listar/empresa/${codigo}`, { cache: "no-store" }) 
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    const qtdUnidades = document.getElementById("qtdUnidades");
                    
                   
                    if (resposta && resposta.length > 0) {
                        qtdUnidades.innerHTML = resposta.length; 
                    } else {
                        qtdUnidades.innerHTML = "Nenhuma unidade ativa";
                    }
                });
            } else {
                console.error("Erro ao buscar as unidades");
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados para KPI: ${error.message}`);
        });
}




function kpiNegativasXPositivas() {
    const codigo = sessionStorage.CODIGO_MARCA;
    // Realizando a requisição para a API
    fetch(`/kpi/NegativasXPositivas/empresa/${codigo}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar dados: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        // Atualiza os valores com os dados recebidos
        document.getElementById('positive-value').innerHTML = `${data.AvaliacoesPositivas}`;
        document.getElementById('negative-value').innerHTML = `${data.AvaliacoesNegativas}`;
    })
    .catch(error => {
        console.error('Erro ao buscar dados:', error);
    });
}

kpiNegativasXPositivas(); 


kpiUnidadesGeral();

function kpiMaisReclamacoes(req, res) {
    const codigo = sessionStorage.CODIGO_MARCA;
    fetch(`/kpi/maisReclamacoes/empresa/${codigo}`, { cache: "no-store" })
        .then(function (resposta) {
           
            if (!resposta.ok) {
                throw new Error(`Erro ao buscar os dados: ${resposta.statusText}`);
            }

            
            return resposta.json();
        })
        .then(function (kpi) {
            console.log("Resultado das reclamações:", kpi);  

            
            if (Array.isArray(kpi) && kpi.length > 0) {
                kpi.forEach((reclamacao) => {
                if (reclamacao.unidade) {
                        unidadeMaisReclamacoes.innerHTML = `<span>${reclamacao.unidade}</span>`;
                    } else {
                        console.warn("Campo 'Unidade' não encontrado ou está vazio");
                    }
                });
            } else {
                console.warn("Nenhum dado encontrado ou a estrutura da resposta está incorreta");
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}


// Execute a função ao carregar a página
kpiMaisReclamacoes();











