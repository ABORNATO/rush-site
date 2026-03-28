# TRANSCRIPT COMPLETO — Rush by Voidda
**Data:** 28/03/2026
**Duração:** sessão longa (~8h)
**Escopo:** Website institucional + Sistema de displays + Portal de clientes

---

## 1. INFRAESTRUTURA FINAL — ESTADO ATUAL

### Domínios e destinos

| Domínio | Tipo | Valor | Destino | Status |
|---|---|---|---|---|
| `voidda.com.br` | A | `216.198.79.1` | Vercel (rush-site) | ✅ |
| `www.voidda.com.br` | CNAME | `da532036b8e7097c.vercel-dns-017.com.` | Vercel (rush-site) | ✅ |
| `rush.voidda.com.br` | — | Railway | Sistema Rush | ✅ |
| `displays.voidda.com.br` | CNAME | `43bb83b3a27dbcee.vercel-dns-017.com.` | Vercel (voidda-displays) | ✅ |
| `ftp.voidda.com.br` | A | `69.49.241.24` | HostGator | ✅ |

### IPs críticos — GUARDAR
- **HostGator:** `69.49.241.24` ← NUNCA PERDER ESSE IP
- **Vercel raiz:** `216.198.79.1`
- **Vercel www:** `da532036b8e7097c.vercel-dns-017.com.`
- **Vercel displays:** `43bb83b3a27dbcee.vercel-dns-017.com.`

---

## 2. CREDENCIAIS — GUARDAR COM SEGURANÇA

| Serviço | Usuário | Senha/Token | Observação |
|---|---|---|---|
| FTP HostGator | `voidda91` | `##voiDDA01` | Host: `ftp.voidda.com.br` porta 21 |
| SSH HostGator | `voidda91` | chave RSA | Porta 2222 — shell desabilitado no plano atual |
| GitHub | ABORNATO | — | github.com/ABORNATO |
| Vercel | abornato's projects | — | vinculado ao GitHub |
| Railway | — | — | projeto `resilient-enchantment` |

### Secrets cadastrados no GitHub (voidda-displays)
- `FTP_SERVER` = `ftp.voidda.com.br`
- `FTP_USERNAME` = `voidda91`
- `FTP_PASSWORD` = `##voiDDA01`
- `FTP_PATH` = `/public_html/displays`
- `SSH_PORT` = `2222`
- `SSH_PRIVATE_KEY` = chave RSA gerada em `C:\Users\borna\.ssh\github_actions_key`

### Chave SSH gerada
- **Privada:** `C:\Users\borna\.ssh\github_actions_key`
- **Pública:** `C:\Users\borna\.ssh\github_actions_key.pub`
- Cadastrada no HostGator → cPanel → SSH Access → `github_actions` (authorized)

---

## 3. REPOSITÓRIOS GITHUB

| Repositório | Visibilidade | Vercel | URL |
|---|---|---|---|
| `ABORNATO/rush-site` | Public | voidda.com.br | Site institucional + portal |
| `ABORNATO/voidda-displays` | Private | displays.voidda.com.br | Arquivos de peças HTML |
| `ABORNATO/rush` | Private | rush.voidda.com.br | Sistema Rush (Railway) |

---

## 4. ARQUIVOS E ONDE FICAM

### rush-site (voidda.com.br)
```
index.html        ← site institucional
ver.html          ← portal de visualização do cliente
vercel.json       ← rotas /ver e /ver/:token
```

### voidda-displays (displays.voidda.com.br)
```
index.html                              ← redireciona para voidda.com.br/ver
africa/
  sadia/
    futebol-032026/
      300x250/index.html                ← peça rodando
      300x600/index.html                ← peça rodando
      300x250.zip                       ← pacote para download
      300x600.zip                       ← pacote para download
  itau/
    inst-032026-html/
      300x250_/index.html
fontes/                                 ← fontes versionadas (backlog)
.github/workflows/deploy.yml            ← action desativada (noop)
clients.json                            ← não usado ativamente
```

### HostGator (public_html/displays/)
```
index.html        ← página de acesso restrito
error404.html     ← página de erro bem-humorada
.htaccess         ← força HTTPS + erros customizados
```
**Nota:** o HostGator não serve mais `displays.voidda.com.br` — agora é a Vercel. Esses arquivos ficaram lá mas não são acessados.

---

## 5. PORTAL DE CLIENTES

### Tokens ativos
| Cliente | Token | Link |
|---|---|---|
| Africa | `af2026xk9` | voidda.com.br/ver/af2026xk9 |
| BETC | `bt2026mz3` | voidda.com.br/ver/bt2026mz3 |
| Caipe | `cp2026vw7` | voidda.com.br/ver/cp2026vw7 |
| Sadia | `sa2026vk7` | voidda.com.br/ver/sa2026vk7 |

