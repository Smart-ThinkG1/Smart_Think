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

// Atualiza o conteúdo de todos os spans encontrados
userNameSpans.forEach(span => span.textContent = firstNameUser);
userEmailSpans.forEach(span => span.textContent = emailUser);

function guardarUnidade(unidadeId) {
    sessionStorage.FK_Unidade = unidadeId;
}

document.addEventListener('DOMContentLoaded', function () {
if(fkMarca === "") {
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
                    const unidade = unidades[0]; // Acessa o primeiro objeto do array
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
                } else {
                    console.warn('Nenhuma unidade encontrada.');
                }
            })
            .catch(error => console.error('Erro ao carregar unidade específica:', error));
    }
});
