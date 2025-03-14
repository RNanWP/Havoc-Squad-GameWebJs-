import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload,
    create,
    update,
  },
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("background", "assets/background.png");
  this.load.spritesheet("player", "assets/player.png", {
    frameWidth: 32,
    frameHeight: 32,
  });
}

function create() {
  this.add.image(400, 300, "background");

  // Criando o jogador
  this.player = this.physics.add.sprite(400, 300, "player");

  // Adicionando controles de teclado
  this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  // Movimentação do jogador
  if (this.cursors.left.isDown) {
    this.player.setVelocityX(-160);
  } else if (this.cursors.right.isDown) {
    this.player.setVelocityX(160);
  } else {
    this.player.setVelocityX(0);
  }

  if (this.cursors.up.isDown) {
    this.player.setVelocityY(-160);
  } else if (this.cursors.down.isDown) {
    this.player.setVelocityY(160);
  } else {
    this.player.setVelocityY(0);
  }
}
