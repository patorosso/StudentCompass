import { makeAutoObservable } from 'mobx';
import { createContext, useContext } from 'react';
import { refresh, getProgressOverview } from './actions';

class ProgressStore {
  private _title: string;
  private _subjectRows: SubjectRow[];
  private _selectedRow: SubjectRow | null;

  constructor() {
    makeAutoObservable(this);

    getProgressOverview(this);
  }

  // ------- Esposed Properties ------

  get ContentComponent() {
    return {
      title: this._title,
    };
  }

  get subjects() {
    return this._subjectRows;
  }

  set title(value: string) {
    this._title = value;
  }

  set subjectRows(value: SubjectRow[]) {
    this._subjectRows = value;
  }

  set selectedRow(value: SubjectRow | null) {
    this._selectedRow = value;
  }

  // ---------------------------- ACTIONS ----------------------------

  refresh: RefreshAction = {
    visible: true,
    text: 'Refresh',
    disabled: false,
    tooltip: 'Refresh the data',
    onClick: () => refresh(this),
  };
}

export default ProgressStore;

export const ProgressContext = createContext<ProgressStore | null>(null);

export function useProgressStore() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('No se encontró ProgressContext.');
  }
  return context;
}

// ---------------------------- TYPES ----------------------------

export type SubjectRow = {
  code: number;
  status: string;
  courseId: number;
  isAnnual: boolean;
  yearLevel: number;
  finalGrade: number;
  description: string;
  isElective: boolean;
  isOptional: boolean;
  weeklyHours: number;
};

export type RefreshAction = {
  text: string;
  tooltip: string;
  visible: boolean;
  disabled: boolean;
  onClick: () => void;
};
