import { main, IPrinter } from './index'
import * as fs from 'fs'
import { expect } from 'chai';

class Printer implements IPrinter {
  private lastValue: Map<string,number> = new Map<string,number>()

  log(msg: { var: string; val: number; }): void {
  this.lastValue.set(msg.var, msg.val)
  }
  last(name: string): number { return this.lastValue.get(name) }
}
const program1: any[] =
  JSON.parse(fs.readFileSync('./src/input/program1.json', { encoding: 'utf8' }))
const program2 : any[] =
  JSON.parse(fs.readFileSync('./src/input/program2.json', { encoding: 'utf8' }))
const commands1 : any[] =
  JSON.parse(fs.readFileSync('./src/input/commands1.json', { encoding: 'utf8' }))
const commands2 : any[] =
  JSON.parse(fs.readFileSync('./src/input/commands2.json', { encoding: 'utf8' }))
const commands3 : any[] =
  JSON.parse(fs.readFileSync('./src/input/commands3.json', { encoding: 'utf8' }))
describe('HW2', (): void => {
  it('should handle the example program from the assignment', (): void => {
    const printer = new Printer();
    main(program1, commands1, printer);
expect(printer.last('x')).to.equal(5);
  });
  it('handle the example program from assignment with added commands', (): void => {
    const printer = new Printer();
    main(program1, commands2, printer);
    expect(printer.last('x')).to.equal(5);
  });
  it('handle the larger program from the assignment with some commands', (): void => {
    const printer = new Printer();
    main(program2, commands3, printer);
    expect(printer.last('a')).to.equal(7)
    expect(printer.last('b')).to.equal(14)
    expect(printer.last('e')).to.equal(7)
    expect(printer.last('g')).to.equal(1)
  });
});
