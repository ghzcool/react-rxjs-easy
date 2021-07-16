let useEffectFn = () => {};
let useStateFn = () => {
    console.error('Please run connectReactHooks(useEffect, useState) first');
};

export function connectReactHooks(useEffect, useState) {
    useEffectFn = useEffect;
    useStateFn = useState;
}

export function PromiseSubjectState(data = null, loading = false, error = null) {
    this.data = data;
    this.loading = loading;
    this.error = error;
}

export function PromiseToSubjectOptions(suppressErrors = false, errorHandler = null) {
    this.suppressErrors = suppressErrors;
    this.errorHandler = errorHandler ? errorHandler : (error) => console.error(error);
}

const useSubject = (subject, callback = null) => {
    const [value, setValue] = useStateFn(subject.getValue ? subject.getValue() : null);
    useEffectFn(() => {
        const subscription = subject.subscribe((value) => {
            setValue(value);
            !!callback && callback(value);
        });
        return () => subscription.unsubscribe();
    }, [subject]);
    return value;
};

export const hookFromSubject = (subject) => () => useSubject(subject);

export const promiseToSubject = (promise, subject, options = new PromiseToSubjectOptions()) => {
    subject.next(new PromiseSubjectState(null, true));
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
