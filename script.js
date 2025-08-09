import { Queue } from './Queue.js';
import { Tree } from './Tree.js';


function knightMoves(begin, target) {
    const visitedSpaces = [];
    const spacesToVisit = new Queue();
    const tree = new Tree(begin);

    let currentSpace = begin;
    while (JSON.stringify(currentSpace) !== JSON.stringify(target)) {
        visitedSpaces.push(currentSpace);
        const possibleMoves = generatePossibleMoves(currentSpace, visitedSpaces);
        possibleMoves.forEach(nextMove => {
            spacesToVisit.enqueue(nextMove);
            tree.addVal(currentSpace, nextMove);
        });
        currentSpace = spacesToVisit.dequeue();
    }
    let node = tree.find(JSON.stringify(target));
    const path = [];
    while (node) {
        path.unshift(node.val);
        node = tree.find(JSON.stringify(node.prev[0]));
    }
    return path;
}

const knightPath = knightMoves([3, 3], [0, 0]);
console.log('Final path:', knightPath);

function generatePossibleMoves(coordinates, visitedSpaces) {
    const x = coordinates[0];
    const y = coordinates[1];
    const allMoves = [
        [x - 2, y + 1], [x - 2, y - 1],
        [x + 2, y + 1], [x + 2, y - 1],
        [x + 1, y + 2], [x + 1, y - 2],
        [x - 1, y + 2], [x - 1, y - 2]
    ];
    return allMoves.filter(coords => 
        JSON.stringify(visitedSpaces).indexOf(JSON.stringify(coords)) === -1 &&
        coords[0] >= 0 && coords[0] <= 7 &&
        coords[1] >= 0 && coords[1] <= 7
    );
}