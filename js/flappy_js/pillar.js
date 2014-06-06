/**
 * Created by suyuhong on 14-4-2.
 */
FlappyBird.pillar = (function () {
    var bird = new FlappyBird.bird();
    var playGame = null;
    var vPillar = 4.5;
    var gap = 140;
    var Pillar = function(){
        this.pass = false;
        this.pillarWidth = 74;
        this.pillar = new createjs.Container();
    };

    //管道初始化
    Pillar.prototype.init = function(stage, x, randomY){
        playGame = new FlappyBird.playGame()
        var stage = stage;
        var pillar1 = new createjs.Bitmap("images/flappy_images/pipe.png");
        var pillar2 = new createjs.Bitmap("images/flappy_images/pipe.png");
        pillar1.x = x + 30;

        //通过随机数实现管道的随机缝隙
        pillar1.y = (playGame.floorY - gap * 2) * randomY + gap * 1.5;
        this.pillar.addChild(pillar1);

        pillar2.scaleX = -1;
        pillar2.rotation = 180;
        pillar2.x = pillar1.x;
        pillar2.y = pillar1.y - gap;
        this.pillar.addChild(pillar2);
        stage.addChild(this.pillar);
    };

    //管道更新
    Pillar.prototype.update = function () {
        var pillar = this.pillar;
        var pillar1 = pillar.getChildAt(0);
        var pillar2 = pillar.getChildAt(1);

        var birdEle = bird.birdSprite;
        var birdCriticalPointX = birdEle.x + bird.birdWidth / 2; //小鸟的临界点
        var birdCriticalPointY = birdEle.y + bird.birdHeight / 2;

        if (pillar == null) {
            return;
        }

        //管道按vPillar的速度向左移动
        var X = pillar1.x - vPillar;
        pillar1.x = X;
        pillar2.x = X;

        //管道移出画布，返回管道用于从数组中删除该管道
        if (X + this.pillarWidth < 0) {
            return pillar;
        }

        //小鸟已经通过该管道，返回，不用做下面的碰撞检测
        if (this.pass == true) {
            return;
        }

        //管道的临界点
        var pillarCriticalPointX = X + this.pillarWidth / 2;
        var pillarCriticalPointY = pillar1.y - gap / 2;

        //小鸟碰到管壁的临界条件
        var gapX = Math.abs(pillarCriticalPointX - birdCriticalPointX) - (this.pillarWidth + bird.birdWidth) / 2;
        var gapY = Math.abs(pillarCriticalPointY - birdCriticalPointY);

        //碰撞检测
        if (gapX <= 0 &&  gapY>= 55) { //小鸟碰到管道
            bird.die();
        } else if (birdCriticalPointX - pillarCriticalPointX - this.pillarWidth/ 2 >= 0) { //小鸟通过管道
            this.pass = true;

            //执行加分操作
            playGame.updateScore();
        }
    };
    return Pillar;
}());

