import * as data from './dataTypes'
import * as s from './statement'
import * as c from './command'
import * as e from './expression'

//Question 2: Use of Factory pattern
//This factory is responsible for making a specific IStatement instance using the
//provided type gaurd in the parsed data. We also see this for Expressions, and Conditions in
//a similar fashion with IExpressions and ICommands
export function StatementFactory(st: data.StatementType): data.StatementType {
    switch(st.kind){
        case(data.STATEMENT.Simple):
            return new s.Simple(st as data.ISimple)
        case(data.STATEMENT.Conditional):
            return new s.Conditional(st as data.IConditional);
        case(data.STATEMENT.Watch):
            return new s.Watch(st as data.IWatch);
        default:
            throw errorHandle(st.kind)
    }
}

export function ExpressionFactory(exp: data.ExpressionType, statement: data.IStatement): data.ExpressionType {
    switch(exp.kind){
        case(data.EXPRESSION.Add):
        case(data.EXPRESSION.Div):
        case(data.EXPRESSION.Mul):
        case(data.EXPRESSION.Sub):
            return new e.Binary(exp as data.IBinary, statement);
        case(data.EXPRESSION.Target):
            return new e.Target(exp as data.ITarget);
        case(data.EXPRESSION.Var):
            return new e.Var(exp as data.IVar, statement);
        case(data.EXPRESSION.Num):
            return new e.Number(exp as data.INumber);
        default:
            throw errorHandle(exp.kind)
    }
}

export function CommandFactory(cmnd: data.CommandType): data.CommandType {
    switch(cmnd.kind){
        case(data.COMMAND.Monitor):
            return new c.Monitor(cmnd as data.IMonitor);
        case(data.COMMAND.Update):
            return new c.Update(cmnd as data.IUpdate);
        default:
            throw errorHandle(cmnd.kind)
    }
}

function errorHandle(kind: string): Error {
    return new Error("TypecheckUtility class: A TypecheckUtility for " + kind + " failed :(")
}