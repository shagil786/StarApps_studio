/*
Consider there are **N** airports in the world, each airport has a plane available with limited units of fuel available to fly. 

You are initially positioned at airport **number one** and you have to reach the last airport (**N**) by hiring a **minimum** number of planes. You'd need 1 unit of fuel to fly to the nearest airport from any airport. 

You will be given an array of N numbers each representing the units of fuel available in the plane at that particular airport. Print the number of planes you'd need to hire to reach the last airport. If it is not possible to reach the last airport, return -1

Example: 

Array = [2,1,2,3,1]

In the given array, there are 5 airports, the plane at the starting airport has 2 units of fuel so you can hire this plane and stop at the 2nd or 3rd airport. The plane at the 2nd airport has 1 unit of fuel so it can fly to the 3rd airport only. The minimum number of planes required in this case is two 2 → 2→ 1. 

Example 2:

Array = [1,6,3,4,5,0,0,0,6]

In the given array, there are 9 airports, the plane at the starting airport has 1 unit of fuel, so you can hire this plane and stop at the 2nd airport only. The plane at the 2nd airport has 6 units of fuel, so it can fly to the 3rd, 4th, 5th, 6th, 7th, or 8th airport. If we take the plane at the 5th airport, the minimum number of planes required in this case is three 1 → 6 → 5 → 6
 */

function minPlaneToReachDestination(fuelArray) {
  const toReach = fuelArray.length; // Get the number of airports
  const minPLanes = new Array(toReach).fill(Infinity); //// Create an array to store the minimum planes needed to reach each airport, initilized to infinity.
  minPLanes[toReach - 1] = 0; // At the last airport, no planes are needed as we are at the destination.

  // Iterate over the airports from right to left
  for (let right = toReach - 1; right >= 0; right--) {
    // Iterate over the airports that can be reached from the current airport
    for (
      let left = right + 1;
      left < toReach && left <= right + fuelArray[right];
      left++
    ) {
      // If it's possible to reach the left airport from the current one
      if (minPLanes[left] !== Infinity) {
        // Update the minimum planes needed to reach the current airport
        minPLanes[right] = Math.min(minPLanes[right], minPLanes[left] + 1);
      }
    }
  }

  // Return the minimum planes needed to reach the first airport
  return minPLanes[0] === Infinity ? -1 : minPLanes[0];
}

console.log(minPlaneToReachDestination([2, 1, 2, 3, 1])); // output: 2
console.log(minPlaneToReachDestination([1, 6, 3, 4, 5, 0, 0, 0, 6])); // output: 3
console.log(minPlaneToReachDestination([1, 6, 3, 4, 0, 0, 0, 0, 0])); // output: -1

/*
Time Complexity:

1. The function iterates over each airport in the worst case, starting from the second-to-last airport and going backwards to the first airport.
2. For each airport, it iterates over the airports that can be reached from it based on the fuel available.
3. Therefore, the time complexity is O(n^2), where n is the number of airports.

Space Complexity:

1. The function creates an array of size n to store the minimum planes needed to reach each airport, where n is the number of airports.
2. Therefore, the space complexity is O(n) since the size of the array grows linearly with the number of airports.
*/
