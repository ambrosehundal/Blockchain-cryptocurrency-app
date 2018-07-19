const Blockchain = require('./blockchain');
const Block = require('./block');


describe('Blockchain', () => {
  let bc, bc2;

  beforeEach(() =>{
    bc = new Blockchain();
    bc2 = new Blockchain();

  });

  it('starts with genesis block', () =>{
    expect(bc.chain[0]).toEqual(Block.genesis()); //first block should be the genesis block
  });
 
 it('adds a new block', () =>{
    const data = 'Excellence';
    bc.addBlock(data);

    expect(bc.chain[bc.chain.length-1].data).toEqual(data); //test that it can successfully add a new block
 });

 it('validates a valid chain', () =>{
    bc2.addBlock('Excellence');

    expect(bc.isValidChain(bc2.chain)).toBe(true);

 });

 it('invalidates a chain with a corrupt genesis block', () => {
     bc2.chain[0].data = 'Bad data';

     expect(bc.isValidChain(bc2.chain)).toBe(false);
 });

 it('invalidates a corrupt chain', () =>{
    bc2.addBlock('foo');
    bc2.chain[1].data = 'not foo';

    expect(bc.isValidChain(bc2.chain)).toBe(false);
 });   


 it('replaces chain with a valid chain', () => {
    bc2.addBlock('goo');
    bc.replaceChain(bc2.chain); //

    expect(bc.chain).toEqual(bc2.chain);

 });


 it('does not replace chain with one less or equal to length chain', () => {
    bc.addBlock('foo');
    bc.replaceChain(bc2.chain); //

    expect(bc.chain).not.toEqual(bc2.chain);

 });


});

