document.addEventListener("DOMContentLoaded", function () {

  const botao = document.getElementById("botao-leitura");

  if (!botao) return;

  const iconeMenu = `
    <svg xmlns="http://www.w3.org/2000/svg"
         height="24px"
         viewBox="0 -960 960 960"
         width="24px"
         fill="currentColor">
      <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
    </svg>
  `;

  const textoLeitura = "📖 Modo leitura";

  botao.addEventListener("click", function () {

    document.body.classList.toggle("modo-leitura");

    if (document.body.classList.contains("modo-leitura")) {

      // Modo leitura ativado
      botao.innerHTML = iconeMenu;
      botao.setAttribute("aria-label", "Voltar ao modo normal");
      botao.setAttribute("title", "Voltar ao modo normal");

    } else {

      // Modo normal
      botao.innerHTML = textoLeitura;
      botao.setAttribute("aria-label", "Modo leitura");
      botao.setAttribute("title", "Modo leitura");

    }

  });

});