var config = {
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
    arcade: { debug: false },
  },
};

var game = new Phaser.Game(config);

function preload() {
  this.load.image("background", "assets/background.png");
  this.load.image("ground", "assets/Ground.png");
  this.load.image("spikeSM", "assets/Spike.png");
  this.load.image("spikeLG", "assets/LongSpike.png");
  this.load.image("platform", "assets/platformSM.png");
  this.load.image("upside", "assets/upsideDownSpike.png");
  this.load.image("tryAgain", "assets/tryAgain.png");
  this.load.image("star", "assets/star.png");
  this.load.audio("song", "assets/song.mp3");
  this.load.audio("fail", "assets/Lose.mp3");
  this.load.audio("win", "assets/win.mp3");

  this.load.spritesheet("bob", "assets/Bob.png", {
    frameWidth: 50,
    frameHeight: 50,
  });
} //variables
var collide = false;
var spikeSM;
var player;
var win = false;
var star;
//========================================================================================================
function create() {
  this.add.image(400, 300, "background");

  keys = this.input.keyboard.addKeys("W,A,D");
  //Ground===================================================================
  var grounds = this.physics.add.staticGroup();
  //Spikes====================================================================
  var spikeSM = this.physics.add.staticGroup();
  spikeSM.create(250, 444, "spikeSM").setScale(1).refreshBody();
  spikeSM.create(200, 444, "spikeSM").setScale(1).refreshBody();

  spikeSM.create(400, 444, "spikeSM").setScale(1).refreshBody();
  spikeSM.create(500, 444, "spikeLG").setScale(1).refreshBody();
  spikeSM.create(500, 444, "spikeLG").setScale(1).refreshBody();
  spikeSM.create(650, 444, "spikeLG").setScale(1).refreshBody();
  spikeSM.create(600, 163, "upside").setScale(1).refreshBody();
  spikeSM.create(515, 163, "upside").setScale(1).refreshBody();
  //platform======================================================================
  var platform = this.physics.add.staticGroup();

  platform.create(600, 300, "platform").setScale(1).refreshBody();
  platform.create(515, 300, "platform").setScale(1).refreshBody();

  platform.create(600, 150, "platform").setScale(1).refreshBody();
  platform.create(515, 150, "platform").setScale(1).refreshBody();
  star = this.physics.add.staticGroup();
  star.create(580, 110, "star");

  platform.create(200, 220, "platform").setScale(1).refreshBody();
  //ground=================================================================
  grounds.create(400, 568, "ground").setScale(2).refreshBody();
  //Player================================================================
  player = this.physics.add.sprite(100, 400, "bob");
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  player.body.setGravityY(1300);
  //Collision mesh================================================================
  this.physics.add.collider(player, grounds);
  this.physics.add.collider(player, platform);
  this.physics.add.collider(player, spikeSM, gameOver);
  this.physics.add.overlap(player, star, winner, null, this);

  //Music===============================================
  this.music = this.sound.add("song");
  this.fail = this.sound.add("fail");
  this.win = this.sound.add("win");
  var musicConfig = {
    mute: false,
    volume: 1,
    rate: 1,
    loop: true,
  };
  this.music.play(musicConfig);

}
function winner(player, star) {
  win = true;
  console.log("Winner")
}

function gameOver(player, spikeSM) {
  collide = true;
  
}

//Keys
var keys;
//=============================================================================
function update() {
  if (keys.A.isDown) {
    player.setVelocityX(-500);
    console.log("Left");
  } else if (keys.D.isDown) {
    player.setVelocityX(500);
    console.log("Right");
  } else {
    player.setVelocityX(0);
  }

  if (keys.W.isDown && player.body.touching.down && !player.body.touching.star) {
    player.setVelocityY(-700);
    console.log("Jump");
  }
  if (win) {
    this.Winner = this.add.text(275, 250, "YOU WIN!", {
      fontSize: "50px",
      fill: "#000",
    });
    //fail sound
    this.win.play();
    //music
    this.music.stop();
  }
  if (collide) {
    console.log("function");
    this.physics.pause();
    player.setTint(0xff0000);
    
    //fail sound
    this.fail.play();
    //music
    this.music.stop();
    

    const tryAgain = this.add.image(380, 320, "tryAgain");
    tryAgain.setInteractive();
    tryAgain.on("pointerover", () => {
      console.log("pointerover");
    });
    this.gameOverText = this.add.text(275, 250, "GAME OVER", {
      fontSize: "50px",
      fill: "#000",
    });
  }
}
