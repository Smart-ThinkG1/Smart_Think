const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'pie', //Tipo de gráfico
    data: {
        labels: ['Unidade 1', 'Unidade 2', 'Unidade 3', 'Matriz'],
        datasets: [{
            label: 'Distribuição',
            data: [20, 30, 40, 200], // Dados 
            backgroundColor: [
                'rgba(255, 99, 132, 0.4)',
                'rgba(54, 162, 235, 0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(75, 192, 192, 0.4)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true, // Garantir que o gráfico seja responsivo
        maintainAspectRatio: false, // Permitir que o gráfico mantenha a proporção
        plugins: {
            legend: {
                position: 'bottom', // Posicionar a legenda na parte inferior
            }
        }
    }
});


// Gráfico Barra Horizontal Unidade 1 (Matriz)
const ctx2 = document.getElementById('myBarChart1').getContext('2d');
new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['Negativos', 'Positivos', 'Neutros'],
        datasets: [{
            axis: 'y',
            label: 'Quantidade',
            data: [1500, 3500, 1000], // Dados alterados
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(255, 206, 86, 0.8)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 206, 86, 1)'
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
                text: 'Distribuição de Sentimentos',
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
        labels: ['Negativos', 'Positivos', 'Neutros'],
        datasets: [{
            axis: 'y',
            label: 'Quantidade',
            data: [2500, 3000, 2500], // Dados alterados
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(255, 206, 86, 0.8)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 206, 86, 1)'
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
                text: 'Distribuição de Sentimentos',
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
        labels: ['Negativos', 'Positivos', 'Neutros'],
        datasets: [{
            axis: 'y',
            label: 'Quantidade',
            data: [1000, 5000, 1500], // Dados alterados
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(255, 206, 86, 0.8)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 206, 86, 1)'
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
                text: 'Distribuição de Sentimentos',
                font: {
                    family: 'Lato',
                    size: 12 
                }
            }
        }
    }
});