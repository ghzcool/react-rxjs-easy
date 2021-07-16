import { hookFromSubject, PromiseSubjectState, promiseToSubject } from "react-rxjs-easy";
import { BehaviorSubject } from "rxjs";

export const counterSubject = new BehaviorSubject(0);
export const useCounter = hookFromSubject(counterSubject);

export const responseSubject = new BehaviorSubject(new PromiseSubjectState());
export const useResponse = hookFromSubject(responseSubject);

export const getResponseWithSuccess = () =>
  promiseToSubject(new Promise(resolve => resolve('success')), responseSubject);

export const getResponseWithFailure = () =>
  promiseToSubject(new Promise((resolve, reject) => reject('failure')), responseSubject);

export const getResponseWithFailureWithHandler = () =>
  promiseToSubject(new Promise((resolve, reject) => reject('failure')), responseSubject, {
    errorHandler: (error) => alert(error)
  });
