import {
  counterSubject,
  getResponseWithFailure,
  getResponseWithFailureWithHandler,
  getResponseWithSuccess,
  useCounter,
  useResponse
} from "./hooks";

export const TestComponent = () => {

  const counter = useCounter();
  const response = useResponse();

  return (<>

    <div>
      <h2>Subject hook test</h2>
      Counter: {counter}
      <button onClick={() => counterSubject.next(counter + 1)}>Plus</button>
    </div>

    <div>
      <h2>Promise to subject hook test</h2>
      Response:
      <pre>{JSON.stringify(response, null, 2)}</pre>
      <button onClick={() => getResponseWithSuccess()}>Response with success</button>
      <button onClick={() => getResponseWithFailure()}>Response with failure</button>
      <button onClick={() => getResponseWithFailureWithHandler()}>Response with failure and error handler</button>
    </div>

  </>);
};
