const config = require('../config')

class Block {
	constructor(prevHash, hash, transactions, nonce, difficulty, timestamp) {
		this.prevHash     = prevHash || ""
		this.hash         = hash || ""
		this.timestamp    = timestamp || Date.now()
		this.transactions = transactions || []
		this.nonce        = nonce || 0
		this.difficulty   = difficulty || config.difficulty
	}

	addTransaction(transaction) {
		this.transactions.push(transaction)
	}

	addTransactions(transactions) {
		this.transactions = this.transactions.concat(transactions)
	}

	get key() {
		return JSON.stringify(this.transactions) + this.nonce + this.prevHash + this.difficulty
    }
}

module.exports = Block