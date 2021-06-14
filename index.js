import {BehaviorSubject, Subject} from "rxjs";

export function PromiseSubjectState(data = null, loading = false, error = null) {
    this.data = data;
    this.loading = loading;
    this.error = error;
}

export function PromiseToSubjectOptions(suppressErrors = false, errorHandler = null) {
    this.suppressErrors = suppressErrors;
    this.errorHandler = errorHandler ? errorHandler : (error) => console.error(error);
}

const useSubject = (imports, subject, callback = null) => {
    const [value, setValue] = imports.useState(subject.getValue ? subject.getValue() : null);
    imports.useEffect(() => {
        const subscription = subject.subscribe((value) => {
            setValue(value);
            !!callback && callback(value);
        });
        return () => subscription.unsubscribe();
    }, [subject]);
    return value;
};

export const hookFromSubject = (imports, subject) => () => useSubject(imports, subject);

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
