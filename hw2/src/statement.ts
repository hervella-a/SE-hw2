import { ExpressionType, ISimple, STATEMENT, IConditional, IWatch, IVar, ITarget } from "./dataTypes";
import { ProgramManager } from "./singleton";
import { ExpressionFactory } from "./factory";
import {  Var } from "./expression";

export class Simple implements ISimple {
    readonly kind: STATEMENT = STATEMENT.Simple;
    readonly variable: IVar;
    readonly expression: ExpressionType
    
    constructor(simple: ISimple) {
        this.variable = new Var(simple.variable, this);
        this.expression = ExpressionFactory(simple.expression, this);
    }

    exe(): void {
        ProgramManager.instance.updateVariable(this.variable.name, this.expression.result());
    }    
}

export class Conditional implements IConditional {
    guard: IVar;
    trueExp: ExpressionType;
    falseExp: ExpressionType;
    kind: STATEMENT = STATEMENT.Conditional;
    variable: IVar;

    constructor(cndl: IConditional) {
        this.guard = new Var(cndl.guard, this);
        this.trueExp = ExpressionFactory(cndl.trueExp, this);
        this.falseExp = ExpressionFactory(cndl.falseExp, this);
        this.variable = new Var(cndl.variable, this);
    }

    exe(): void {
        const trueExpResult: number = this.trueExp.result();
        const falseExpResult: number = this.falseExp.result();
        const result: number = ProgramManager.instance.getVariable(this.guard.name) ? trueExpResult : falseExpResult;
        ProgramManager.instance.updateVariable(this.variable.name, result);
    }
    
}


export class Watch implements IWatch {
    readonly kind: string = STATEMENT.Watch;
    readonly variable: IVar;
    readonly file: ITarget;

    constructor(watch: IWatch){
        this.variable = watch.variable;
        this.file = watch.file;
    }

    exe(): void {
        ProgramManager.instance.monitorFileVariable(this.file.name, this.variable.name)
    }
}
