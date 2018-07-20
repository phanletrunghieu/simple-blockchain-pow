let Blockchain  = require("./models/Blockchain")
let Block       = require("./models/Block")
let Transaction = require("./models/Transaction")

let blockchain = new Blockchain()

// create 10 block
for (let i = 0; i < 10; i++) {

	//each block has 3 transactions
	let transactions = [];
	for (let j = 0; j < 3; j++) {
		let transaction = new Transaction("hieudeptrai" + i + j, "hieuratdeptrai" + i + j, i * j)
		transactions.push(transaction);
	}

	let block = blockchain.mineBlock(transactions)
	blockchain.addBlock(block)
}
console.log(blockchain)

let is_valid = blockchain.isValid();
console.log("Before changing: Blockchain is " + (is_valid ? "" : "not ") + "valid")

let fakeTransaction = new Transaction("xxx", "yyy", 999999)
blockchain.blocks[0].transactions.push(fakeTransaction)

is_valid = blockchain.isValid();
console.log("After changing: Blockchain is " + (is_valid ? "" : "not ") + "valid")