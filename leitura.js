document.addEventListener("DOMContentLoaded", function () {

  /* =====================================================
     ELEMENTOS PRINCIPAIS
     ===================================================== */

  const main =
    document.getElementById("quarto-document-content") ||
    document.querySelector("main.content");

  const header = document.getElementById("meu-header");
  const readButton = document.getElementById("botao-leitura");


  /* =====================================================
     TÍTULO CENTRALIZADO NO HEADER
     ===================================================== */

  const headerTitulo =
    document.querySelector("#meu-header .header-titulo");

  const tituloPrincipal =
    document.querySelector("#title-block-header .title");

  if (headerTitulo && tituloPrincipal) {
    headerTitulo.textContent = tituloPrincipal.textContent;
  }


  /* =====================================================
     ALTURA DO HEADER
     ===================================================== */

  function headerHeight() {
    return header
      ? header.getBoundingClientRect().height
      : 0;
  }


  /* =====================================================
     MODO LEITURA
     ===================================================== */

  if (readButton) {

    const menuIcon = `
      <svg xmlns="http://www.w3.org/2000/svg"
           width="24"
           height="24"
           viewBox="0 -960 960 960"
           fill="currentColor"
           aria-hidden="true">

        <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>

      </svg>
    `;


    const bookIcon = `
      <svg xmlns="http://www.w3.org/2000/svg"
           width="24"
           height="24"
           viewBox="0 -960 960 960"
           fill="currentColor"
           aria-hidden="true">

        <path d="M440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6q47 0 91.5 10.5T440-278Zm40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q74 0 126 17t112 52q11 6 16.5 14t5.5 21v418q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-481q15 5 29.5 11t28.5 14q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59Zm140-240v-440l120-40v440l-120 40Zm-340-99Z"/>

      </svg>
    `;


    function updateReadButton() {

      const active =
        document.body.classList.contains("modo-leitura");

      readButton.innerHTML =
        active
          ? menuIcon
          : `${bookIcon} Modo de leitura`;

      readButton.setAttribute(
        "title",
        active
          ? "Voltar ao modo normal"
          : "Modo leitura"
      );

      readButton.setAttribute(
        "aria-label",
        active
          ? "Voltar ao modo normal"
          : "Ativar modo leitura"
      );
    }


    readButton.addEventListener("click", function () {

      document.body.classList.toggle("modo-leitura");

      updateReadButton();

    });


    updateReadButton();

  }


  /* =====================================================
     PESQUISA NO ÍNDICE LATERAL
     ===================================================== */

  function normalize(text) {

    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  }


  function addTocSearch() {

    const sidebar =
      document.getElementById(
        "quarto-sidebar-toc-left"
      );

    const toc =
      document.getElementById("TOC");

    if (!sidebar || !toc) {
      return false;
    }


    if (
      document.getElementById(
        "toc-pesquisa-container"
      )
    ) {
      return true;
    }


    const container =
      document.createElement("div");

    container.id =
      "toc-pesquisa-container";


    const icone =
      document.createElement("span");

    icone.className =
      "material-symbols-outlined toc-pesquisa-icone";

    icone.setAttribute(
      "aria-hidden",
      "true"
    );

    icone.textContent = "search";


    const input =
      document.createElement("input");

    input.id =
      "toc-pesquisa";

    input.type =
      "search";

    input.placeholder =
      "Pesquisar no índice";

    input.setAttribute(
      "aria-label",
      "Pesquisar no índice"
    );


    container.append(
      icone,
      input
    );


    sidebar.insertBefore(
      container,
      toc
    );


    input.addEventListener(
      "input",
      function () {

        const term =
          normalize(input.value);

        const items =
          toc.querySelectorAll("li");

        const links =
          toc.querySelectorAll(
            "a.nav-link"
          );


        sidebar.classList.toggle(
          "toc-pesquisando",
          Boolean(term)
        );


        items.forEach(
          function (item) {

            item.classList.toggle(
              "toc-item-oculto",
              Boolean(term)
            );

          }
        );


        if (!term) {
          return;
        }


        links.forEach(
          function (link) {

            if (
              !normalize(
                link.textContent
              ).includes(term)
            ) {
              return;
            }


            let item =
              link.closest("li");


            while (
              item &&
              item !== toc
            ) {

              item.classList.remove(
                "toc-item-oculto"
              );

              item =
                item.parentElement.closest(
                  "li"
                );

            }

          }
        );

      }
    );


    return true;

  }


  let attempts = 0;


  const tocTimer =
    setInterval(
      function () {

        attempts += 1;

        if (
          addTocSearch() ||
          attempts >= 100
        ) {

          clearInterval(
            tocTimer
          );

        }

      },
      100
    );


  if (!main) {
    return;
  }


  /* =====================================================
     IDENTIFICA OS H1 PRINCIPAIS
     ===================================================== */

  const headings =
    Array.from(
      main.querySelectorAll("h1")
    );


  if (headings.length < 2) {
    return;
  }


  /* =====================================================
     CADA H1 PRINCIPAL VIRA UMA PÁGINA
     ===================================================== */

  const pages =
    headings.map(
      function (heading, index) {

        if (!heading.id) {

          heading.id =
            `secao-${index + 1}`;

        }


        const quartoSection =
          heading.closest(
            "section"
          );


        if (
          quartoSection &&
          main.contains(quartoSection)
        ) {

          quartoSection.classList.add(
            "pagina-secao"
          );

          return quartoSection;

        }


        const nextHeading =
          headings[index + 1];

        const nodes = [];


        for (
          let node = heading;
          node && node !== nextHeading;
          node = node.nextElementSibling
        ) {

          nodes.push(node);

        }


        const page =
          document.createElement(
            "section"
          );

        page.className =
          "pagina-secao";


        heading.parentElement.insertBefore(
          page,
          heading
        );


        nodes.forEach(
          function (node) {

            page.appendChild(node);

          }
        );


        return page;

      }
    );


  /* =====================================================
     NOTAS DE RODAPÉ
     =====================================================

     O Quarto/Pandoc normalmente coloca todas as notas
     em uma única section.footnotes no final do documento.

     Aqui identificamos quais notas pertencem a cada
     página/seção para mostrar somente as notas utilizadas
     naquela seção.
     ===================================================== */

  const footnotesSection =
    main.querySelector(
      "section.footnotes"
    );


  const footnoteItemsByPage =
    new Map();


  if (footnotesSection) {

    const footnoteItems =
      Array.from(
        footnotesSection.querySelectorAll(
          "li[id]"
        )
      );


    /* ---------------------------------------------------
       Mantém a numeração original
       --------------------------------------------------- */

    footnoteItems.forEach(
      function (item, index) {

        item.setAttribute(
          "value",
          String(index + 1)
        );

      }
    );


    /* ---------------------------------------------------
       Mapa ID → nota
       --------------------------------------------------- */

    const itemById =
      new Map();


    footnoteItems.forEach(
      function (item) {

        itemById.set(
          item.id,
          item
        );

      }
    );


    /* ---------------------------------------------------
       Inicializa o conjunto de notas de cada página
       --------------------------------------------------- */

    pages.forEach(
      function (page) {

        footnoteItemsByPage.set(
          page,
          new Set()
        );

      }
    );


    /* ---------------------------------------------------
       Descobre em qual página cada nota é utilizada
       --------------------------------------------------- */

    const footnoteRefs =
      main.querySelectorAll(
        "a.footnote-ref[href^='#']"
      );


    footnoteRefs.forEach(
      function (ref) {

        const page =
          ref.closest(
            ".pagina-secao"
          );


        const href =
          ref.getAttribute(
            "href"
          );


        if (!href) {
          return;
        }


        const id =
          decodeURIComponent(
            href.slice(1)
          );


        const item =
          itemById.get(id);


        if (
          page &&
          item &&
          footnoteItemsByPage.has(page)
        ) {

          footnoteItemsByPage
            .get(page)
            .add(item);

        }

      }
    );


    /* ---------------------------------------------------
       Inicialmente esconde as notas.
       updateFootnotes() exibirá as notas da página ativa.
       --------------------------------------------------- */

    footnotesSection.hidden = true;

  }


  /* =====================================================
     ATUALIZA AS NOTAS DA PÁGINA ATIVA
     ===================================================== */

  function updateFootnotes(page) {

    if (!footnotesSection) {
      return;
    }


    const activeItems =
      footnoteItemsByPage.get(page) ||
      new Set();


    footnotesSection
      .querySelectorAll("li[id]")
      .forEach(
        function (item) {

          item.hidden =
            !activeItems.has(item);

        }
      );


    footnotesSection.hidden =
      activeItems.size === 0;

  }


  /* =====================================================
     ROLAGEM GENÉRICA
     ===================================================== */

  function scrollToTarget(target) {

    if (!target) {
      return;
    }


    const top =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerHeight() -
      16;


    window.scrollTo({

      top: Math.max(0, top),

      behavior: "smooth"

    });

  }


  /* =====================================================
     NOTAS DE RODAPÉ — NAVEGAÇÃO INTERNA
     =====================================================

     IMPORTANTE:

     O clique em uma referência de nota NÃO deve:

       - alterar a página;
       - alterar o hash;
       - chamar showPage();
       - chamar openCurrentHash();
       - abrir uma página vazia.

     Ele simplesmente localiza a nota e rola até ela.
     ===================================================== */

  document.addEventListener(
    "click",
    function (event) {

      const ref =
        event.target.closest(
          "a.footnote-ref[href^='#']"
        );


      if (!ref) {
        return;
      }


      /* Impede a navegação padrão do navegador */
      event.preventDefault();


      /* Impede outros handlers de tratarem o hash */
      event.stopPropagation();


      const href =
        ref.getAttribute(
          "href"
        );


      if (!href) {
        return;
      }


      const id =
        decodeURIComponent(
          href.slice(1)
        );


      const target =
        document.getElementById(
          id
        );


      if (!target) {
        return;
      }


      /* A nota já deve estar visível graças ao
         updateFootnotes() da página atual. */

      scrollToTarget(
        target
      );

    },
    true
  );


  /* =====================================================
     VOLTAR DA NOTA PARA O TEXTO
     =====================================================

     O Pandoc normalmente cria links como:

       <a href="#fnref-1">↩︎</a>

     ou estruturas semelhantes dentro da nota.

     Também interceptamos esses links para impedir que
     o sistema de páginas interprete a referência como
     uma nova página.
     ===================================================== */

  document.addEventListener(
    "click",
    function (event) {

      const link =
        event.target.closest(
          "section.footnotes a[href^='#']"
        );


      if (!link) {
        return;
      }


      event.preventDefault();
      event.stopPropagation();


      const href =
        link.getAttribute(
          "href"
        );


      if (!href) {
        return;
      }


      const id =
        decodeURIComponent(
          href.slice(1)
        );


      const target =
        document.getElementById(
          id
        );


      if (!target) {
        return;
      }


      scrollToTarget(
        target
      );

    },
    true
  );


  /* =====================================================
     SUBÍNDICE DIREITO
     ===================================================== */

  const rightIndex =
    document.createElement(
      "aside"
    );


  rightIndex.id =
    "subindice-direito";


  rightIndex.setAttribute(
    "aria-label",
    "Subíndice da página atual"
  );


  document.body.appendChild(
    rightIndex
  );


  let rightIndexEntries = [];


  /* =====================================================
     ATUALIZA SUBÍNDICE DIREITO
     ===================================================== */

  function updateRightIndex(page) {

    rightIndex.innerHTML = "";

    rightIndexEntries = [];


    const subtitles =
      Array.from(
        page.querySelectorAll(
          "h2, h3"
        )
      );


    rightIndex.hidden =
      subtitles.length === 0;


    if (!subtitles.length) {
      return;
    }


    const title =
      document.createElement(
        "h2"
      );


    title.textContent =
      "Nesta página";


    const list =
      document.createElement(
        "ul"
      );


    const mainHeading =
      page.querySelector(
        "h1"
      );


    /* ---------------------------------------------------
       Título principal
       --------------------------------------------------- */

    if (mainHeading) {

      const mainItem =
        document.createElement(
          "li"
        );


      const mainLink =
        document.createElement(
          "a"
        );


      mainLink.className =
        "subindice-principal";


      mainLink.href =
        `#${mainHeading.id}`;


      mainLink.textContent =
        mainHeading.textContent;


      mainLink.addEventListener(
        "click",
        function (event) {

          event.preventDefault();


          history.pushState(
            null,
            "",
            `#${encodeURIComponent(
              mainHeading.id
            )}`
          );


          scrollToTarget(
            mainHeading
          );

        }
      );


      rightIndexEntries.push({

        heading: mainHeading,

        link: mainLink

      });


      mainItem.appendChild(
        mainLink
      );


      list.appendChild(
        mainItem
      );

    }


    /* ---------------------------------------------------
       H2 e H3
       --------------------------------------------------- */

    subtitles.forEach(
      function (subtitle, index) {

        if (!subtitle.id) {

          subtitle.id =
            `${page.querySelector("h1").id}-sub-${index + 1}`;

        }


        const item =
          document.createElement(
            "li"
          );


        if (
          subtitle.tagName === "H3"
        ) {

          item.className =
            "subindice-nivel-3";

        }


        const link =
          document.createElement(
            "a"
          );


        link.href =
          `#${subtitle.id}`;


        link.textContent =
          subtitle.textContent;


        link.addEventListener(
          "click",
          function (event) {

            event.preventDefault();


            history.pushState(
              null,
              "",
              `#${encodeURIComponent(
                subtitle.id
              )}`
            );


            scrollToTarget(
              subtitle
            );

          }
        );


        rightIndexEntries.push({

          heading: subtitle,

          link: link

        });


        item.appendChild(
          link
        );


        list.appendChild(
          item
        );

      }
    );


    rightIndex.append(
      title,
      list
    );


    updateRightIndexActive();

  }


  /* =====================================================
     ATUALIZA ITEM ATIVO DO SUBÍNDICE
     ===================================================== */

  function updateRightIndexActive() {

    if (!rightIndexEntries.length) {
      return;
    }


    let active =
      rightIndexEntries[0];


    rightIndexEntries.forEach(
      function (entry) {

        if (
          entry.heading.getBoundingClientRect().top <=
          headerHeight() + 80
        ) {

          active = entry;

        }

      }
    );


    rightIndexEntries.forEach(
      function (entry) {

        entry.link.classList.toggle(
          "active",
          entry === active
        );

      }
    );

  }


  window.addEventListener(
    "scroll",
    updateRightIndexActive,
    {
      passive: true
    }
  );


  /* =====================================================
     MOSTRAR PÁGINA
     ===================================================== */

  function showPage(
    index,
    target,
    updateHash
  ) {

    if (
      index < 0 ||
      index >= pages.length
    ) {
      return;
    }


    /* ---------------------------------------------------
       Esconde todas as páginas, exceto a atual
       --------------------------------------------------- */

    pages.forEach(
      function (page, pageIndex) {

        page.hidden =
          pageIndex !== index;

      }
    );


    const destination =
      target ||
      headings[index];


    /* ---------------------------------------------------
       Atualiza componentes da página
       --------------------------------------------------- */

    updateRightIndex(
      pages[index]
    );


    updateFootnotes(
      pages[index]
    );


    /* ---------------------------------------------------
       Atualiza hash somente para páginas/seções
       --------------------------------------------------- */

    if (updateHash) {

      history.pushState(
        null,
        "",
        `#${encodeURIComponent(
          destination.id
        )}`
      );

    }


    scrollToTarget(
      destination
    );

  }


  /* =====================================================
     BOTÕES ANTERIOR / PRÓXIMO
     ===================================================== */

  pages.forEach(
    function (page, index) {

      const navigation =
        document.createElement(
          "nav"
        );


      navigation.className =
        "navegacao-secoes";


      navigation.setAttribute(
        "aria-label",
        "Navegação entre seções principais"
      );


      /* ---------------------------------------------------
         BOTÃO ANTERIOR
         --------------------------------------------------- */

      if (index > 0) {

        const previous =
          document.createElement(
            "button"
          );


        previous.type =
          "button";


        previous.className =
          "nav-secao nav-secao-anterior";


        previous.innerHTML =
          '<span aria-hidden="true">←</span> Anterior';


        previous.addEventListener(
          "click",
          function () {

            showPage(
              index - 1,
              headings[index - 1],
              true
            );

          }
        );


        navigation.appendChild(
          previous
        );

      } else {

        navigation.appendChild(
          document.createElement(
            "span"
          )
        );

      }


      /* ---------------------------------------------------
         BOTÃO PRÓXIMO
         --------------------------------------------------- */

      if (
        index <
        pages.length - 1
      ) {

        const next =
          document.createElement(
            "button"
          );


        next.type =
          "button";


        next.className =
          "nav-secao nav-secao-proxima";


        next.innerHTML =
          'Próximo <span aria-hidden="true">→</span>';


        next.addEventListener(
          "click",
          function () {

            showPage(
              index + 1,
              headings[index + 1],
              true
            );

          }
        );


        navigation.appendChild(
          next
        );

      }


      page.appendChild(
        navigation
      );

    }
  );


  /* =====================================================
     ÍNDICE ESQUERDO
     =====================================================

     Quando o usuário clica em uma seção principal no
     índice esquerdo, abrimos a página correspondente.
     ===================================================== */

  document.addEventListener(
    "click",
    function (event) {

      const link =
        event.target.closest(
          "#TOC a[href^='#']"
        );


      if (!link) {
        return;
      }


      const id =
        decodeURIComponent(
          link.getAttribute(
            "href"
          ).slice(1)
        );


      const target =
        document.getElementById(
          id
        );


      const page =
        target &&
        target.closest(
          ".pagina-secao"
        );


      if (!page) {
        return;
      }


      event.preventDefault();


      showPage(
        pages.indexOf(page),
        target,
        true
      );

    }
  );


  /* =====================================================
     ABRIR PÁGINA A PARTIR DO HASH
     ===================================================== */

  function openCurrentHash() {

    const hash =
      window.location.hash.slice(1);


    if (!hash) {

      showPage(
        0,
        headings[0],
        false
      );

      return;

    }


    const id =
      decodeURIComponent(
        hash
      );


    /* ---------------------------------------------------
       IMPORTANTE:

       Se o hash pertence a uma nota de rodapé, NÃO
       tratamos como uma seção do livro.

       Isso evita que o sistema abra a primeira página
       ou uma página vazia quando o navegador resolve
       uma âncora de nota.
       --------------------------------------------------- */

    const footnoteTarget =
      document.getElementById(
        id
      );


    if (
      footnoteTarget &&
      footnotesSection &&
      footnotesSection.contains(
        footnoteTarget
      )
    ) {

      return;

    }


    const target =
      document.getElementById(
        id
      );


    const page =
      target &&
      target.closest(
        ".pagina-secao"
      );


    showPage(
      page
        ? pages.indexOf(page)
        : 0,

      target ||
        headings[0],

      false
    );

  }


  /* =====================================================
     HASHCHANGE
     ===================================================== */

  window.addEventListener(
    "hashchange",
    function () {

      const id =
        decodeURIComponent(
          window.location.hash.slice(1)
        );


      /* ---------------------------------------------------
         Se for uma nota de rodapé, não muda de página.
         --------------------------------------------------- */

      const target =
        document.getElementById(
          id
        );


      if (
        target &&
        footnotesSection &&
        footnotesSection.contains(
          target
        )
      ) {

        return;

      }


      openCurrentHash();

    }
  );


  /* =====================================================
     INICIALIZAÇÃO
     ===================================================== */

  openCurrentHash();

});
