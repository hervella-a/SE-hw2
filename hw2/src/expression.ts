import { ExpressionType, IBinary, IStatement, EXPRESSION, INumber, IVar, ITarget } from "./dataTypes";
import { ProgramManager } from "./singleton";
import { ExpressionFactory } from "./factory";

export class Binary implements IBinary {
    readonly left: ExpressionType;
    readonly right: ExpressionType;
    readonly kind: string;

    constructor(binary: IBinary, statement: IStatement){
        this.left = ExpressionFactory(binary.left, statement);
        this.right = ExpressionFactory(binary.right, statement);
        this.kind = binary.kind;
    }

    result(): number {
        const leftResult: number = this.left.result();
        const rightResult: number = this.right.result();

        switch(this.kind){
            case(EXPRESSION.Add):
                return leftResult + rightResult;
            case(EXPRESSION.Div):
                return leftResult / rightResult;
            case(EXPRESSION.Mul):
                return leftResult * rightResult;
            case(EXPRESSION.Sub):
                return leftResult - rightResult;
            default:
                throw new Error("Binary class: Something went horribly wrong with the IBinary kind :(");
        }
    }
}

export class Number implements INumber {
    readonly kind: string = EXPRESSION.Num;
    readonly value: number;

    constructor(num: INumber){
        this.value = num.value;
    }

    result(): number {
        return this.value;
    }
}

export class Var implements IVar {
    readonly name: string;
    readonly kind: EXPRESSION = EXPRESSION.Var;

    constructor(variable: IVar, statement: IStatement) {
        this.name = variable.name;
    }
    result(): number {
        return ProgramManager.instance.getVariable(this.name);
    }
}

export class Target implements ITarget {
    kind: string = EXPRESSION.Target;
    name: string;

    constructor(target: ITarget){
        this.name = target.name;
    }

    result(): number {
        return ProgramManager.instance.getFileVariable(this.name);
    }
    
}