class Node {
    constructor(val, prev) {
        this.val = val;
        this.prev = prev;
    }
}

export class Tree {
    tree = {};

    constructor(parent) {
        const key = JSON.stringify(parent);
        this.tree[key] = new Node(parent, []);
    }

    addVal(parent, child) {
        const childKey = JSON.stringify(child);
        if (!this.tree[childKey]) this.tree[childKey] = new Node(child, [parent]);
        else this.tree[childKey].prev.push(parent);
    }

    find(key) {
        return this.tree[key];
    }
}