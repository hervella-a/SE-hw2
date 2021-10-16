import { ProgramManager } from './singleton'
import { StatementType } from './dataTypes'
import { IStatement, ICommand, CommandType } from './dataTypes';
import { StatementFactory, CommandFactory } from './factory';

export function main (jsonPrgrm: any, jsonCmnds: any, printer: IPrinter): number {
    ProgramManager.instance.setPrinter(printer);
    const program: JsonProgram = new JsonProgram(jsonPrgrm);
    const commands: JsonCommands = new JsonCommands(jsonCmnds);

    commands.data.map(command => {command.run(); program.runProgram()});
    
    ProgramManager.cleanUp();
    return 0;
}

export class JsonProgram {
    readonly data: IStatement[];

    constructor (jp: StatementType[]){
        this.data = new Array<IStatement>();
        jp.map(statement => this.data.push(StatementFactory(statement)));
    }

    runProgram(): void {
        this.data.map(statement => statement.exe());
    }
}

export class JsonCommands {
    public readonly data: ICommand[];

    constructor(commands: CommandType[]){
        this.data = new Array<ICommand>();
        commands.map(command => this.data.push(CommandFactory(command)));
    }
}

export interface IPrinter {
    log(msg: {var: string, val: number}) : void;
    last (name: string) : number;
}
