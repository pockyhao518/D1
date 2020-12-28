// function sum(){
//     let args = Array.from(arguments);
//     let total = 0;
//     args.forEach(el =>{
//         total += el;
//     })
//     return total;
// }

function sum(...args){
    let total = 0;
    args.forEach(el => {
        total+=el;
    })
    return total;
}

// console.log(sum(1, 2, 3, 4) === 10);
// console.log(sum(1, 2, 3, 4, 5) === 15);

// Function.prototype.myBind = function(ctx){
//     let bindarg = Array.from(arguments).slice(1);
//     let fn = this;
//     return function(){
//         let callarg = Array.from(arguments).slice(0);
//         return fn.apply(ctx,bindarg.concat(callarg))
//     }
// }

Function.prototype.myBind = function(ctx, ...bindargs){
    let fn = this;
    return function(...callarg){
        return fn.apply(ctx, bindargs.concat(callarg))
    }
}

class Cat {
    constructor(name) {
        this.name = name;
    }

    says(sound, person) {
        console.log(`${this.name} says ${sound} to ${person}!`);
        return true;
    }
}

class Dog {
    constructor(name) {
        this.name = name;
    }
}
const markov = new Cat("Markov");
const pavlov = new Dog("Pavlov");

markov.says("meow", "Ned");
// Markov says meow to Ned!
// true

// bind time args are "meow" and "Kush", no call time args
markov.says.myBind(pavlov, "meow", "Kush")();
// Pavlov says meow to Kush!
// true

// no bind time args (other than context), call time args are "meow" and "a tree"
markov.says.myBind(pavlov)("meow", "a tree");
// Pavlov says meow to a tree!
// true
// bind time arg is "meow", call time arg is "Markov"
markov.says.myBind(pavlov, "meow")("Markov");
// Pavlov says meow to Markov!
// true

// no bind time args (other than context), call time args are "meow" and "me"
const notMarkovSays = markov.says.myBind(pavlov);
notMarkovSays("meow", "me");
// Pavlov says meow to me!
// true

function curriedSum(integers){
    const numbers = []

    function _curriedSum(ele){
        numbers.push(ele)

        if(numbers.length === integers){
            return numbers.reduce((acc, el)=> acc + el)
        }else{
            return _curriedSum
        }
    }
    return _curriedSum
}

const sum2 = curriedSum(4);
console.log(sum2(5)(30)(20)(1)); // => 56

function addFour(a,b,c,d){
    return a + b + c + d
}

Function.prototype.curry = function(numArgs){
    let numbers = []
    let fn = this

    return function _curry(el){
        numbers.push(el)

        if(numbers.length === numArgs){
            // return fn.apply(null, numbers)
            return fn(...numbers)
        }else{
            return _curry
        }
    }
}

const test = addFour.curry(5);
console.log(test(1)(2)(3)(4)(5));