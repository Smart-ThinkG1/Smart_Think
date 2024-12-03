// Função para obter o valor de um parâmetro de query string
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Captura o ID da unidade
const unidadeId = getQueryParameter('id');

// Recuperando Nome e Email de SESSION STORAGE
const nameUser = sessionStorage.NOME_USUARIO;
const emailUser = sessionStorage.EMAIL_USUARIO;
const fkEmpresa = sessionStorage.FK_EMPRESA;
const fkMarca = sessionStorage.FK_MARCA;

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

console.log(userNameSpans)
// Atualiza o conteúdo de todos os spans encontrados
userNameSpans.forEach(span => span.textContent = firstNameUser);
userEmailSpans.forEach(span => span.textContent = emailUser);

function guardarUnidade(unidadeId) {
    sessionStorage.FK_Unidade = unidadeId;
}

document.addEventListener('DOMContentLoaded', function () {
    if (fkMarca === "") {
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
                const descriptionSpan = document.querySelector('.description span');

                unidades.forEach(unidade => {
                    const li = document.createElement('li');
                    li.className = 'submenu-item';


                    if (unidade.id == unidadeId) {
                        li.classList.add('active'); // Usa classList para adicionar a classe

                        descriptionSpan.textContent = unidade.nomeFantasia;
                    }
                    console.log(`Unidade ID: ${unidadeId},
                    Unidade.id: ${unidade.id}`)

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
    }
    else {
        const visaoGeralItem = document.querySelector('.nav-menu .nav-item:first-child');
        visaoGeralItem.style.display = 'none';

        console.log("Carregando unidade específica");

        fetch(`../empresas/buscar/${fkEmpresa}`)
            .then(response => response.json())
            .then(unidades => {
                if (unidades.length > 0) {
                    const unidade = unidades[0];
                    const submenuList = document.querySelector('.submenu-list');

                    submenuList.innerHTML = ''; // Limpa a lista existente

                    const li = document.createElement('li');
                    li.className = 'submenu-item';
                    li.classList.add('active');
                    li.innerHTML = `
                        <a href="#">
                            <i class='bx bxs-store'></i>
                            <p>${unidade.apelido}</p>
                        </a>
                    `;
                    submenuList.appendChild(li);

                    // Mudando descrição do header para o nome da unidade atual
                    const descriptionSpan = document.querySelector('.description span');
                    descriptionSpan.textContent = unidade.nomeFantasia;

                } else {
                    console.warn('Nenhuma unidade encontrada.');
                }
            })
            .catch(error => console.error('Erro ao carregar unidade específica:', error));
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const ctx5 = document.getElementById('matrizBar1').getContext('2d');

    const diasMap = {
        "Segunda-feira": 0,
        "Terça-feira": 1,
        "Quarta-feira": 2,
        "Quinta-feira": 3,
        "Sexta-feira": 4,
        "Sábado": 5,
        "Domingo": 6
    };

    function inicializarGraficoDiasSemana(dados) {
        const totalDiaSemana = [0, 0, 0, 0, 0, 0, 0];

        dados.forEach(function (element) {
            const index = diasMap[element.diaSemana];
            if (index !== undefined) {
                totalDiaSemana[index] = element.total || 0;
            }
        });

        new Chart(ctx5, {
            type: 'bar',
            data: {
                labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
                datasets: [{
                    label: 'Número de Buscas',
                    data: totalDiaSemana,
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: true
                    }
                }
            }
        });
    }

    function buscarDiasSemana() {
        const fkEmpresa = sessionStorage.getItem("FK_Unidade");

        fetch(`/graficos/buscarDiasSemana/${fkEmpresa}`, { cache: 'no-store' })
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (resposta) {
                        sessionStorage.setItem("DIAS_SEMANAS", JSON.stringify(resposta));
                        console.log("Dados recebidos:", resposta);

                        inicializarGraficoDiasSemana(resposta); // Inicializa o gráfico com os dados recebidos
                    });
                } else {
                    console.error('Nenhum dado encontrado ou erro na API');
                }
            })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            });
    }

    buscarDiasSemana();
});


document.addEventListener("DOMContentLoaded", function () {
    const ctx6 = document.getElementById('matrizBar2').getContext('2d');

    function buscarTotalReclamacoesEAvaliacoesPorMes() {
        const fkEmpresa = sessionStorage.getItem('FK_Unidade');
        fetch(`/graficos/totalReclamacoesAvaliacoes/${fkEmpresa}`, { cache: 'no-store' })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Erro ao buscar dados do gráfico');
                }
            })
            .then((dados) => {
                const meses = [
                    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
                ];

                const valores = new Array(12).fill(0);

                dados.forEach(({ mes, totalGeral }) => {
                    valores[mes - 1] = totalGeral;
                });

                new Chart(ctx6, {
                    type: 'bar',
                    data: {
                        labels: meses,
                        datasets: [{
                            label: 'Total de Reclamações e Avaliações',
                            data: valores,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(201, 203, 207, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                                'rgba(201, 203, 207, 1)',
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        },
                        plugins: {
                            legend: {
                                display: true // Mostra a legenda
                            }
                        }
                    }
                });
            })
            .catch((error) => {
                console.error('Erro ao carregar o gráfico:', error);
            });
    }

    buscarTotalReclamacoesEAvaliacoesPorMes();
});


function DivisaoSatisfacao() {
    fetch('/kpi/DivisaoSatisfacao')
    .then(response => response.json())
    .then(data => {
        console.log('Dados recebidos:', data); // Verifica o que está sendo retornado pela API

        const positivas = data.PorcentagemPositivas || 0;
        const neutras = data.PorcentagemNeutras || 0;
        const negativas = data.PorcentagemNegativas || 0;

        document.getElementById('porcentagem-positivas').innerHTML = `${positivas.toFixed(2)}%`;
        document.getElementById('porcentagem-neutras').innerHTML = `${neutras.toFixed(2)}%`;
        document.getElementById('porcentagem-negativas').innerHTML = `${negativas.toFixed(2)}%`;
    })
    .catch(error => {
        console.error('Erro ao buscar dados:', error);
    });

}

// Chama a função quando a página carrega
window.onload = DivisaoSatisfacao;


