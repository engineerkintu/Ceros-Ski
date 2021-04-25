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
    

})