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
  // Carregar assets (imagens, sons, etc.)
  this.load.image("background", "assets/background.png");
}

function create() {
  // Adicionar elementos à tela
  this.add.image(400, 300, "background");
}

function update() {}
