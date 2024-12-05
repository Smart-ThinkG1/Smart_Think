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

const cadastrarButton = document.getElementById("cadastrarEmpresa");

document.addEventListener("DOMContentLoaded", function () {
    const cadastrarButton = document.getElementById("cadastrarEmpresa");

    if (!cadastrarButton) {
        console.error("Elemento com ID 'cadastrarEmpresa' não encontrado.");
        return;
    }

    cadastrarButton.addEventListener("click", function () {
        let varNewNomeFantasia = document.getElementById("newNomeFantasia");
        let varNewApelido = document.getElementById("newApelido");
        let varNewRazaoSocial = document.getElementById("newRazaoSocial");
        let varNewCnpj = document.getElementById("newCnpj");
        let varNewLogradouro = document.getElementById("newLogradouro");
        let varNewCep = document.getElementById("newCep");
        let varNewEmail = document.getElementById("newEmail");
        let varNewTelefone = document.getElementById("newTelefone");

        if (!fkEmpresa || !varNewNomeFantasia.value || !varNewCnpj.value || varNewCnpj.value.length !== 14) {
            throw new Error('Dados inválidos. Verifique os parâmetros fornecidos.');
        }

        // Extrair partes do hash
        const inicioNome = varNewNomeFantasia.value.substring(0, 3).toUpperCase(); // 3 primeiros caracteres do nome
        const inicioCNPJ = varNewCnpj.value.substring(0, 3); // 3 primeiros dígitos do CNPJ
        const fimCNPJ = varNewCnpj.value.substring(varNewCnpj.value.length - 3); // 3 últimos dígitos do CNPJ

        // Concatenar para formar o hash
        const hash = `${fkEmpresa}${inicioNome}${inicioCNPJ}${fimCNPJ}`;

        // Recuperar dados do formulário
        const empresaData = {
            nomeFantasia: varNewNomeFantasia.value,
            apelido: varNewApelido.value,
            razaoSocial: varNewRazaoSocial.value,
            cnpj: varNewCnpj.value,
            logradouro: varNewLogradouro.value,
            cep: varNewCep.value,
            email: varNewEmail.value,
            telefone: varNewTelefone.value,
            codigo: hash
        };

        fetch(`/empresas/cadastrar/${fkEmpresa}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(empresaData)
        })
            .then(response => {

                if (!response.ok) {
                    throw new Error('Erro ao Criar Empresa.');
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
});
