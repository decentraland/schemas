import expect from "expect";
import { SpawnPoint } from "../../../src";
import { testTypeSignature } from "../../test-utils";

describe("Swap point tests", () => {
  const swapPoint: SpawnPoint = {
    name: "spawn1",
    default: true,
    position: {
      x: [1, 5],
      y: 1,
      z: [2, 4],
    },
    cameraTarget: {
      x: 10,
      y: 1,
      z: 4,
    },
  };

  testTypeSignature(SpawnPoint, swapPoint);

  it("static tests must pass", () => {
    expect(SpawnPoint.validate(swapPoint)).toEqual(true);
    expect(SpawnPoint.validate(null)).toEqual(false);
    expect(SpawnPoint.validate({})).toEqual(false);
  });

  it('position with empty array fails', () => {
    expect(SpawnPoint.validate({
      ...swapPoint,
      position: {
        ...swapPoint.position,
        x: []
      }
    })).toEqual(false)
  })

  it('position with string fails', () => {
    expect(SpawnPoint.validate({
      ...swapPoint,
      position: {
        ...swapPoint.position,
        x: 'text'
      }
    })).toEqual(false)
  })

});
