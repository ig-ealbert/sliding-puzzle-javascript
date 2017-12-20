QUnit.test( "Initially the message div should be blank", function (assert ) {
  var message = document.getElementById("message");
  assert.equal( message.innerHTML, "", "No message should be displayed when the game starts." );
});

QUnit.test( "The reset button should not be highlighted when the game starts", function (assert ) {
  var resetButton = document.getElementById("restartGame");
  assert.equal( resetButton.classList.contains("greenBorder"), false, "The reset button should not have a green border." );
});

QUnit.test( "The numbers should be ordered before scrambling them", function (assert ) {
  gameState = initializeGameState();
  var expected = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]];
  assert.deepEqual( gameState, expected, "The numbers should be ordered." );
});

QUnit.test( "The numbers should not be ordered after scrambling them", function (assert ) {
  gameState = initializeGameState();
  gameState = createSolvablePuzzleState(gameState);
  var expected = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]];
  assert.notDeepEqual( gameState, expected, "The numbers should not be ordered." );
});

QUnit.test( "Clicking on the number to the left of the x should swap the two pieces", function( assert ) {
  gameState = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 0, 11], [13, 14, 15, 12]];
  swapWithXPiece(2, 1);
  var expected = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 0, 10, 11], [13, 14, 15, 12]];
  assert.deepEqual( gameState, expected, "The pieces should be swapped." );
});

QUnit.test( "Clicking on the number to the right of the x should swap the two pieces", function( assert ) {
  gameState = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 0, 11], [13, 14, 15, 12]];
  swapWithXPiece(2, 3);
  var expected = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 0], [13, 14, 15, 12]];
  assert.deepEqual( gameState, expected, "The pieces should be swapped." );
});

QUnit.test( "Clicking on the number above the x should swap the two pieces", function( assert ) {
  gameState = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 0, 11], [13, 14, 15, 12]];
  swapWithXPiece(1, 2);
  var expected = [[1, 2, 3, 4], [5, 6, 0, 8], [9, 10, 7, 11], [13, 14, 15, 12]];
  assert.deepEqual( gameState, expected, "The pieces should be swapped." );
});

QUnit.test( "Clicking on the number below the x should swap the two pieces", function( assert ) {
  gameState = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 0, 11], [13, 14, 15, 12]];
  swapWithXPiece(3, 2);
  var expected = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 15, 11], [13, 14, 0, 12]];
  assert.deepEqual( gameState, expected, "The pieces should be swapped." );
});

QUnit.test( "If the X piece exists, it should be found", function( assert ) {
  gameState = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 0, 11], [13, 14, 15, 12]];
  assert.deepEqual( findXPiece(), [2,2], "The piece's location should be returned." );
});

QUnit.test( "If the X piece does not exist, it should not be found", function( assert ) {
  gameState = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 10, 11], [13, 14, 15, 12]];
  assert.deepEqual( findXPiece(), [-1,-1], "A dummy location should be returned." );
});

QUnit.test( "All spaces should have an event handler", function (assert ) {
  gameState = initializeGameState();
  addClickHandlers();
  var areThereClickHandlers = true;
  var table = document.getElementById("puzzle");
  var cells = table.getElementsByTagName("td");
  for (var cell of cells) {
    areThereClickHandlers = areThereClickHandlers && (typeof cell.onclick == "function");
  }
  assert.deepEqual(areThereClickHandlers, true, "All spaces have event handlers." );
});

QUnit.test( "The piece to the left of the x is adjacent to it", function( assert ) {
  gameState = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 0, 11], [13, 14, 15, 12]];
  assert.equal( isAdjacentToX(2, 1), true, "The pieces should be adjacent." );
});

QUnit.test( "The piece to the right of the x is adjacent to it", function( assert ) {
  gameState = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 0, 11], [13, 14, 15, 12]];
  assert.equal( isAdjacentToX(2, 3), true, "The pieces should be adjacent." );
});

QUnit.test( "The piece above the x is adjacent to it", function( assert ) {
  gameState = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 0, 11], [13, 14, 15, 12]];
  assert.equal( isAdjacentToX(1, 2), true, "The pieces should be adjacent." );
});

QUnit.test( "The piece below the x is adjacent to it", function( assert ) {
  gameState = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 0, 11], [13, 14, 15, 12]];
  assert.equal( isAdjacentToX(3, 2), true, "The pieces should be adjacent." );
});

