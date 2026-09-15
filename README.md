# Iron Fox Sport Center — Site de apresentação

Protótipo navegável do site institucional da Iron Fox Sport Center (Iguaba
Grande/RJ), com dados reais extraídos dos cartazes oficiais do Instagram da
academia. HTML, CSS e JavaScript puros — sem build, sem dependências.

## Rodar localmente

```bash
npx live-server
```

Não abra `index.html` direto pelo navegador (`file://`) — os módulos JS usam
`import`/`export` e quebram por CORS sem um servidor local.

## O que já está pronto

- Hero com foto real da fachada e botão de WhatsApp fixo
- Planos e preços reais (duas categorias, alternadas por toggle), cada botão
  já abre o WhatsApp com a mensagem pronta
- Grade de aulas coletivas (modalidades reais; horários de exemplo)
- Galeria de estrutura, equipe e depoimentos (fotos de banco de imagens até
  haver material real — ver `imagens/placeholder/README.md`)
- Formulário de aula experimental grátis, validado, que abre o WhatsApp
- Mapa, endereço e horário de funcionamento reais

## O que falta confirmar

Ver a seção "Roadmap" e "Dados do Negócio" em [`CLAUDE.md`](CLAUDE.md) para a
lista completa de placeholders (`// CONFIRMAR`) e os próximos passos até o
site final.
