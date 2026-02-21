# 🚀 GUIA DE DEPLOY — GITTU TOKEN (PRODUÇÃO)

## Ferramentas necessárias
- MetaMask instalada e configurada
- ETH/BNB/MATIC na carteira (para pagar gas)
- Acesso ao Remix IDE: https://remix.ethereum.org

---

## PARTE 1 — DEPLOY DO TOKEN CONTRACT

### Passo 1: Abrir o Remix IDE
1. Acesse https://remix.ethereum.org
2. No painel esquerdo, clique em "File Explorer"
3. Crie um novo arquivo: `contracts/TokenContract.sol`
4. Cole o conteúdo do arquivo `TokenContract.sol` deste pacote

### Passo 2: Compilar o contrato
1. Clique no ícone "Solidity Compiler" (2º ícone na sidebar)
2. Selecione a versão: **0.8.20**
3. Ative "Optimization" com **200 runs**
4. Clique em **"Compile TokenContract.sol"**
5. ✅ Deve aparecer um check verde

### Passo 3: Deploy do Token
1. Clique no ícone "Deploy & Run Transactions" (3º ícone)
2. Em "Environment", selecione: **"Injected Provider - MetaMask"**
3. Conecte sua MetaMask na rede desejada (ex: Ethereum Mainnet)
4. Em "Contract", selecione: **"GittuToken"**
5. Clique em **"Deploy"**
6. Confirme a transação na MetaMask
7. ⚠️ **ANOTE O ENDEREÇO** que aparecerá em "Deployed Contracts"

```
TOKEN CONTRACT ADDRESS: ___________________________________
```

---

## PARTE 2 — DEPLOY DO PRESALE CONTRACT

### Passo 1: Criar o arquivo
1. Crie um novo arquivo no Remix: `contracts/PresaleContract.sol`
2. Cole o conteúdo do arquivo `PresaleContract.sol`

### Passo 2: Compilar
- Mesmas configurações: versão **0.8.20**, Optimization ON (200 runs)
- Compile **PresaleContract.sol**

### Passo 3: Parâmetros de deploy
Antes de clicar em Deploy, preencha:

| Parâmetro   | Valor                                              |
|-------------|----------------------------------------------------|
| `_payment`  | Sua carteira (receberá os pagamentos em ETH/BNB)   |
| `_token`    | Endereço do TokenContract deployado (Passo 1)      |
| `_priceFeed`| Endereço do Chainlink (tabela abaixo)              |

### Chainlink Price Feeds por rede:

| Rede         | Chain ID | Price Feed                                        |
|--------------|----------|---------------------------------------------------|
| Ethereum     | 1        | 0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419       |
| BNB Chain    | 56       | 0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE       |
| Polygon      | 137      | 0xAB594600376Ec9fD91F8e885dADF0CE036862dE0       |
| Arbitrum     | 42161    | 0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612       |
| Avalanche    | 43114    | 0x0A77230d17318075983913bC2145DB16C7366156       |
| Base         | 8453     | 0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70       |

### Passo 4: Deploy
1. Em "Contract", selecione: **"GittuPresale"**
2. Expanda a área de parâmetros e preencha _payment, _token, _priceFeed
3. Clique em **"Deploy"**
4. ⚠️ **ANOTE O ENDEREÇO** do Presale Contract

```
PRESALE CONTRACT ADDRESS: ___________________________________
```

---

## PARTE 3 — CONFIGURAÇÃO PÓS-DEPLOY

### 3.1 — Transferir tokens para o Presale Contract
1. No Remix, em "Deployed Contracts", expanda o **TokenContract**
2. Procure a função `transfer`
3. Parâmetros:
   - `to`: endereço do PresaleContract
   - `amount`: quantidade com 18 decimais
   - Ex: 60 bilhões = `60000000000000000000000000000`
4. Execute e confirme na MetaMask

### 3.2 — Ativar a presale
1. Expanda o **PresaleContract** no Remix
2. Chame `flipPresaleActive()` → presale ativa!

### 3.3 — Verificar os stages
1. Chame `getCurrentStageIdActive()` → deve retornar 1, 2, 3 ou 4
2. Se retornar 0, ajuste os timestamps com `setStage()`

### 3.4 — Ajustar datas dos stages (se necessário)
Use conversor: https://www.unixtimestamp.com/

```
setStage(
  _id: 1,
  _bonus: 20,
  _price: 100000,
  _start: [unix timestamp início],
  _end:   [unix timestamp fim],
  _cap:   10000000000000000000000000000
)
```

---

## PARTE 4 — ATUALIZAR O FRONTEND

Após os deploys, atualize os arquivos de config:

### configEth.js (para Ethereum Mainnet):
```js
const tokenContractAddress = "SEU_TOKEN_ADDRESS_AQUI";
export const presaleContractAddress = "SEU_PRESALE_ADDRESS_AQUI";
const contractChainId = 1; // mainnet
export const networkLink = "https://etherscan.io/tx/";
```

### configBnb.js (para BNB Chain Mainnet):
```js
const tokenContractAddress = "SEU_TOKEN_ADDRESS_AQUI";
export const presaleContractAddress = "SEU_PRESALE_ADDRESS_AQUI";
const contractChainId = 56; // mainnet
export const networkLink = "https://bscscan.com/tx/";
```

### Repita para as demais redes (Polygon, Arbitrum, Avalanche, Base)

---

## PARTE 5 — VERIFICAR OS CONTRATOS (RECOMENDADO)

Verificar o código torna o contrato público e aumenta a confiança dos investidores.

### Etherscan / BscScan / Polygonscan:
1. Acesse o explorer da rede correspondente
2. Cole o endereço do contrato na busca
3. Clique em "Contract" → "Verify and Publish"
4. Selecione:
   - Compiler: Solidity 0.8.20
   - License: MIT
   - Optimization: Yes, 200 runs
5. Cole o código-fonte e submeta

---

## PARTE 6 — BUILD DE PRODUÇÃO DO FRONTEND

```bash
# Instalar dependências
npm install

# Gerar build de produção (pasta /dist)
npm run build

# Preview local do build
npm run preview
```

Faça o upload da pasta `/dist` para seu hosting:
- **Vercel**: `vercel deploy`
- **Netlify**: drag & drop da pasta /dist
- **GitHub Pages**: configure GitHub Actions
- **AWS S3**: `aws s3 sync dist/ s3://seu-bucket`

---

## CHECKLIST FINAL ✅

- [ ] TokenContract deployado em cada rede
- [ ] PresaleContract deployado em cada rede
- [ ] Tokens transferidos para o PresaleContract
- [ ] `flipPresaleActive()` chamado
- [ ] Stages com timestamps corretos
- [ ] Endereços atualizados nos arquivos de config
- [ ] Contratos verificados nos explorers
- [ ] Build de produção gerado
- [ ] Frontend publicado no hosting

---

## SUPORTE

- OpenZeppelin Docs: https://docs.openzeppelin.com
- Chainlink Price Feeds: https://data.chain.link
- Remix IDE Docs: https://remix-ide.readthedocs.io
- Wagmi Docs: https://wagmi.sh
- RainbowKit Docs: https://www.rainbowkit.com
