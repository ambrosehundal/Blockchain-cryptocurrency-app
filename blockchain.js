const Block = require('./block');

class Blockchain{
    constructor(){
        this.chain = [Block.genesis()];

    }

    //function to add new blocks to the chain
    addBlock(data){
         // grabs the last block in the chain to get the last hash
        const block = Block.mineBlock(this.chain[this.chain.length-1], data);
        this.chain.push(block); // push/add it to the chain

        return block;
       

    }

    //validating the chain as each new block gets added to the blockchain
    isValidChain(chain){
     
     //first check if the first block in the blockchain is a genesis block   
     if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;    

     //check for validation of all other blocks
     for (let i=1; i<chain.length; i++){
         const block = chain[i];
         const lastBlock = chain[i-1];

         if(block.lastHash !== lastBlock.hash || 
            block.hash !== Block.blockHash(block)){
             return false;
         }


     }
     return true;

    }
    //replace current chain with incoming new chain that has to be valid
    replaceChain(newChain){
      if(newChain.length <= this.chain.length){
          console.log('Received chain is not longer than current chain');
          return;
      }
      else if(!this.isValidChain(newChain)){
          console.log('Received chain is not valid');
          return;
      }
      console.log('Replacing blockchain with the new chain');
      this.chain = newChain;
    }
}

module.exports = Blockchain;
