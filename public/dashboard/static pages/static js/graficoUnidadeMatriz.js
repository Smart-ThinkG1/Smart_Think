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



