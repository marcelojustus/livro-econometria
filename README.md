Readme · MD
# Princípios de Econometria
 
Livro virtual de estatística e econometria aplicada, com práticas em R, voltado a estudantes de graduação e de extensão.
 
📖 **Versão online:** <https://marcelojustus.github.io/livro-econometria/>
 
> **Nota sobre este repositório.** Este repositório é um *fork* do projeto original de Marcelo Justus ([marcelojustus/livro-econometria](https://github.com/marcelojustus/livro-econometria)). O conteúdo, a autoria intelectual e a responsabilidade docente pertencem ao autor original.
 
---
 
## Sobre o livro
 
*Princípios de Econometria* é uma apostila de apoio às disciplinas de graduação (desde 2014) e aos cursos de extensão (desde 2017) do Instituto de Economia da Unicamp. O objetivo é reunir os conceitos fundamentais de estatística aplicados à econometria, "na medida certa": desde os princípios da estatística inferencial até os fundamentos do modelo clássico de regressão linear, sempre com atenção à distinção entre correlação e causalidade.
 
| | |
|---|---|
| **Autor** | Prof. Marcelo Justus, Instituto de Economia, Unicamp |
| **Versão** | 3.0 |
| **Publicação** | 30 de maio de 2026 |
| **Idioma** | Português (Brasil) |
| **Linguagem das práticas** | R |
 
O material está em revisão e ampliação contínuas. Erros e sugestões podem ser enviados ao autor por e-mail: mjustus@unicamp.br.
 
## Conteúdo
 
### Parte I — A natureza da econometria e dos dados
1. Introdução
2. A natureza da econometria
3. Correlação versus causalidade: o grande desafio da econometria
4. A natureza dos dados
5. As quatro perguntas fundamentais da economia aplicada
6. O papel do econometrista e a ética do trabalho empírico
### Parte II — Fundamentos de Estatística para Econometria
7. Distribuições de probabilidade na econometria (Normal, Qui-quadrado, *t* de Student e *F* de Fisher-Snedecor)
8. Estimação de parâmetros de modelos econométricos
9. Teoria assintótica aplicada à econometria (LGN e TLC)
10. Inferência estatística aplicada à econometria (testes de hipóteses, valor-p, testes *t* e *F*, diagnósticos dos resíduos e intervalos de confiança)
### Parte III — Experimento ideal e fundamentos da regressão
11. Experimento ideal (resultados potenciais, ATT, atribuição aleatória, exemplo do Tennessee STAR, exercícios com dados simulados)
12. Fundamentos da regressão (função de esperança condicional, MQO, erros-padrão robustos, viés de variável omitida, pareamento e escore de propensão)
### Parte IV — Análise de regressão com microdados da PNADC
Prática completa com microdados da PNAD Contínua: descrição dos dados, construção do rendimento-hora, especificações da regressão, heterocedasticidade, erros-padrão robustos e comparação com a biblioteca `survey` (desenho amostral).
 
### Capítulo 13 — Estimação de variáveis instrumentais
Viés de variável omitida, estimador de IV, 2SLS, teste de endogeneidade e teste de restrições sobreidentificadoras.
 
## Pacotes de R utilizados
 
Os capítulos instalam automaticamente os pacotes que ainda não estiverem disponíveis. Entre os principais:
 
- `tidyverse` (`ggplot2`, `dplyr`, `tibble`, `tidyr`, `purrr`)
- `AER`
- `lmtest`
- `gridExtra`
- `survey`

## Declaração de uso de inteligência artificial generativa
 
Conforme declarado pelo autor, os códigos em R foram elaborados com base em exemplos de livros de Estatística e Econometria com R e em adaptações didáticas próprias. Na preparação das práticas computacionais, em especial dos exercícios de simulação, e na revisão gramatical e formal do texto, foi utilizada a ferramenta ChatGPT (OpenAI) como apoio técnico e editorial. A definição dos objetivos didáticos, a seleção dos temas, a construção dos exercícios, a validação dos códigos e a interpretação dos resultados permaneceram sob responsabilidade do autor. A declaração completa está na seção de Apresentação do livro.
 
## Como citar
 
> JUSTUS, Marcelo. **Princípios de Econometria**. Versão 3.0. Campinas: Instituto de Economia, Universidade Estadual de Campinas, 2026. Disponível em: <https://marcelojustus.github.io/livro-econometria/>.

