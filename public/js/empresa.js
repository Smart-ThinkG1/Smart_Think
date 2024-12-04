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

// SubMenu
document.addEventListener('DOMContentLoaded', function () {
    if (fkMarca === "") {
        fetch(`/empresas/unidades/${fkEmpresa}`, {
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


                    if (unidade.id == fkMarca) {
                        li.classList.add('active'); // Usa classList para adicionar a classe

                        descriptionSpan.textContent = unidade.nomeFantasia;
                    }
                    console.log(`Unidade ID: ${fkMarca},
                    Unidade.id: ${unidade.id}`)

                    li.innerHTML = `
                    <a href="../unidade.html?id=${unidade.id}">

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

        fetch(`/empresas/buscar/${fkEmpresa}`)
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
                         <a href="unidade.html?id=${unidade.id}>
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

///


// Recuperando inputs pelo ID
let varNomeFantasia = document.getElementById("nomeFantasia");
let varApelido = document.getElementById("apelido");
let varRazaoSocial = document.getElementById("razaoSocial");
let varCnpj = document.getElementById("cnpj");
let varLogradouro = document.getElementById("logradouro");
let varCep = document.getElementById("cep");
let varEmail = document.getElementById("email");
let varTelefone = document.getElementById("telefone");
let varCodigo = document.getElementById("codigo");

// *** Tratando dados

// Previnindo letras em campos numericos
function filterInput(input) {
    input.value = input.value.replace(/\D/g, '');
}

[varTelefone, varCep, varCnpj].forEach(element => {
    if (element) {
        element.addEventListener("input", function () {
            filterInput(element);
        });
    }
});

function validarCampos() {
    let isValid = true;
    let errorMessage = "";

    if (varTelefone.value.length !== 11) {
        isValid = false;
        errorMessage += "O telefone deve ter 11 dígitos.\n";
    }

    if (varCnpj.value.length !== 14) {
        isValid = false;
        errorMessage += "O CNPJ deve ter 14 dígitos.\n";
    }

    if (varCep.value.length !== 8) {
        isValid = false;
        errorMessage += "O CEP deve ter 8 dígitos.\n";
    }

    if (!isValid) {
        alert(errorMessage);
    }

    return isValid;
}

// Recuperando botões pelo ID
const deletarEmpresaButton = document.getElementById("deletarEmpresa");
const alterarDadosButton = document.getElementById("alterarDados");

document.addEventListener("DOMContentLoaded", function () {

    fetch(`/empresas/buscar/${fkEmpresa}`)
        .then(response => response.json())
        .then(empresas => {
            if (empresas.length > 0) {
                const empresa = empresas[0];
                console.log(empresa);

                varNomeFantasia.value = empresa.nomeFantasia || "";
                varApelido.value = empresa.apelido || "";
                varRazaoSocial.value = empresa.razaoSocial || "";
                varCnpj.value = empresa.cnpj || "";
                varLogradouro.value = empresa.logradouro || "";
                varCep.value = empresa.cep || "";
                varEmail.value = empresa.email || "";
                varTelefone.value = empresa.telefone || "";
                varCodigo.value = empresa.codigo || "";
            } else {
                console.error('Nenhuma empresa encontrada');
            }
        })
        .catch(error => console.error('Erro ao buscar os dados:', error));
});

// Adicionando um ouvinte de evento para o botão de alterar dados
alterarDadosButton.addEventListener("click", function () {

    // Recuperar dados do formulário
    const empresaData = {
        nomeFantasia: varNomeFantasia.value,
        apelido: varApelido.value,
        razaoSocial: varRazaoSocial.value,
        cnpj: varCnpj.value,
        logradouro: varLogradouro.value,
        cep: varCep.value,
        email: varEmail.value,
        telefone: varTelefone.value
    };

    console.log (empresaData)

    // Enviar os dados para o backend
    fetch(`/empresas/atualizar/${fkEmpresa}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(empresaData)
    }) 
        .then(response => {
            
            if (!response.ok) {
                throw new Error('Erro ao atualizar os dados');
            }
            return response.json();
        })
        .then(data => {
            console.log('Sucesso:', data);
            alert(data.message); 
            window.location.reload(); 
        })
        .catch(error => {
            console.error('Erro:', error);
        });
});


