/**
 * Created by suyuhong on 14-4-2.
 */

FlappyBird.story = (function(){
    var Story = function(){};

    Story.prototype.buildPillar = function(stage){
        var pillars = [];
        var pillarDistance = 200;
        for(var i=0; i < 50; i++){

            //继承管道对象
            var pillar = new FlappyBird.pillar();

            //初始化管道
            pillar.init(stage, stage.canvas.width + pillarDistance * i, Math.random());
            pillars.push(pillar);
        }
        return pillars;
    };
    return Story;
}());