### Como adicionar cliente novo
1. Abre `rush-site/ver.html` no GitHub → lápis
2. No objeto `CLIENTS` adiciona:
```javascript
"TOKEN": {
  id: "cliente/subcliente",  // ex: "africa/sadia" ou só "betc"
  name: "Nome Exibido",
  expiresAt: "2026-12-31",
  campanhas: [
    {
      id: "nome-da-campanha",
      name: "Nome Legível",
      pecas: [
        { dimensao: "300x250", label: "Medium Rectangle" },
        { dimensao: "300x600", label: "Half Page" },
      ]
    }
  ]
}
```
3. Commit → Vercel redeploy automático
4. Envia link para o cliente

### Padrão de token
`[iniciais][ano][letras]` — ex: `glo2026xk3`, `btg2026mz8`
Tokens gerados nesta sessão: af=1, bt=2, cp=3, sa=4, ~~5~~, ~~6~~, sa=7

### Expiração
- Campo `expiresAt: "YYYY-MM-DD"` no objeto do cliente
- Se expirado: mensagem "Este acesso expirou. Entre em contato com a Voidda."
- Para renovar: editar a data no `ver.html`

---

## 6. FLUXO DE ENTREGA DE PEÇAS

### Como o Motion entrega
1. Extrai os arquivos da peça localmente
2. Cria a estrutura de pastas no repositório `voidda-displays`:
   ```
   [cliente]/[subcampanha]/[campanha]/[dimensao]/
   ```
   Exemplo: `africa/sadia/futebol-032026/300x250/`
3. Coloca o `index.html` e assets dentro da pasta
4. Opcionalmente coloca o `.zip` ao lado para download
5. GitHub Desktop → commit: `entrega: [cliente]/[campanha]`
6. Push origin → Vercel redeploy automático (~30 segundos)
7. Peça disponível em `displays.voidda.com.br/[caminho]/`

### ATENÇÃO: id do cliente no ver.html
O `id` no `ver.html` deve espelhar o caminho no repositório.
- Se a pasta é `africa/sadia/` → `id: "africa/sadia"`
- Se a pasta é `betc/` → `id: "betc"`

### Convenção de nomenclatura
- Cliente: minúsculas, sem acento, sem espaço
- Campanha: curto, sem padrão fixo. Ex: `cannes2026`, `futebol-032026`
- Dimensão: `970x250`, `300x250`, `stories`, `reels`

---

## 7. O QUE DEU ERRADO E POR QUÊ

### ❌ Erro 1: DNS alterado sem mapeamento prévio
**O que aconteceu:** Alteramos o registro A de `voidda.com.br` para a Vercel sem antes mapear o que estava rodando no HostGator (FTP, arquivos, subdomínios).
**Consequência:** FTP parou, arquivos existentes ficaram inacessíveis.
**Lição:** SEMPRE listar e anotar tudo que está rodando antes de alterar DNS. Anotar IPs originais.

### ❌ Erro 2: IP do HostGator não salvo
**O que aconteceu:** Não salvamos o IP original antes de alterar.
**Consequência:** Precisamos do IP para reverter e não tínhamos.
**Lição:** IP do HostGator = `69.49.241.24`. SEMPRE anotar antes de qualquer migração.

### ❌ Erro 3: Domínio não adicionado na Vercel antes do DNS
**O que aconteceu:** Apontamos o DNS para a Vercel antes de adicionar o domínio no projeto da Vercel.
**Consequência:** Site ficou inacessível por tempo desnecessário.
**Lição:** Sequência correta = (1) adicionar domínio na Vercel → (2) pegar os registros → (3) alterar DNS.

### ❌ Erro 4: www não configurado junto com a raiz
**O que aconteceu:** Configuramos apenas o registro A da raiz, sem o CNAME do www.
**Consequência:** `www.voidda.com.br` ficou inacessível.
**Lição:** Sempre configurar raiz E www juntos.

### ❌ Erro 5: GitHub Action FTP não funcionou com HostGator
**O que aconteceu:** Tentamos usar GitHub Actions para fazer deploy via FTP/SFTP para o HostGator.
**Consequência:** HostGator bloqueia conexões FTP e SSH externas em plano compartilhado. SSH conecta mas retorna "Shell access is not enabled on your account".
**Lição:** Hospedagem compartilhada HostGator não aceita conexões automáticas externas. Usar Vercel para servir arquivos estáticos — deploy automático via push no GitHub, zero configuração.

### ❌ Erro 6: Pasta `entregas` commitada no repositório errado
**O que aconteceu:** Commitamos uma pasta `entregas/` no `rush-site` em vez do `voidda-displays`.
**Lição:** Sempre confirmar o repositório ativo antes de commitar no GitHub Desktop.

### ❌ Erro 7: id do cliente sem prefixo de pasta
**O que aconteceu:** No `ver.html`, a Sadia tinha `id: "sadia"` mas no repositório a pasta era `africa/sadia/`.
**Consequência:** URLs geradas apontavam para caminho errado, peças não abriam.
**Lição:** O `id` no `ver.html` deve espelhar exatamente o caminho no repositório `voidda-displays`.

---

## 8. O QUE DEU CERTO

### ✅ Site institucional no ar
- `voidda.com.br` com SSL automático
- HTML único, zero dependências de backend
- Stats reais contados do código (88, 56, 8, 145)
- Foto do Alessandro embutida em base64
- Modal de contato com WhatsApp e email

