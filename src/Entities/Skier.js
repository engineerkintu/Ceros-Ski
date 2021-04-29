import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";

export class Skier extends Entity {
    assetName = Constants.SKIER_DOWN;

    direction = Constants.SKIER_DIRECTIONS.DOWN;
    speed = Constants.SKIER_STARTING_SPEED;
    state = Constants.SKIE_STATE.SKIING;
    
    animationDuration = 0;
    constructor(x, y) {
        super(x, y);
    }
    setState(state){
       
        this.state = state;
        this.animationDuration = 0;
        this.updateAsset();

    }

    getJumpStep(){
        return Math.floor(this.animationDuration / Constants.SKIER_JUMP_TIME);
    }

    setDirection(direction) {
        //Skier takes right direction
        if (direction > Constants.SKIER_DIRECTIONS.RIGHT){
            direction = Constants.SKIER_DIRECTIONS.RIGHT;
        }

        //Skier moves takes left direction
        if (direction < Constants.SKIER_DIRECTIONS.LEFT){
            direction = Constants.SKIER_DIRECTIONS.LEFT;
        }
        

        this.direction = direction;
        //Allow Skier to recover from a crash
        if (this.state === Constants.SKIE_STATE.CRASH){
            this.setState(Constants.SKIE_STATE.SKIING);
        }
        this.updateAsset();
    }

    updateAsset() {
        this.animationDuration++;
        switch(this.state){
            case Constants.SKIE_STATE.SKIING:
                this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];
                break;
            case Constants.SKIE_STATE.CRASH:
                this.assetName = Constants.SKIER_CRASH;
                break;
            case Constants.SKIE_STATE.JUMP:
                this.assetName = Constants.SKIER_JUMP_ASSETS[this.getJumpStep()];
                if(this.getJumpStep() >= Constants.SKIER_JUMP_ASSETS.length){
                    this.setState(Constants.SKIE_STATE.SKIING);
                }
                break;

        }
        
    }

    move() {
        //Don't move from skiing after encountering a crash
        if (this.state === Constants.SKIE_STATE.CRASH){
            return;
        }
        switch(this.direction) {
            case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
                this.moveSkierLeftDown();
                break;
            case Constants.SKIER_DIRECTIONS.DOWN:
                this.moveSkierDown();
                break;
            case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
                this.moveSkierRightDown();
                break;
        }
    }

    moveSkierLeft() {
        this.x -= Constants.SKIER_STARTING_SPEED;
    }

    moveSkierLeftDown() {
        this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierDown() {
        this.y += this.speed;
    }

    moveSkierRightDown() {
        this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierRight() {
        this.x += Constants.SKIER_STARTING_SPEED;
    }

    moveSkierUp() {
        this.y -= Constants.SKIER_STARTING_SPEED;
    }

    turnLeft() {
        if(this.direction === Constants.SKIER_DIRECTIONS.LEFT) {
            this.moveSkierLeft();
        }
        else {
            this.setDirection(this.direction - 1);
        }
    }

    turnRight() {
        if(this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierRight();
        }
        else {
            this.setDirection(this.direction + 1);
        }
    }

    turnUp() {
        if(this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierUp();
        }
    }

    turnDown() {
        this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
    }

    checkIfSkierHitObstacle(obstacleManager, assetManager) {
        const asset = assetManager.getAsset(this.assetName);
        const skierBounds = new Rect(
            this.x - asset.width / 2,
            this.y - asset.height / 2,
            this.x + asset.width / 2,
            this.y - asset.height / 4
        );

        const collision = obstacleManager.getObstacles().find((obstacle) => {
            const obstacleAsset = assetManager.getAsset(obstacle.getAssetName());
            const obstaclePosition = obstacle.getPosition();
            const obstacleBounds = new Rect(
                obstaclePosition.x - obstacleAsset.width / 2,
                obstaclePosition.y - obstacleAsset.height / 2,
                obstaclePosition.x + obstacleAsset.width / 2,
                obstaclePosition.y
            );

            return intersectTwoRects(skierBounds, obstacleBounds);
        });

        if(collision) {
            switch(collision.getAssetName()){
                case Constants.ROCK1:
                case Constants.ROCK2:
                    //Skier can freely jump rocks
                    if (this.state !== Constants.SKIE_STATE.JUMP){
                        this.setState(Constants.SKIE_STATE.CRASH);
                    }
                    break;

                case Constants.TREE:
                case Constants.TREE_CLUSTER:
                    //Skier can not over trees
                    this.setState(Constants.SKIE_STATE.CRASH);
                    break;

                case Constants.JUMP_RAMP:
                    if (this.state !== Constants.SKIE_STATE.JUMP){
                        this.setState(Constants.SKIE_STATE.JUMP);
                    }

            }        
           
        }
        else if (this.state !== Constants.SKIE_STATE.JUMP){
            this.setState(Constants.SKIE_STATE.SKIING);
        }
        this.updateAsset();
    }
    
    
}