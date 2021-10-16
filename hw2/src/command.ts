import { ProgramManager } from "./singleton";
import { COMMAND, IUpdate, IMonitor } from "./dataTypes";

export class Update implements IUpdate {
    readonly kind: COMMAND = COMMAND.Update;
    readonly name: string;
    readonly value: number;

    constructor(updt: IUpdate){
        this.name = updt.name;
        this.value = updt.value;
    }

    run(): void {
        ProgramManager.instance.updateFileVariable(this.name, this.value);
    }
}

export class Monitor implements IMonitor {
    readonly kind: COMMAND = COMMAND.Monitor;
    readonly name: string;

    constructor(mntr: IMonitor){
        this.name = mntr.name;
    }

    run(): void {
        ProgramManager.instance.monitorVariable(this.name);
    }
}