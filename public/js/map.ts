
export {}

// console.log("map: code run");

// type n<T> = T | null;

// type Node = {
//     left: n<Node>,
//     right: n<Node>,
//     value: n<string>
// };

// function isNull(node: n<Node>) {
//     return (node == null) ? true : node.left == null && node.right == null && node.value == null;
// }

// class map {
    
    
//     constructor() {

//     }
    
//     root: Node = {
//         left: null,
//         right: null,
//         value: null
        
//     };

//     insert(value: string) {
        
//     }
    
//     insert_impl(value: string) {

//     }
    
//     contains(value: string): boolean {
//         if(isNull(this.root)) {
//             return false;
//         }
//         return this.contains_impl(this.root, value);
//     }
    
//     contains_impl(node: n<Node>, value: string): boolean {
//         if(node == null || node.value == null) {
//             return false;
//         }
//         else {
//             if(node.value == value) {
//                 return true;
//             }
//             if(node.value > value) {
//                 return this.contains_impl(node.left, value);
//             } else {
//                 return this.contains_impl(node.right, value);
//             }
//         }
//     }
    
    
    
//     // inserts the node into the map

    
    
// };

// console.log("");


// export {}