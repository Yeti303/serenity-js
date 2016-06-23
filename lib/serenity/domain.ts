export enum Result {
    FAILURE,
    PENDING,
    SUCCESS,
    SKIPPED
}

export interface Identifiable {
    id(): string;
}

export class Test implements Identifiable {
    private _scenarioName;
    private _testCaseName;
    private _title;

    constructor(scenarioName: string, testCaseName: string, title: string = scenarioName) {
        this._scenarioName  = scenarioName;
        this._testCaseName  = testCaseName;
        this._title         = title;
    }

    public get title(): string {
        return this._title;
    }

    public get scenarioName(): string {
        return this._scenarioName;
    }

    public get testCaseName(): string {
        return this._testCaseName;

    }

    public id() {
        return `${this.testCaseName}_${this.scenarioName}`;
    }
}

export class Step implements Identifiable{
    private _name: string;
    private _id: string;
    
    constructor(name:string, id: string = name) {
        this._name = name;
        this._id   = id;
    }
    
    public get name() {
        return this._name;
    }

    public id() {
        return this._id;
    }
}

// todo: refactor - maybe replace both with "outcome<T>"?
export class TestOutcome {
    private _test: Test;
    private _result: Result;
    private _error:  Error;
    
    constructor(test: Test, result: Result, error?: Error) {
        this._test = test;
        this._result = result;
        this._error  = error;
    }
    
    public get test(): Test {
        return this._test;
    }
    
    public get result(): Result {
        return this._result;
    }

    public get error(): Error {
        return this._error;
    }
}

// todo: refactor
export class StepOutcome {
    private _step:   Step;
    private _result: Result;
    private _error:  Error;

    constructor(step: Step, result: Result, error?: Error) {
        this._step   = step;
        this._result = result;
        this._error  = error;
    }

    public get step(): Step {
        return this._step;
    }

    public get result(): Result {
        return this._result;
    }

    public get error(): Error {
        return this._error;
    }
}