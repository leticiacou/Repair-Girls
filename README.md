# Repair Girls

**Reparos feitos por mulheres, para mulheres.**

Site que conecta mulheres que precisam de reparos domésticos a profissionais mulheres qualificadas, promovendo segurança e empoderamento feminino.

## Páginas

| Página | Arquivo | Descrição |
|--------|---------|-----------|
| Início | `index.html` | Apresentação do serviço, profissionais e CTA |
| Como Funciona | `como-funciona.html` | Passo a passo e serviços disponíveis |
| Materiais | `materiais.html` | Revenda de materiais sustentáveis (BIOSERI) com filtro por categoria |
| SAQ & Contato | `contato.html` | Perguntas frequentes, formulário de contato e feedback |
| Meu Painel | `painel.html` | Agendamentos, novo agendamento e perfil da usuária |

## Funcionalidades

- Design responsivo (desktop + mobile)
- Paleta da marca: `#FF006F` (rosa), `#FFD500` (amarelo) e `#000` sobre fundo branco
- Sistema de login/cadastro (JavaScript puro + localStorage)
- **Perfil da usuária** em área separada no topo do painel: nome, foto, telefone, localização e GPS
- **Geolocalização real**: botão 📍 usa `navigator.geolocation` + reverse geocoding (OpenStreetMap/Nominatim) no cadastro, no perfil e no endereço do serviço
- **Recomendação por proximidade**: com coordenadas GPS, as profissionais são ordenadas por distância real em km (Haversine); sem GPS, cai para matching por cidade → estado → demais
- Perfis públicos das profissionais (foto, especialidade, avaliações, feedbacks, telefone, WhatsApp)
- Área de agendamentos com criação, escolha de profissional e cancelamento
- Catálogo de materiais sustentáveis revendidos da BIOSERI
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

> A geolocalização exige contexto seguro (`https://` ou `localhost`).

## Tecnologias

- HTML5 semântico
- CSS3 (variáveis, gradientes, grid, flexbox, animações)
- JavaScript ES6+ (módulos IIFE, localStorage)
- Google Fonts (Inter)
- Geolocation API + Nominatim (OpenStreetMap)
