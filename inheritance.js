Function.prototype.inherits = function(ParentClass){
    function Surrogate(){}
    Surrogate.prototype = ParentClass.prototype
    this.prototype = new Surrogate()
    this.prototype.constructor = this

    // this.prototype = Object.create(ParentClass.prototype)
    // this.prototype.constructor = this
}

function MovingObject (name) {
    this.name = name
}

MovingObject.prototype.move = function(){
    console.log(`${this.name} is moving!`)
}


// class Ship extends MovingObject{
//     constructor(name){
//         this.name = name
//     }
// }

function Ship(name){
    this.name = name
}

Ship.inherits(MovingObject);


Ship.prototype.float = function(){
    console.log(`${this.name} is floating!`)
}


function Asteroid () {}
Asteroid.inherits(MovingObject);