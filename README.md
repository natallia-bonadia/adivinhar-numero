# Jogo da Adivinhação
Para jogá-lo acesse: <https://natallia-bonadia.github.io/adivinhar-numero/>

## 💻 Sobre o projeto
A lógica do projeto se baseia em receber um número através de uma requisição e implementar um jogo para acertar este número através de palpites.
Para construção do display de LED, foram utilizadas tags svg compostas por tags path, que representam cada um dos segmentos do número.
Ao receber o número escolhido pelo jogador, o programa fará a comparação com o número sorteado através da requisição.
Será retornado na tela se o número escolhido é maior, menor, igual ou inválido (abaixo de 1 e acima de 300) e, caso seja igual ou inválido, o jogo é finalizado e será possível, através de um botão, iniciá-lo novamente.

### 🛠 Linguagens
- HTML5
- CSS3
- JavaScript

### ⚙️ Funcionalidades
- [x] Sorteio de um número via requisição utilizando endpoint
- [x] Envio do número via formulário
- [x] Retorno dos números no formato de LED de 7 segmentos
- [x] Resultado do número escolhido
- [x] Reiniciar partida
