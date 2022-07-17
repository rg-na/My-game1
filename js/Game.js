class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
    //console.log(gameState)
  }

  start() {
    form = new Form();
    form.display();
    player = new Player();
    playerCount = player.getCount();
    
    ground = createSprite(width/2, height/2)
    ground.addImage(trackImg)
    ground.scale = 1.3;
    
   
    monster = createSprite(400, 300)
    monster.addAnimation("monster", monsterImg)
    monster.scale=0.4

    human = createSprite(400, 500)
    human.addAnimation("human", humanImg)
    
    ball = createSprite(900,400)
    ball.addImage("ball", ballImg)
    ball.scale= 0.135

  }
  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {},
      //  carsAtEnd: 0
      });
      window.location.reload();
    });
  }
  handlePlayerControls() {
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10;
      player.update();
    }

    if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
      player.positionX -= 5;
      player.update();
    }

    if (keyIsDown(DOWN_ARROW) && player.positionX < width / 2 + 300) {
      player.positionY += 5;
      player.update();
    }
  }

  play() {
    drawSprites();
    this.handleElements();
    this.handleResetButton();

    Player.getPlayersInfo();
   // player.getCarsAtEnd();

    if (allPlayers !== undefined) {
       image(trackImg, 0, -height * 2, width, height * 1);

      // this.showFuelBar();
      // this.showLife();
      // this.showLeaderboard();

      //index of the array
      var index = 0;
      // for (var plr in allPlayers) {
      //   //add 1 to the index for every loop
      //   index = index + 1;

      //   //use data form the database to display the cars in x and y direction
      //   var x = allPlayers[plr].positionX;
      //   var y = height - allPlayers[plr].positionY;

      //   cars[index - 1].position.x = x;
      //   cars[index - 1].position.y = y;

      //   if (index === player.index) {
      //     stroke(10);
      //     fill("red");
      //     ellipse(x, y, 60, 60);

      //     this.handleFuel(index);
      //     this.handlePowerCoins(index);

      //     // Changing camera position in y direction
      //     camera.position.y = cars[index - 1].position.y;
      //   }
        // if(this.isPlayerMoving){
        //   player.positionY+=5
        //   player.update();
        // }
      }

      // handling keyboard events
      this.handlePlayerControls();

      // Finshing Line
      // const finshLine = height * 6 - 100;

      // if (player.positionY > finshLine) {
      //   gameState = 2;
      //   player.rank += 1;
      //   Player.updateCarsAtEnd(player.rank);
      //   player.update();
      //   this.showRank();
      // }

     
    }
  //}

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
    this.resetTitle.html("Reset Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 100);
  }
  update(state){
    console.log("bob")
    database.ref("/").update({
    gameState:state  
    })
  
    }
}
