import { IStatement } from './dataTypes'
import { IPrinter } from './index';

//Question 2: Implementing Singleton and required Observer Pattern
//Singleton:
//This ProgramManager class is a singleton given its 'instance' variable and how it can only be
//accessed statically, and with its constructor as private. All other classes mostly reference classes that get
//actual variables and files being managed by the program here in a one stop shop.
//ObserverPattern:
//Although it's not spread out across a different class, each file has a list of subscribers tracked via the
//'monitoredFileVars'. When a file is updated via the 'updateFileVariable' method, its associated variables
//are also updated (see the 'updateFileVariable' method for details below).
export class ProgramManager {
    private varMap: Map<string, number> = new Map();
    private fileVarMap: Map<string, number> = new Map();
    private monitoredVars: string[] = [];
    private monitoredFileVars: Map<string, string[]> = new Map();
    private printer: IPrinter;
    
    private static  _current: ProgramManager;
    
    private constructor(){}

    public static get instance(): ProgramManager {
        if (this._current == undefined){
            this._current = new ProgramManager();
        }
        return this._current;
    }

    public static cleanUp(): void {
        this._current = new ProgramManager();
    }

    public setPrinter(printer: IPrinter){
        this.printer = printer;
    }

    // should return undefined if it's not a variable
    public getVariable(name: string): number {
        if (!this.varMap.has(name)){
            return 0;
        }
        return this.varMap.get(name);
    }

    public getFileVariable(name: string): number | undefined {
        return this.fileVarMap.get(name);
    }

    public updateVariable(name: string, value: number): void {
        this.varMap.set(name, value);

        let index = this.monitoredVars.indexOf(name);
        if (index != -1) {
            this.printer.log({var: name, val: value});
        }
    }


    public updateFileVariable(name: string, value: number): void {
        this.fileVarMap.set(name, value);

        //Here we implement the observer pattern by notifying every variable that has subscribed
        //to this file to update itself with the new file value.
        if(this.monitoredFileVars.has(name)){
            this.monitoredFileVars.get(name).map(varName => this.updateVariable(varName, value))
        }
    }

    public monitorVariable(name: string): void {
        const index = this.monitoredVars.indexOf(name);
        if (index == -1) {
            this.monitoredVars.push(name);
        }
    }

    public monitorFileVariable(name: string, varName: string): void {
        if (!this.monitoredFileVars.has(name)) {
            this.monitoredFileVars.set(name, []);
        }
        const currArray: string[] = this.monitoredFileVars.get(name);
        currArray.push(varName);
        this.monitoredFileVars.set(name, currArray);
    }
}