import "babel-polyfill";
import * as Constants from "../Constants";
import {Skier} from "./Skier";
import {Rect} from "../Core/Utils";
//Testing the setDirection 
describe('setDirection', () => {
    //running test for direction on the right
    it('can no turn beyond the right direction', () => {
        const ski = new Skier(0,0);
        const overRight = Constants.SKIER_DIRECTIONS.RIGHT + 1;
        ski.setDirection(overRight);
        expect(ski.direction).toBe(Constants.SKIER_DIRECTIONS.RIGHT);
    });

    //running test for direction on the left
    it('can not turn beyond the left direction', () => {
        const ski = new Skier(0,0);
        const overLeft = Constants.SKIER_DIRECTIONS.LEFT - 1;
        ski.setDirection(overLeft);
        expect(ski.direction).toBe(Constants.SKIER_DIRECTIONS.LEFT);
    })
})

//Running tests for checKIfSkierHitObstacle
describe('checkIfSkierHitObstacle', () => {
    let obstacleManager, assetManager;
    //run test to check for asset uploaded and obstacle uploaded
    beforeEach(() => {
        assetManager = {
            getAssest: jest.fn().mockReturnValue({width:10, height:10})
        };
        obstacleManager = {
            getObstacles: jest.fn().mockReturnValue([])
        };
    });

    //running test to get a colliding object
    function getColObject(colObjAssetName){
        return {
            getPosition: jest.fn().mockReturnValue({x:0,y:0}),
            width: 10,
            height: 10,
            getAssetName: jest.fn().mockReturnValue(colObjAssetName),
            getBounds: jest.fn().mockReturnValue(new Rect(-5,-5,5,5))
        }
    }

    //testing for skier after crashing on a rock
    it('crash after collision with a rock', () => {
        const ski = new Skier(0,0);
        obstacleManager.getObstacles.mockReturnValue([getColObject('rock1')]);
        ski.checkIfSkierHitObstacle(obstacleManager,assetManager);
        expect(ski.state).toBe(Constants.SKIE_STATE.CRASH);
    });

    //testing for skier after crashing into the tree
    it('crash after collision into the tree', () => {
        const ski = new Skier(0,0);
        obstacleManager.getObstacles.mockReturnValue([getColObject('tree')]);
        ski.checkIfSkierHitObstacle(obstacleManager,assetManager);
        expect(ski.state).toBe(Constants.SKIER_CRASH.CRASH);
    });

    //testing for skier crashing into tree while jumping
    it('test skier crash on a collision with a tree while jumping', () => {
        const skier = new Skier(0,0);
        skier.setState(Constants.SKIE_STATE.JUMP);
        obstacleManager.getObstacles.mockReturnValue([getColObject('tree')]);
        skier.checkIfSkierHitObstacle(obstacleManager, assetManager);
        expect(skier.state).toBe(Constants.SKIE_STATE.CRASH);
    }); 
    
    //testing for skier jump on  a crash with jump ramp while jumping
    it('skier starts a jump on a collision with a jump ramp', () => {
        const skier = new Skier(0,0);
        obstacleManager.getObstacles.mockReturnValue([getColObject('jumpRamp')]);
        skier.checkIfSkierHitObstacle(obstacleManager, assetManager);
        expect(skier.state).toBe(Constants.SKIE_STATE.JUMP);
    });

    it('skier does not start jump on a collision with a jump ramp while jumping', () => {
        const skier = new Skier(0,0);
        skier.setState(Constants.SKIE_STATE.JUMP);
        jest.spyOn(skier, 'setMode');
        obstacleManager.getObstacles.mockReturnValue([getColObject('jumpRamp')]);
        skier.checkIfSkierHitObstacle(obstacleManager, assetManager);
        expect(skier.setState).not.toBe(Constants.SKIE_STATE.JUMP);
    });

    //skier does not crash into rock while jumping
    it('skier does not crash on a collision with a rock while jumping', () => {
        const skier = new Skier(0,0);
        skier.setState(Constants.SKIE_STATE.JUMP);
        obstacleManager.getObstacles.mockReturnValue([getColObject('rock1')]);
        skier.checkIfSkierHitObstacle(obstacleManager, assetManager);
        expect(skier.state).not.toBe(Constants.SKIE_STATE.CRASH);
    });

});