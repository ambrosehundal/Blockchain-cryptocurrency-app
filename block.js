class Block {
    constructor(timestamp, lastHash, hash, data) {
       this.timestamp = timestamp;
       this.lastHash = lastHash;
       this.hash = hash;
       this.data = data;
    }
    toString() {
       return `Block -
         Timestamp: ${this.timestamp}
         Last Hash: ${this.lastHash.substring(0, 10)}
         Hash     : ${this.hash.substring(0, 10)}
         Data     : ${this.data}`; 
    }
    //Genesis block
    static genesis(){
        return new this('Genesis time', '----', 'f1r57h-45h', []);
    }

    //function to generate new blocks
    static mineBlock(lastBlock, data){
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = 'todo=hash';
        
        return new this(timestamp, lastHash, hash, data);
    }
}
    
module.exports = Block;  