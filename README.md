# react-rxjs-easy

## Init
- connect React hooks in index.js
```
connectReactHooks(useEffect, useState);
```
## Hook from Subject usage
- create Subject or BehavorSubject
```
export const counterSubject = new BehaviorSubject(0);
```
- create hook connected with this subject
```
export const useCounter = hookFromSubject(counterSubject);
```
- use this hook in functional component
```
const counter = useCounter();
```
- value is getting changed in functional component when subject is changed
```
counterSubject.next(counter + 1)
```
## Promise to Subject usage
- create subject and connected hook
```
export const responseSubject = new BehaviorSubject(new PromiseSubjectState());
export const useResponse = hookFromSubject(responseSubject);
```
- create function that creates promise and connects it with subject so subject get new value when promise is resolved or rejected
```
export const getResponseWithSuccess = () =>
  promiseToSubject(new Promise(resolve => resolve('success')), responseSubject);
```
- promise returned by XHR request can be used
```
export const getData = () =>
  promiseToSubject(fetch('/something'), responseSubject);
```
