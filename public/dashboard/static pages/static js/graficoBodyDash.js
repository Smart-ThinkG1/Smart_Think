// Certifique-se de que o Chart.js e o plugin de datalabels estão disponíveis
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








// Gráfico Barra Horizontal Unidade 1 (Matriz)
const ctx2 = document.getElementById('myBarChart1').getContext('2d');
new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['Positivos', 'Neutros', 'Negativos'], // Ordem alterada
        datasets: [{
            axis: 'y',
            label: 'Quantidade',
            data: [396, 113, 170], // Ordem dos dados ajustada
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



const ctx3 = document.getElementById('myBarChart2').getContext('2d');
new Chart(ctx3, {
    type: 'bar',
    data: {
        labels: ['Positivos', 'Neutros', 'Negativos'], // Ordem alterada
        datasets: [{
            axis: 'y',
            label: 'Quantidade',
            data: [375, 312, 312], // Dados redistribuídos
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


const ctx4 = document.getElementById('myBarChart3').getContext('2d');
new Chart(ctx4, {
    type: 'bar',
    data: {
        labels: ['Positivos', 'Neutros', 'Negativos'], // Ordem alterada
        datasets: [{
            axis: 'y',
            label: 'Quantidade',
            data: [256, 384, 1280], // Dados redistribuídos
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
