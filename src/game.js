// game.js
import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);
let player;

function preload() {
  // Carregar recursos, como o personagem e fundo
  this.load.image("background", "assets/background.png"); // Use uma imagem para o fundo
  this.load.image("player", "assets/player.png"); // Use uma imagem para o player
}

function create() {
  // Fundo
  this.add.image(400, 300, "background"); // Defina as coordenadas do centro do fundo

  // Player
  player = this.physics.add.sprite(400, 300, "player"); // Criação do jogador
  player.setCollideWorldBounds(true); // Impede que o jogador saia da tela

  // Movimentação
  this.cursors = this.input.keyboard.createCursorKeys(); // Para o PC

  // Rotação do personagem com o mouse
  this.input.on("pointermove", function (pointer) {
    // Calculando a direção do player com base no cursor
    const angle = Phaser.Math.Angle.Between(
      player.x,
      player.y,
      pointer.x,
      pointer.y
    );
    player.rotation = angle;
  });
}

function update() {
  // Movimentação do personagem (para PC com as teclas de seta ou WASD)
  if (this.cursors.left.isDown) {
    player.setVelocityX(-200);
  } else if (this.cursors.right.isDown) {
    player.setVelocityX(200);
  } else {
    player.setVelocityX(0);
  }

  if (this.cursors.up.isDown) {
    player.setVelocityY(-200);
  } else if (this.cursors.down.isDown) {
    player.setVelocityY(200);
  } else {
    player.setVelocityY(0);
  }
}
