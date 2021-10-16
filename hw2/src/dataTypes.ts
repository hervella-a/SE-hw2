export enum STATEMENT {
    Simple = "Simple",
    Conditional = "Cond",
    Watch = "Watch"
}
export enum EXPRESSION {
    Add = "Add",
    Div = "Div",
    Mul = "Mul",
    Sub = "Sub",
    Var = "Var",
    Num = "Num",
    Target = "Target"
}
export enum COMMAND {
    Monitor = "Monitor",
    Update = "Update"
}

export type StatementType = (ISimple | IConditional | IWatch)
export type ExpressionType = (IBinary | INumber | ITarget)
export type CommandType = IUpdate | IMonitor;

export interface IStatement {
    readonly kind: string;
    readonly variable: IVar;

    exe(): void;
}

export interface ISimple extends IStatement {
    readonly expression: ExpressionType;
}

export interface IConditional extends IStatement {
    readonly guard: IVar;
    readonly trueExp: ExpressionType;
    readonly falseExp: ExpressionType;
}

export interface IWatch extends IStatement {
    readonly file: ITarget;
}




export interface IExpression {
    readonly kind: string;
    result(): number;
}

export interface IBinary extends IExpression {
    readonly left: ExpressionType;
    readonly right: ExpressionType;
}

export interface INumber extends IExpression {
    readonly value: number;
}

export interface IVar extends IExpression {
    readonly name: string;
}

export interface ITarget extends IExpression {
    readonly name: string;
}




export interface ICommand {
    readonly kind: string;
    readonly name: string;

    run(): void;
}

export interface IUpdate extends ICommand {
    readonly value: number;
}

export interface IMonitor extends ICommand {
}

