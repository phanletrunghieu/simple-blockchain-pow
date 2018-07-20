const sha256 = require('js-sha256')
const Block = require('./Block')
const config = require('../config')

class Blockchain {
	constructor() {
		let genesisBlock = new Block();
		genesisBlock.prevHash  = "0"
		genesisBlock.hash      = this.generateHash(genesisBlock)
		genesisBlock.timestamp = Date.now()

		this.blocks = [genesisBlock]
	}

	addBlock(block) {
		this.blocks.push(block)
	}

	generateHash(block) {
		return sha256(block.key)
	}

	getLatestBlock() {
		return this.blocks[this.blocks.length-1]
	}

	mineBlock(transactions) {
		let latestBlock = this.getLatestBlock()

        let block       = new Block()
        block.nonce     = 0
	    block.prevHash  = latestBlock.hash
	    block.addTransactions(transactions)

        do {
            block.nonce++;
            block.timestamp = Date.now()
            block.difficulty = this.getDifficulty()
            block.hash = this.generateHash(block)
        } while(block.hash.substring(0, block.difficulty) !== '0'.repeat(block.difficulty))

	    return block
	}

	getDifficulty() {
		let currentTime = Date.now()
		let latestBlock = this.getLatestBlock()
		let difficulty = latestBlock.difficulty
		difficulty = latestBlock.timestamp + config.mine_rate > currentTime ? difficulty + 1 : difficulty - 1
		return difficulty
    }

	isValid() {
		//check genesisBlock
		let genesisBlock = this.blocks[0]
		if (genesisBlock.hash !== this.generateHash(genesisBlock)) {
			return false;
		}

		for(let i = 1; i < this.blocks.length; i++) {
			const currentBlock = this.blocks[i]
			const prevBlock = this.blocks[i-1]
			if (currentBlock.prevHash !== prevBlock.hash
				|| currentBlock.hash !== this.generateHash(currentBlock)){
				return false
			}
		}
		return true
	}

	replaceBlocks(newBlocks) {
		if (newBlocks.length <= this.blocks.length) {
			return;
		} else if(!newBlocks.isValid()) {
			return;
		}

		this.blocks = newBlocks;
    }
}

module.exports = Blockchain