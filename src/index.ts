import crypto from "crypto"

interface BlockShape {
	_hash: string
	prevHash: string
	height: number
	data: string
}

class Block implements BlockShape {
	public _hash: string
	constructor(public prevHash: string, public height: number, public data: string) {
		this._hash = Block.calculateHash(prevHash, height, data)
	}

	static calculateHash(prevHash: string, height: number, data: string) {
		const toHash = `${prevHash}${height}${data}`
		return crypto.createHash("sha256").update(toHash).digest("hex")
	}
}

class BlockChain {
	_blocks: Block[]
	constructor() {
		this._blocks = []
	}

	getPrevHash() {
		if (this._blocks.length === 0) {
			return ""
		} else {
			return this._blocks[this._blocks.length - 1]._hash
		}
	}

	addBlock(data: string) {
		const newBlock: Block = new Block(this.getPrevHash(), this._blocks.length + 1, data)
		this._blocks.push(newBlock)
	}

	getBlocks() {
		return this._blocks
	}
}

const blockChain = new BlockChain()

blockChain.addBlock("first one")
blockChain.addBlock("second one")
blockChain.addBlock("third one")

console.log(blockChain.getBlocks())
