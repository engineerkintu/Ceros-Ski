import "babel-polyfill";
import * as Constants from "../Constants";
import {Skier} from "./Skier";


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