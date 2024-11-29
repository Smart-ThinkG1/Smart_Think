document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("modal-container");
    const modalService = document.getElementById("serviceModal");
    const loginModal = document.getElementById("loginModal");
    const loginBtn = document.getElementById("loginBtn");
    const loginBtnMobile = document.getElementById("loginBtnMobile");
    const signupBtn = document.getElementById("signupBtn");
    const signupBtnMobile = document.getElementById("signupBtnMobile");
    const bannerServiceBtn = document.getElementById("bannerServiceBtn");
    const closeModal = document.querySelectorAll(".close");
    const inputs = document.querySelectorAll('input');
    const cpfInput = document.getElementById('cpf');

    let listaEmpresasCadastradas = [];

    cpfInput.addEventListener('input', function () {
        cpfInput.value = cpfInput.value.replace(/\D/g, '');
    });

    function clearInputs() {
        inputs.forEach(input => input.value = '');
    }

    function openSignupModal() {
        modal.style.display = "flex";
        clearInputs();
    }

    function openLoginModal() {
        loginModal.style.display = "flex";
        clearInputs();
    }

    signupBtn.onclick = openSignupModal;
    signupBtnMobile.onclick = openSignupModal;

    loginBtn.onclick = openLoginModal;
    loginBtnMobile.onclick = openLoginModal;

    bannerServiceBtn.onclick = function () {
        modalService.style.display = "flex";
        clearInputs();
    };

    closeModal.forEach(button => {
        button.onclick = function () {
            modal.style.display = "none";
            loginModal.style.display = "none";
            modalService.style.display = "none";
            clearInputs();
        };
    });

    window.onclick = function (event) {
        if (event.target == modal || event.target == loginModal || event.target == modalService) {
            modal.style.display = "none";
            loginModal.style.display = "none";
            modalService.style.display = "none";
            clearInputs();
        }
    };

    function mostrarErro(mensagem) {
        let cardErro = document.getElementById('cardErro');
        if (!cardErro) {
            cardErro = document.createElement('div');
            cardErro.id = 'cardErro';
            cardErro.style.color = 'red';
            document.querySelector('.modal-content').appendChild(cardErro);
        }
        cardErro.style.display = 'block';
        cardErro.innerHTML = mensagem;
    }

    function sumirMensagem() {
        const cardErro = document.getElementById('cardErro');
        if (cardErro) {
            cardErro.style.display = 'none';
        }
    }

    function cadastrar() {
        var nomeVar = document.getElementById('nome').value;
        var cpfVar = document.getElementById('cpf').value;
        var emailVar = document.getElementById('email').value;
        var senhaVar = document.getElementById('senha').value;
        var codigoAccessVar = document.getElementById('codigoAccess').value;

        sumirMensagem(); // Limpa mensagens de erro antes da validação

        var temNumero = /\d/;
        var temMaiuscula = /[A-Z]/;
        if (!temNumero.test(senhaVar) || !temMaiuscula.test(senhaVar)) {
            mostrarErro("A senha precisa ter pelo menos uma letra maiúscula e um número.");
            return;
        }

        if (nomeVar && cpfVar && emailVar && senhaVar && codigoAccessVar) {
            fetch("/usuarios/cadastrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nomeServer: nomeVar,
                    cpfServer: cpfVar,
                    emailServer: emailVar,
                    senhaServer: senhaVar,
                    codigoServer: codigoAccessVar
                }),
            })
                .then(function (resposta) {
                    if (resposta.ok) {
                        alert("Cadastro realizado com sucesso! Agora, faça o login.");
                        openLoginModal();               // Chama o modal de login
                        modal.style.display = "none";   // Fecha o modal de cadastro
                    } else {
                        mostrarErro("Erro ao tentar realizar o cadastro.");
                    }
                })
                .catch(function (erro) {
                    console.log("#ERRO:", erro);
                    mostrarErro("Erro ao tentar realizar o cadastro. Tente novamente mais tarde.");
                });
        } else {
            mostrarErro("Todos os campos devem ser preenchidos!");
        }
    }

    // Mascara de inputs -
    // **** CPF XXX-XXX-XXX.XX:
    const maskCPF = (cpf) => {
        return cpf
            .replace(/\D/g, '')                     // Remove todos os caracteres não dígitos
            .replace(/(\d{3})(\d)/, '$1.$2')        // Primeiro ponto
            .replace(/(\d{3})(\d)/, '$1.$2')        // Segundo ponto
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Traço
    };

    // evento que ouve o campo CPF
    cpfInput.addEventListener('input', () => {
        cpfInput.value = maskCPF(cpfInput.value);
    });

    // Evento para o botão de submit no modal de cadastro
    document.querySelector('.modal-content button[type="submit"]').addEventListener('click', function (event) {
        event.preventDefault();
        cadastrar();
    });

    // Login
    const emailInput = document.getElementById("loginEmail");
    const senhaInput = document.getElementById("loginSenha");

    function login() {
        const emailVar = emailInput.value.trim();
        const senhaVar = senhaInput.value.trim();

        sumirMensagem(); // Limpa mensagens de erro antes da validação

        if (!emailVar || !emailVar.includes("@") || !emailVar.includes(".")) {
            mostrarErro("E-mail inválido. Por favor, insira um e-mail válido.");
            return;
        }

        if (senhaVar.length < 8) {
            mostrarErro("A senha deve ter pelo menos 8 caracteres.");
            return;
        }

        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                emailServer: emailVar,
                senhaServer: senhaVar
            }),
        })
            .then(function (resposta) {
                if (resposta.ok) {
                    return resposta.json();
                } else if (resposta.status === 204) {
                    mostrarErro("Nenhum dado encontrado.");
                    return null;
                } else {
                    mostrarErro("E-mail ou senha incorretos. Tente novamente.");
                    return null;
                }
            })
            .then(function (dados) {
                if (dados) {
                    console.log("Dados recebidos:", dados); // Log para verificar o conteúdo dos dados

                    sessionStorage.setItem("NOME_USUARIO", dados.nome || "");
                    sessionStorage.setItem("EMAIL_USUARIO", dados.email || "");
                    sessionStorage.setItem("FK_EMPRESA", dados.fkEmpresa || "");
                    sessionStorage.setItem("FK_MARCA", dados.fkMarca || "");
                    sessionStorage.setItem("CODIGO", dados.codigo || "");

                    alert("Login realizado com sucesso!");

                    if (dados.fkMarca === null)  {
                        // USUARIO É DIRETOR
                        window.open("./dashboard/dashboard.html", "_blank");
                    } else {
                        // USUARIO É GERENTE
                        window.open("./dashboard/unidade.html", "_blank");
                    }
                    
                }
            })
            .catch(function (erro) {
                console.error("#ERRO:", erro);
                mostrarErro("Erro ao tentar realizar o login. Tente novamente mais tarde.");
            });
    }

    // Evento para o botão de submit no modal de login
    document.querySelector('#loginModal form').addEventListener('submit', function (event) {
        event.preventDefault();
        login();
    });

    const infoIcons = document.querySelectorAll('.info-icon');
    let currentTooltip = null;

    infoIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function () {
            if (currentTooltip) return;

            currentTooltip = document.createElement('div');
            currentTooltip.className = 'tooltip';
            currentTooltip.innerText = icon.getAttribute('title');
            document.body.appendChild(currentTooltip);
            const rect = icon.getBoundingClientRect();
            currentTooltip.style.left = `${rect.left + window.scrollX}px`;
            currentTooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
        });

        icon.addEventListener('mouseleave', function () {
            if (currentTooltip) {
                currentTooltip.remove();
                currentTooltip = null;
            }
        });
    });

    document.getElementById("showLogin").onclick = function () {
        modal.style.display = "none";
        loginModal.style.display = "flex";
    };

    document.getElementById("showSignup").onclick = function () {
        loginModal.style.display = "none";
        modal.style.display = "flex";
    };
}); 