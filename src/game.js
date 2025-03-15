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
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("background", "assets/background.png");
  this.load.spritesheet("player", "assets/player.png", {
    frameWidth: 48,
    frameHeight: 48,
  });
}

function create() {
  this.add.image(400, 300, "background");

  // Criando o jogador
  this.player = this.physics.add.sprite(400, 300, "player").setOrigin(0.5, 0.5);
  this.player.setCollideWorldBounds(true);
  this.player.body.setSize(30, 30).setOffset(9, 9);

  // Controles
  this.cursors = this.input.keyboard.createCursorKeys();
  this.attackKey = this.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.SPACE
  );

  // Animações corrigidas
  this.anims.create({
    key: "idle-down",
    frames: this.anims.generateFrameNumbers("player", { start: 0, end: 2 }),
    frameRate: 5,
    repeat: -1,
  });

  this.anims.create({
    key: "idle-up",
    frames: [{ key: "player", frame: 18 }],
    frameRate: 1,
  });

  this.anims.create({
    key: "idle-right",
    frames: [{ key: "player", frame: 9 }],
    frameRate: 1,
  });

  this.anims.create({
    key: "walk-down",
    frames: this.anims.generateFrameNumbers("player", { start: 3, end: 5 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "walk-up",
    frames: this.anims.generateFrameNumbers("player", { start: 12, end: 14 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "walk-right",
    frames: this.anims.generateFrameNumbers("player", { start: 9, end: 11 }),
    frameRate: 10,
    repeat: -1,
  });

  // Ataques
  this.anims.create({
    key: "attack-down",
    frames: this.anims.generateFrameNumbers("player", { start: 6, end: 8 }),
    frameRate: 10,
    repeat: 0,
  });

  this.anims.create({
    key: "attack-right",
    frames: this.anims.generateFrameNumbers("player", { start: 9, end: 11 }),
    frameRate: 10,
    repeat: 0,
  });

  this.anims.create({
    key: "attack-up",
    frames: this.anims.generateFrameNumbers("player", { start: 12, end: 14 }),
    frameRate: 10,
    repeat: 0,
  });

  this.anims.create({
    key: "death",
    frames: this.anims.generateFrameNumbers("player", { start: 18, end: 20 }),
    frameRate: 5,
    repeat: 0,
  });

  // Começa em idle para baixo
  this.player.anims.play("idle-down");

  this.isAttacking = false;
  this.lastDirection = "";
}

function update() {
  if (this.isAttacking) return;

  this.player.setVelocity(0);
  let moving = false;
  let animationKey = "";

  if (this.cursors.left.isDown) {
    this.player.setVelocityX(-160);
    this.player.setFlipX(true); // Inverter sprite
    animationKey = "walk-right"; // Reutiliza animação da direita
    moving = true;
    this.lastDirection = "left";
  } else if (this.cursors.right.isDown) {
    this.player.setVelocityX(160);
    this.player.setFlipX(false);
    animationKey = "walk-right";
    moving = true;
    this.lastDirection = "right";
  } else if (this.cursors.up.isDown) {
    this.player.setVelocityY(-160);
    animationKey = "walk-up";
    moving = true;
    this.lastDirection = "up";
  } else if (this.cursors.down.isDown) {
    this.player.setVelocityY(160);
    animationKey = "walk-down";
    moving = true;
    this.lastDirection = "down";
  }

  if (moving) {
    this.player.anims.play(animationKey, true);
  } else {
    if (this.lastDirection === "down")
      this.player.anims.play("idle-down", true);
    else if (this.lastDirection === "up")
      this.player.anims.play("idle-up", true);
    else if (this.lastDirection === "right")
      this.player.anims.play("idle-right", true);
    else if (this.lastDirection === "left") {
      this.player.setFlipX(true);
      this.player.anims.play("idle-right", true);
    }
  }

  // Ataque
  if (Phaser.Input.Keyboard.JustDown(this.attackKey)) {
    console.log("Ataque detectado!");
    this.isAttacking = true;

    let attackAnimation = `attack-${this.lastDirection}`;
    if (this.lastDirection === "left") {
      this.player.setFlipX(true); // Garante que ataque para a esquerda está invertido
      attackAnimation = "attack-right";
    }

    this.player.anims.play(attackAnimation);

    this.player.once("animationcomplete", () => {
      this.isAttacking = false;
      this.player.anims.play(`idle-${this.lastDirection}`, true);
    });
  }
}
