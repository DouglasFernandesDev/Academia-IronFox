# Fotos e vídeo de exemplo — substituir antes de publicar

Nenhuma foto ou vídeo real de equipamentos, ambientes ou pessoas foi enviado
até agora. O conteúdo desta pasta é banco de imagens livre (Pexels, uso
comercial gratuito, sem necessidade de atribuição) usado só para as seções
"Estrutura" e o vídeo do hero não ficarem vazios. **Nada disto é da Iron Fox.**

Troque cada arquivo por material real da unidade de Iguaba Grande assim que
houver — mesmo nome de arquivo, mesmo formato, e a foto/vídeo já aparece no
site sem precisar tocar em HTML/CSS/JS.

| Arquivo | Conteúdo atual (banco de imagens) | Fonte |
|---|---|---|
| `estrutura-cardio.webp` | Sala de cardio com esteiras e aparelhos | [Pexels #4716814](https://www.pexels.com/photo/4716814/) |
| `estrutura-musculacao.webp` | Rack de musculação com banco e anilhas | [Pexels #4488752](https://www.pexels.com/photo/4488752/) |
| `estrutura-funcional.webp` | Área de treino funcional com argolas e cordas | [Pexels #6796964](https://www.pexels.com/photo/6796964/) |
| `estrutura-kettlebells.webp` | Kettlebells coloridos em rack | [Pexels #14502821](https://www.pexels.com/photo/14502821/) |
| `estrutura-remo.webp` | Máquinas de remo e puxada | [Pexels #9545914](https://www.pexels.com/photo/9545914/) |
| `estrutura-suspensao.webp` | Fitas de suspensão (TRX) | [Pexels #4162447](https://www.pexels.com/photo/4162447/) |
| `estrutura-spinning.webp` | Bicicletas ergométricas | [Pexels #6388364](https://www.pexels.com/photo/6388364/) |
| `estrutura-barra.webp` | Barra olímpica e kettlebell | [Pexels #6628962](https://www.pexels.com/photo/6628962/) |
| `hero-treino.mp4` | Vídeo de fundo do hero — close-up de halteres, sem pessoas | [Pexels #6053511](https://www.pexels.com/video/6053511/) |

## Sobre o vídeo do hero

`hero-treino.mp4` só toca depois que o navegador confirma que o autoplay foi
aceito (ver `js/modulos/hero-video.js`) — se estiver bloqueado, a conexão for
lenta, `prefers-reduced-motion` estiver ativo, ou o navegador não suportar
vídeo, a página nunca mostra um retângulo preto: a foto real da fachada
(`imagens/fachada.jpg`) já está por baixo e continua sendo o que aparece.
Ao trocar por um vídeo real da academia, prefira algo curto (10–20s em loop),
sem áudio necessário (o vídeo é `muted`) e já otimizado (H.264, poucos MB) —
esse é o tipo de arquivo que mais pesa no carregamento da página inteira.

## Por que a equipe e os depoimentos não têm foto

O site propositalmente **não** usa fotos de banco de imagens para simular
professores ou alunos reais — isso apresentaria pessoas estranhas como se
fossem da Iron Fox, o que é enganoso mesmo num site de apresentação. Por isso:

- **Equipe**: os cards usam um avatar com iniciais da especialidade em vez de
  foto, e o nome/CREF ficam como "a confirmar" até a academia enviar os dados
  reais de cada professor.
- **Depoimentos**: usam avatar de iniciais e identificação genérica ("Aluna
  há 8 meses"), sem nome ou foto inventados. A nota "5 estrelas" em cada
  card também é ilustrativa — vira avaliação real junto com o depoimento.
- **Antes/depois**: a seção fica com um espaço reservado (placeholder) em vez
  de fotos — exige autorização de uso de imagem do aluno, que só pode vir da
  academia.

## Foto real já usada

`imagens/fachada.jpg` **é uma foto real** da fachada da Iron Fox — recortada
de `imagens/endereço.png` (o story oficial do Instagram). Não é banco de
imagens.
