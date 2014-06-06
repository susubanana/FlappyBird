/**
 * Created by suyuhong on 14-3-31.
 */
FlappyBird.bird = (function(){
    var gravity = 30; //重力加速度
    var playGame = null;
    var Bird = {
        vBird: -60, //小鸟初始速度
        birdHeight: 42,
        birdWidth: 42,
        state: "fly",
        init : function (s, x, y) {
            var stage = s;

            //制作一个拥有飞行动作的鸟
            var spriteSheet = new createjs.SpriteSheet({
                images: ["images/bird.png"],
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
        },

        //小鸟状态更新
        update : function(state){
            playGame = FlappyBird.playGame;
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
                    document.querySelector('.restart').style.display = "block";
                    document.querySelector('.mask').style.display = "block";

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
        },

        jump : function(){
            this.state = "jump";
            this.update(this.state);
        },

        die : function(){
            this.state = "die";
            this.update(this.state);
        }

    };
    return Bird;
}());


