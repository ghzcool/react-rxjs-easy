import { useEffect, useState } from "react";
import { hookFromSubject, PromiseSubjectState, promiseToSubject } from "react-rxjs-hooks";
import { BehaviorSubject } from "rxjs";

export const counterSubject = new BehaviorSubject(0);
export const useCounter = hookFromSubject({ useState, useEffect }, counterSubject);

export const responseSubject = new BehaviorSubject(new PromiseSubjectState());
export const useResponse = hookFromSubject({ useState, useEffect }, responseSubject);

export const getResponseWithSuccess = () =>
  promiseToSubject(new Promise(resolve => resolve('success')), responseSubject);

export const getResponseWithFailure = () =>
  promiseToSubject(new Promise((resolve, reject) => reject('failure')), responseSubject);

export const getResponseWithFailureWithHandler = () =>
  promiseToSubject(new Promise((resolve, reject) => reject('failure')), responseSubject, {
    errorHandler: (error) => alert(error)
  });
