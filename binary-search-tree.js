class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else if (val > current.val) {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, current = this.root) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    if (val < current.val) {
      if (!current.left) {
        current.left = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.left);
    } else {
      if (!current.right) {
        current.right = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.right);
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;
    while (current) {
      if (val === current.val) return current;
      if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, current = this.root) {
    if (!current) return undefined;
    if (val === current.val) return current;
    if (val < current.val) {
      return this.findRecursively(val, current.left);
    } else {
      return this.findRecursively(val, current.right);
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder(node = this.root,visited = []) {
    if (!node) return visited;
    visited.push(node.val);
    if (node.left) this.dfsPreOrder(node.left, visited);
    if (node.right) this.dfsPreOrder(node.right, visited);
    return visited;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder(node = this.root, visited = []) {
    if (!node) return visited;
    if (node.left) this.dfsInOrder(node.left, visited);
    visited.push(node.val);
    if (node.right) this.dfsInOrder(node.right, visited);
    return visited;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder(node = this.root, visited = []) {
    if (!node) return visited;
    if (node.left) this.dfsPostOrder(node.left, visited);
    if (node.right) this.dfsPostOrder(node.right, visited);
    visited.push(node.val);
    return visited;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const queue = [this.root];
    const visited = [];
    while (queue.length) {
      const node = queue.shift();
      visited.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return visited;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val, current = this.root, parent = null) {
    if (!current) return undefined;

    if (val < current.val) {
      return this.remove(val, current.left, current);
    } else if (val > current.val) {
      return this.remove(val, current.right, current);
    } else {
      if (!current.left && !current.right) {
        if (current === this.root) {
          this.root = null;
        } else if (current === parent.left) {
          parent.left = null;
        } else {
          parent.right = null;
        }
        return current;
      } else if (!current.left) {
        if (current === this.root) {
          this.root = current.right;
        } else if (current === parent.left) {
          parent.left = current.right;
        } else {
          parent.right = current.right;
        }
        return current;
      } else if (!current.right) {
        if (current === this.root) {
          this.root = current.left;
        } else if (current === parent.left) {
          parent.left = current.left;
        } else {
          parent.right = current.left;
        }
        return current;
      } else {
        let successor = current.right;
        while (successor.left) {
          successor = successor.left;
        }
        const successorValue = successor.val;
        this.remove(successor.val);
        current.val = successorValue;
        return current;
      }
    }
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced(node = this.root) {
    if (!node) return true;

    const height = (node) => {
      if (!node) return 0;
      return 1 + Math.max(height(node.left), height(node.right));
    };

    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    return (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest(node = this.root) {
    if (!node || (!node.left && !node.right)) return undefined;

    let parent = null;
    while (node.right) {
      parent = node;
      node = node.right;
    }
    if (node.left) {
      let leftMax = node.left;
      while (leftMax.right) {
        leftMax = leftMax.right;
      }
      return leftMax.val;
    }

    return parent ? parent.val : undefined;
  }
}

module.exports = BinarySearchTree;