QUnit.test( "The piece to the left of the x should become the x when clicked", function( assert ) {
  gameState = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 0, 11], [13, 14, 15, 12]];
  swapPiecesInUI([2, 1], [2, 2]);
  var table = document.getElementById("puzzle");
  var row = table.getElementsByTagName("tr")[2];
  var cell = row.getElementsByTagName("td")[1];
  assert.equal( cell.innerHTML, "x", "The pieces should be swapped." );
});

QUnit.test( "The x piece should become the piece to the left when the piece to the left is clicked", function( assert ) {
  gameState = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 0, 11], [13, 14, 15, 12]];
  swapPiecesInUI([2, 1], [2, 2]);
  var table = document.getElementById("puzzle");
  var xRow = table.getElementsByTagName("tr")[2];
  var xCell = xRow.getElementsByTagName("td")[2];
  assert.equal( xCell.innerHTML, "10", "The pieces should be swapped." );
});

QUnit.test( "The piece to the right of the x should become the x when clicked", function( assert ) {
  gameState = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 0, 11], [13, 14, 15, 12]];
  swapPiecesInUI([2, 3], [2, 2]);
  var table = document.getElementById("puzzle");
  var row = table.getElementsByTagName("tr")[2];
  var cell = row.getElementsByTagName("td")[3];
  assert.equal( cell.innerHTML, "x", "The pieces should be swapped." );
});

QUnit.test( "The x piece should become the piece to the right when the piece to the right is clicked", function( assert ) {
  gameState = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 0, 11], [13, 14, 15, 12]];
  swapPiecesInUI([2, 3], [2, 2]);
  var table = document.getElementById("puzzle");
  var xRow = table.getElementsByTagName("tr")[2];
  var xCell = xRow.getElementsByTagName("td")[2];
  assert.equal( xCell.innerHTML, "11", "The pieces should be swapped." );
});

QUnit.test( "The piece above the x should become the x when clicked", function( assert ) {
  gameState = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 0, 11], [13, 14, 15, 12]];
  swapPiecesInUI([1, 2], [2, 2]);
  var table = document.getElementById("puzzle");
  var row = table.getElementsByTagName("tr")[1];
  var cell = row.getElementsByTagName("td")[2];
  assert.equal( cell.innerHTML, "x", "The pieces should be swapped." );
});

QUnit.test( "The x piece should become the piece above when the piece above is clicked", function( assert ) {
  gameState = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 0, 11], [13, 14, 15, 12]];
  swapPiecesInUI([1, 2], [2, 2]);
  var table = document.getElementById("puzzle");
  var xRow = table.getElementsByTagName("tr")[2];
  var xCell = xRow.getElementsByTagName("td")[2];
  assert.equal( xCell.innerHTML, "7", "The pieces should be swapped." );
});

QUnit.test( "The piece below the x should become the x when clicked", function( assert ) {
  gameState = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 0, 11], [13, 14, 15, 12]];
  swapPiecesInUI([3, 2], [2, 2]);
  var table = document.getElementById("puzzle");
  var row = table.getElementsByTagName("tr")[3];
  var cell = row.getElementsByTagName("td")[2];
  assert.equal( cell.innerHTML, "x", "The pieces should be swapped." );
});

QUnit.test( "The x piece should become the piece below when the piece below is clicked", function( assert ) {
  gameState = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 0, 11], [13, 14, 15, 12]];
  swapPiecesInUI([3, 2], [2, 2]);
  var table = document.getElementById("puzzle");
  var xRow = table.getElementsByTagName("tr")[2];
  var xCell = xRow.getElementsByTagName("td")[2];
  assert.equal( xCell.innerHTML, "15", "The pieces should be swapped." );
});

QUnit.test( "The game is won when the numbers are in order", function (assert ) {
  gameState = initializeGameState();
  var expected = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]];
  assert.equal( checkForWin(), true, "The game has been won." );
});

QUnit.test( "A message is displayed if the game has been won", function (assert ) {
  var message = document.getElementById("message");
  gameState = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 0, 15]]
  swapWithXPiece(3, 3);
  assert.equal( message.innerHTML, "You won the game!", "A message is displayed to show that the player won." );
});

QUnit.test( "The reset button should be highlighted when the game is won", function (assert ) {
  var resetButton = document.getElementById("restartGame");
  gameState = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 0, 15]]
  swapWithXPiece(3, 3);
  assert.equal( resetButton.classList.contains("greenBorder"), true, "The reset button should have a green border." );
});