### ✅ Portal de clientes funcionando
- Login por token com expiração por data
- 4 clientes ativos
- Visualização inline com iframe + fundo xadrez alternável
- Botão "Abrir no browser"
- Mensagem de expiração personalizada

### ✅ Sistema de displays via Vercel
- Commit de pasta → Vercel redeploy automático em ~30s
- SSL automático, CDN global, gratuito
- Estrutura de pastas = estrutura de URLs

### ✅ Página de erro 404 bem-humorada
- Efeito glitch no número 404
- Terminal animado mostrando o caminho tentado
- Rodapé: "Não está encontrando seu token? Manda uma mensagem pra gente."

### ✅ Página de acesso restrito no displays
- Bloqueia acesso direto à raiz
- Redireciona para o portal

---

## 9. PENDÊNCIAS E BACKLOG

### 🔴 Fazer agora
- [ ] Deletar pasta `entregas/` do repositório `rush-site`
- [ ] Atualizar campanhas reais da Africa no `ver.html` (cannes2026 e natal2025 são fictícias)
- [ ] Atualizar campanhas reais da BETC no `ver.html`
- [ ] Testar portal Sadia com peças reais

### 🟡 Próxima fase
- [ ] Adicionar peças reais da Sadia no portal (300x250 e 300x600 já estão no displays)
- [ ] API que lê automaticamente pastas do `voidda-displays` (elimina atualização manual do ver.html)
- [ ] Integração Rush sistema → atualiza ver.html automaticamente quando Motion entrega

### 🔵 Futuro / Backlog
- [ ] Tokens por campanha (não só por cliente)
- [ ] App mobile PWA para visualização
- [ ] Módulo de geração de peças HTML (usa specs da decupagem)
- [ ] Geração automática de OG image para compartilhamento
- [ ] Política de privacidade em voidda.com.br

---

## 10. DICAS OPERACIONAIS

### Vercel — plano Hobby (gratuito)
- Suporta projetos ilimitados
- Deploy automático em push
- SSL automático via Let's Encrypt
- CDN global sem custo

### GitHub Desktop — fluxo Motion
1. Fetch origin (sempre antes de trabalhar)
2. Cria/edita arquivos na pasta local
3. Commit com mensagem padrão: `entrega: [cliente]/[campanha]`
4. Push origin
5. Aguarda ~30s → peça no ar

### Adicionando novo cliente
1. Cria pasta no `voidda-displays`: `[cliente]/`
2. Adiciona entrada no `ver.html` do `rush-site`
3. Gera token no padrão `[iniciais][ano][letras]`
4. Commit em ambos os repos
5. Envia link para o cliente

### Quando o DNS demora
- Subdomínios novos: 5-30 minutos
- Registros A: até 2 horas
- Para testar antes de propagar: usar URL temporária da Vercel (`projeto-xxx.vercel.app`)

### Estrutura de pastas no voidda-displays
```
[agencia]/           ← ex: africa, betc, caipe
  [cliente]/         ← ex: sadia, itau, ambev (quando for direto, sem agência, usa só [cliente]/)
    [campanha]/      ← ex: futebol-032026, natal2026
      [dimensao]/    ← ex: 300x250, 970x250, stories
        index.html
        assets...
      [dimensao].zip ← pacote para download (opcional)
```

---

## 11. PRÓXIMOS PASSOS SUGERIDOS

1. **Limpar repositórios** — deletar pasta `entregas` do `rush-site`
2. **Cadastrar peças reais** — Africa e BETC com campanhas reais no `ver.html`
3. **Testar fluxo completo** — Motion commita → peça aparece no portal do cliente
4. **Criar email** — `atendimento@voidda.com.br` no HostGator (cPanel → Email → Create Account)
5. **OG image** — criar `og.png` 1200x630 para preview ao compartilhar voidda.com.br
6. **Política de privacidade** — página simples em voidda.com.br/privacidade

---

## 12. RESUMO TÉCNICO PARA PRÓXIMO CHAT

**Projeto:** Rush by Voidda — SaaS de gestão de produção criativa
**Fundador:** Alessandro Bornato (alias: borna no Windows)
**Stack sistema:** Next.js 15, React 19, Prisma 5, PostgreSQL 18, Railway
**tenantId:** `cmn83z24l0000rt2ys3l6d5ih`

**O que fizemos nesta sessão:**
- Site institucional em voidda.com.br (Vercel, HTML estático)
- Portal de clientes em voidda.com.br/ver/[token] (ver.html no rush-site)
- Sistema de displays em displays.voidda.com.br (Vercel, voidda-displays repo)
- Toda a configuração de DNS no HostGator
- Tentativa frustrada de GitHub Action via FTP/SFTP (HostGator bloqueia)
- Solução final: Vercel serve direto do GitHub, sem Action necessária

**Repos GitHub:**
- `ABORNATO/rush-site` → voidda.com.br
- `ABORNATO/voidda-displays` → displays.voidda.com.br
- `ABORNATO/rush` → rush.voidda.com.br (Railway)
