/* Seleciona o elemento de formulário e o campo específico de telefone para manipulação */
const form = document.querySelector("form");
const inputTel = document.querySelector('input[name="telefone"]'); // Campo capturado para aplicar a máscara dinâmica

// 1. MÁSCARA DE TELEFONE (DDD + NÚMERO)
/* Escuta cada dígito inserido no campo de telefone para formatar em tempo real */
inputTel.addEventListener("input", (e) => {
  /* Remove qualquer caractere que não seja número e organiza o que restou em grupos (DDD, prefixo, sufixo) */
  let x = e.target.value
    .replace(/\D/g, "")
    .match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
  /* Monta a string visual: adiciona parênteses no DDD e o hífen conforme o usuário digita */
  e.target.value = !x[2] ? x[1] : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
});

// 2. VALIDAÇÃO AO ENVIAR
/* Intercepta o clique no botão de envio para verificar se os dados estão corretos antes de prosseguir */
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Impede que a página recarregue, permitindo o controle total via JavaScript

  /* Captura os valores atuais inseridos em cada campo do formulário */
  const email = document.querySelector('input[name="email"]').value;
  const msg = document.querySelector("textarea").value;
  const nome = document.querySelector('input[name="nome"]').value;
  const empresa = document.querySelector('input[name="empresa"]').value;

  // Validação Simples de E-mail
  /* Verifica se o e-mail contém o caractere '@' e possui um comprimento mínimo básico */
  if (!email.includes("@") || email.length < 5) {
    alert("Por favor, insira um e-mail válido.");
    return; // Interrompe a execução se houver erro
  }

  // Validação de Telefone (Mínimo de caracteres para um número com DDD)
  /* Garante que o usuário preencheu o telefone formatado completamente (ex: (11) 99999-9999) */
  if (inputTel.value.length < 14) {
    alert("Por favor, insira o telefone completo com DDD.");
    return;
  }

  // 3. SIMULAÇÃO DE ENVIO (OU REDIRECIONAMENTO)
  /* Seleciona o botão para dar um feedback visual de "processando" ao usuário */
  const feedbackBtn = document.querySelector(".btn-enviar");
  feedbackBtn.innerHTML = 'Enviando... <i class="fas fa-spinner fa-spin"></i>'; // Adiciona um ícone de carregamento giratório
  feedbackBtn.style.background = "#005f73"; // Altera a cor do botão para indicar estado de espera

  /* Simula um atraso de rede de 1.5 segundos antes de finalizar a ação */
  setTimeout(() => {
    // Exibe um alerta de agradecimento personalizado com o nome do usuário
    alert(`Obrigado, ${nome}! Sua mensagem foi preparada.`);

    // Abre o cliente de e-mail padrão (Outlook, Gmail) com os campos já preenchidos via URL
    const mailtoLink = `mailto:rodrigoggusmao@gmail.com?subject=Contato Portfólio: ${nome} - ${empresa}&body=Telefone: ${inputTel.value}%0D%0AMensagem: ${msg}`;
    window.location.href = mailtoLink;

    /* Atualiza o botão para o estado de sucesso e limpa os campos do formulário */
    feedbackBtn.innerHTML = 'Mensagem Enviada! <i class="fas fa-check"></i>';
    feedbackBtn.style.background = "#2ecc71"; // Cor verde para sucesso
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    form.reset(); // Limpa todos os campos para uma nova mensagem
  }, 1500);
});
