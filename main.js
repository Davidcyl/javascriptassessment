//Import all required modules

const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');

//Instantiate variable
//You can edit or create new variables if needed

const hat = '^';            //My hat
const hole = 'O';
const fieldCharacter = '░'; //Grass to fill up the field
const pathCharacter = '*';  //Me
const row = 10;
const col = 10;

//if you prefer to use function, please go ahead
//In this kick-starter, we are using class object

//1) Build the whole Field out (10 row X 10 col)
//Create 2D array
//Contract the layout of the field using empty array

class Field {

    field = [];

    constructor() {
    
    //The current location of the character "*"
    this.locationX = 0;
    this.locationY=0;

    for (let a = 0; a < row; a++) {
        this.field[a] = [];
    }

    this.generateField(); //Display the game out
    }

    generateField(percentage=0.2) {

        const field = new Array(row).fill(0).map(el => new Array(col));

        for (let y = 0; y < row; y++) {
            for (let x = 0; x < col; x++) {
                const prob = Math.random();
                this.field[y][x]= prob > percentage ? fieldCharacter : hole;
            }
        } 
        //Set the "hat" location randomly 
        const hatLocation = {
            x: Math.floor(Math.random()*col),
            y: Math.floor(Math.random()*row)
        };
        this.field[hatLocation.x][hatLocation.y] = hat;
        //Set the character position as [0][0]
        this.field[0][0] = pathCharacter 
    }

    runGame() {
        let play = true;
        while (play) {
        this.print();
        this.askQuestion();
        if (!this.isinBound()) {
            console.log("Out of bounds - Game Over");
            play = false;
            break; //Breaks out of loop, game needs to be restarted
        }
        else if (this.isHole()) {
            console.log("Sorry, you fell down a hole!");
            play = false;
            break;
        }
        else if (this.isHat()) {
            console.log("Congrats, you found your hat!");
            play = false;
            break;
        }

        this.field[this.locationY][this.locationX]=pathCharacter;
        }
    }

    print() {
        clear();
        const displayString = this.field.map (row => {
            return row.join('');
        }).join('\n'); //newline / break
        console.log(displayString);
    }

    askQuestion() {
        const answer = prompt('Which way? ').toUpperCase();
        //Use of switch statement to select one of many code blocks to be executed.
        switch(answer) {
            case 'U':
              this.locationY -= 1;
              break;
            case 'D':
              this.locationY += 1;
              break;
            case "L":
                this.locationX -= 1;
              break;
            case "R":
                this.locationX += 1;
                break;
            default:
              console.log('Enter U, D, L or R.');
              this.askQuestion();
              break;
          }
    }

//Character is in bound when
isinBound() {
    return (
        this.locationX >= 0 &&
        this.locationY >= 0 &&
        this.locationX <= 10 &&
        this.locationY <= 10
    );
}

//Function when hole is found
isHole() {
    return this.field[this.locationY][this.locationX] === hole;
}
//Function when hat is found
isHat() {
    return this.field[this.locationY][this.locationX] === hat;
}

} //End of Field Class

//Create an instance object for the field
const myField = new Field();
myField.runGame();