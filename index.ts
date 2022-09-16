import {BehaviorSubject, Subject} from "rxjs";

export class PromiseSubjectState {
    constructor(public data: any = null,
                public loading: boolean = false,
                public error: any = null,
                abort: () => undefined = () => undefined) {
    }
}

export class PromiseToSubjectOptions {
    constructor(public suppressErrors: boolean = false, errorHandler?: (error: any) => {}) {
        if (errorHandler) {
            this.errorHandler = errorHandler;
        }
    }

    errorHandler = (error) => console.error(error)
}

export const useSubject = (
    imports: { useEffect: any, useState: any },
    subject: BehaviorSubject<any> | Subject<any>,
    callback?: (value: any) => {}
): any => {
    const [value, setValue] = imports.useState(subject instanceof BehaviorSubject ? subject.getValue() : null);
    imports.useEffect(() => {
        const subscription = subject.subscribe((value) => {
            setValue(value);
            !!callback && callback(value);
        });
        return () => {
            subscription.unsubscribe();
            value?.abort && value?.abort();
        };
    }, [subject]);
    return value;
};

export const hookFromSubject = (
    imports: { useEffect: any, useState: any },
    subject: BehaviorSubject<any> | Subject<any>
) => () => useSubject(imports, subject);

export const promiseToSubject = (
    promise: Promise<any>,
    subject: BehaviorSubject<any> | Subject<any>,
    options: PromiseToSubjectOptions = new PromiseToSubjectOptions(),
): Promise<any> => {
    subject.next(new PromiseSubjectState(null, true, null, promise ? promise['abort'] : null));
    promise.then(
        data => subject.next(new PromiseSubjectState(data)),
        error => {
            subject.next(new PromiseSubjectState(null, false, error));
            if (!options.suppressErrors) {
                options.errorHandler(error);
            }
        }
    );
    return promise;
};
