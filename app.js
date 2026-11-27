const portfolio = {
    "tema": {
        "corPrimaria": "#2563eb",
        "corFundo": "#0f172a",
        "corCard": "#1e293b",
        "corTexto": "#f8fafc"
    },
    "perfil": {
        "nome": "Pedro Ivo Sandes",
        "cargo": "Estudante de Tecnologia | Fotográfo | Empreendedor de Energia Solar",
        "resumo": "Apaixonado por resolver problemas com código, aprender novas tecnologias e construir projetos práticos.",
        "foto": "./assets/IMG_0157.JPG",
        "links": [
            {
                "rotulo": "GitHub",
                "url": "https://github.com"
            },
            {
                "rotulo": "Instagram",
                "url": "https://instagram.com/pedro.sandess"
          },
            {
                "rotulo": "Fotografia",
                "url": "https://instagram.com/sandesfoto"
            },
            {
                "rotulo": "SSolar",
                "url": "https://instagram.com/ssolar_sergipe"
            }
        ]
    },
    "secoes": [
        {
            "id": "sobre",
            "titulo": "Sobre mim",
            "tipo": "texto",
            "conteudo": "Jovem empreendedor atuando como fotográfo autonomo e sub-proprietário da Empresa de Energia Solar SSOlar Sergipe."
        },
        {
            "id": "habilidades",
            "titulo": "Habilidades",
            "tipo": "lista",
          "itens": [
              "Foografia Esportiva",
              "Fotografia de Estúdio",
            "Fotografia de Eventos",
              "Venda e pós venda de sistemas de energia solar",
                "HTML & CSS",
                "JavaScript",
                "Git & GitHub",
                "Lógica de Programação"
            ]
        },
        {
            "id": "projetos",
            "titulo": "Projetos",
            "tipo": "cards",
            "itens": [
                {
                    "titulo": "Projeto Exemplo 1",
                    "descricao": "Breve descrição do que o projeto faz e qual problema resolve.",
                    "tags": [
                        "HTML",
                        "CSS"
                    ],
                    "link": "https://github.com"
                },
                {
                    "titulo": "Projeto Exemplo 2",
                    "descricao": "Outro projeto que você desenvolveu durante o curso ou por conta própria.",
                    "tags": [
                        "JavaScript",
                        "API"
                    ],
                    "link": "#"
                }
            ]
        }
    ]
}

async function carregarPortfolio() {
  const heroEl = document.getElementById("topo");
  const navEl = document.getElementById("navegacao");
  const mainEl = document.getElementById("conteudo");

  aplicarTema(portfolio.tema);
  renderizarPerfil(portfolio.perfil, heroEl);
  renderizarSecoes(portfolio.secoes || [], navEl, mainEl);
}

function aplicarTema(tema = {}) {
  const root = document.documentElement;
  if (tema.corPrimaria) root.style.setProperty("--cor-primaria", tema.corPrimaria);
  if (tema.corFundo) root.style.setProperty("--cor-fundo", tema.corFundo);
  if (tema.corCard) root.style.setProperty("--cor-card", tema.corCard);
  if (tema.corTexto) root.style.setProperty("--cor-texto", tema.corTexto);
}

function renderizarPerfil(perfil = {}, container) {
  document.title = perfil.nome ? `${perfil.nome} | Portfólio` : "Portfólio";

  const linksHtml = (perfil.links || [])
    .map(
      (link) =>
        `<a class="btn" href="${link.url}" target="_blank" rel="noopener noreferrer">${link.rotulo}</a>`
    )
    .join("");

  container.innerHTML = `
    ${perfil.foto ? `<img class="avatar" src="${perfil.foto}" alt="Foto de ${perfil.nome || "perfil"}" />` : ""}
    <div class="hero-info">
      <h1>${perfil.nome || "Seu Nome"}</h1>
      <p class="cargo">${perfil.cargo || ""}</p>
      <p>${perfil.resumo || ""}</p>
      <div class="links">${linksHtml}</div>
    </div>
  `;
}

function renderizarSecoes(secoes, navEl, mainEl) {
  navEl.innerHTML = secoes
    .map((secao) => `<a href="#${secao.id}">${secao.titulo}</a>`)
    .join("");

  mainEl.innerHTML = secoes
    .map((secao) => {
      let corpoHtml = "";

      if (secao.tipo === "texto") {
        corpoHtml = `<div class="card-box"><p>${secao.conteudo || ""}</p></div>`;
      } else if (secao.tipo === "lista") {
        const itens = (secao.itens || [])
          .map((item) => `<li class="tag">${item}</li>`)
          .join("");
        corpoHtml = `<ul class="lista-tags">${itens}</ul>`;
      } else if (secao.tipo === "cards") {
        const cards = (secao.itens || [])
          .map((item) => {
            const tags = (item.tags || [])
              .map((tag) => `<span class="tag">${tag}</span>`)
              .join("");
            return `
              <article class="projeto-card">
                <h3>${item.titulo || "Sem título"}</h3>
                <p>${item.descricao || ""}</p>
                <div class="lista-tags">${tags}</div>
                ${item.link ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer">Ver mais →</a>` : ""}
              </article>
            `;
          })
          .join("");
        corpoHtml = `<div class="grid-cards">${cards}</div>`;
      } else {
        corpoHtml = `<div class="card-box"><p>Tipo de seção "${secao.tipo}" ainda não suportado.</p></div>`;
      }

      return `
        <section id="${secao.id}" class="secao">
          <h2>${secao.titulo}</h2>
          ${corpoHtml}
        </section>
      `;
    })
    .join("");
}

carregarPortfolio();