# Repair Girls

**Reparos feitos por mulheres, para mulheres.**

Site que conecta mulheres que precisam de reparos domésticos a profissionais mulheres qualificadas, promovendo segurança e empoderamento feminino.

## Páginas

| Página | Arquivo | Descrição |
|--------|---------|-----------|
| Início | `index.html` | Apresentação do serviço, depoimentos e CTA |
| Como Funciona | `como-funciona.html` | Passo a passo e serviços disponíveis |
| SAQ & Contato | `contato.html` | Perguntas frequentes, formulário de contato e feedback |
| Meu Painel | `painel.html` | Área logada com agendamentos futuros e anteriores |

## Funcionalidades

- Design responsivo (desktop + mobile)
- Paleta suave: rosa, laranja e branco
- Sistema de login/cadastro (JavaScript puro + localStorage)
- Área de agendamentos com criação e cancelamento
- FAQ interativo (accordion)
- Formulário de contato com avaliação por estrelas
- Menu hamburger para mobile
- Notificações toast

## Como rodar

Basta abrir `index.html` no navegador — não há dependências externas nem build necessário.

```bash
# Com Python (servidor local)
python3 -m http.server 8080
# Abra http://localhost:8080
```

## Tecnologias

- HTML5 semântico
- CSS3 (variáveis, gradientes, grid, flexbox, animações)
- JavaScript ES6+ (módulos IIFE, localStorage)
- Google Fonts (Inter)
