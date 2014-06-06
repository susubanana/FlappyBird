/**
 * Created by suyuhong on 14-3-31.
 */
FlappyBird.bird = (function(){
    var gravity = 30; //重力加速度
    var playGame = null;
    var instance = null;
    var Bird = function(){
        if(instance){
            return instance;
        }
        this.vBird = -60;
        this.birdHeight = 42;
        this.birdWidth = 42;
        this.state = "fly";
        instance = this;
    }

    //初始化小鸟
    Bird.prototype.init = function(s, x, y){
        var stage = s;

        //制作一个拥有飞行动作的鸟
        var spriteSheet = new createjs.SpriteSheet({
            images: ["images/flappy_images/bird.png"],
            frames: {width:42, height:42},
            animations: {
                //通过背景图片0-2个小鸟实现小鸟的飞行动作
                fly: {
                    frames:[1, 0, 2]
                },
                die: {
                    frames: [3]
                }
            }
        });
        this.birdSprite = new createjs.Sprite(spriteSheet, "fly");

        //鸟在画布中的位置
        this.birdSprite.x =  x;
        this.birdSprite.y = y;

        //将小鸟渲染到画布上
        stage.addChild(this.birdSprite);
    };

    //小鸟状态更新
    Bird.prototype.update = function(state){
        playGame = new FlappyBird.playGame();
        var bird = this.birdSprite;
        var time = createjs.Ticker.getInterval()/800;
        var vBird = this.vBird;
        switch(state){
            case "jump":
                clearInterval(playGame.timer);
                playGame.createTimer(function () {
                    //竖直上抛运动
                    vBird += gravity * time;
                    bird.y += vBird * time;
                    if(bird.y >= (playGame.floorY - this.birdHeight)){
                        bird.y = (playGame.floorY - this.birdHeight);
                        bird.state = "die";
                        this.die();
                    }
                });
                break;
            case "die":

                //执行死的动画
                bird.gotoAndPlay("die");

                //游戏结束
                playGame.end();
                if(bird.state == "die"){
                    return;
                }
                bird.state = "die";
                vBird = 0;
                time = createjs.Ticker.getInterval()/250;
                clearInterval(playGame.timer);
                playGame.createTimer(function () {
                    vBird += gravity * time;
                    bird.y += vBird * time;
                    if(bird.y >= (playGame.floorY - this.birdHeight)){
                        bird.y = (playGame.floorY - this.birdHeight);
                        vBird = 0;
                        clearInterval(playGame.timer);
                    }
                });
                break;
        }
    };
    Bird.prototype.jump = function(){
        this.state = "jump";
        this.update(this.state);
    };

    Bird.prototype.die = function(){
        this.state = "die";
        this.update(this.state);
    };
    return Bird;
}());


