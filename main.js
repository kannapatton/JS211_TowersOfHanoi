'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
const movePiece = (startStack,endStack) => {
  // Your code here
  //need to pop off startStack 
  let piece= stacks[startStack].pop()
  //and push to endStack
  stacks[endStack].push(piece)


}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack,endStack) => {
  // Your code here
  // if endStack is empty, automatically legal
  //if endStack is occupied, current piece must be smaller than other piece
if (stacks[startStack].slice(-1)<stacks[endStack].slice(-1)||stacks[endStack]==0){
  return true;
} else{
   return false;
}
}

// What is a win in Towers of Hanoi? When should this function run?
// this function should check to see if stack c has a value of 4,3,2,1
const checkForWin = () => {
  // Your code here
  if
  (stacks["c"].length==4){
    return true;
  } 
  else {
    return false;
  }
}

// When is this function called? What should it do with its argument?
//this function should check if a move is legal, move piece, and check for win
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
if (isLegal(startStack,endStack))
{
  movePiece(startStack,endStack)
}
else {
  return console.log('Cannot move there, try again')
}
if (checkForWin()) {
  return console.log("You win!")
}
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [], c: [4, 3, 2, 1] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
