// Certifique-se de que o Chart.js e o plugin de datalabels estão disponíveis
Chart.register(ChartDataLabels);

const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'pie', // Tipo de gráfico
    data: {
        labels: ['Unidade 2', 'Unidade 3', 'Matriz'],
        datasets: [{
            label: 'Distribuição',
            data: [1280, 312, 170], // Dados 
            backgroundColor: [
                'rgba(74, 42, 140, 0.9)', 
                'rgba(95, 59, 170, 0.9)', 
                'rgba(43, 8, 92, 0.9)', 
            ],
            borderColor: [
                '#fff', // Cor Base
                '#fff', // Cor Base
                '#fff', // Cor Base
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true, // Garantir que o gráfico seja responsivo
        maintainAspectRatio: false, // Permitir que o gráfico mantenha a proporção
        plugins: {
            legend: {
                position: 'right', // Posicionar a legenda na direita
            },
            datalabels: {
                color: '#fff', // Cor dos rótulos
                formatter: (value, context) => {
                    // Calcula a porcentagem
                    const data = context.chart.data.datasets[0].data;
                    const total = data.reduce((acc, val) => acc + val, 0);
                    const percentage = (value / total * 100).toFixed(1);
                    return `${percentage}%`; // Retorna o valor em porcentagem
                },
                anchor: 'end', // Alinha o rótulo ao final do setor
                align: 'start', // Alinha o texto do rótulo
                offset: 0, // Distância dos rótulos em relação ao gráfico
                font: {
                    weight: 'bold',
                    size: 12,
                }
            }
        }
    }
});






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
