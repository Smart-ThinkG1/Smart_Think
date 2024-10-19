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