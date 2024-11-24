import { refresh } from './actions';
import { createContext, useContext } from 'react';
import { makeAutoObservable, runInAction } from 'mobx';
import { endpoints, request } from '../../../../utils/endpoints';

class ProgressStore {
  public title: string = '';
  public subjectRows: SubjectRow[] = [];
  public selectedRow: SubjectRow | null = null;

  constructor(careerPlan: string | undefined) {
    makeAutoObservable(this);

    if (careerPlan) this.getProgressOverview(careerPlan);
  }

  // ------- Esposed Properties ------

  get ContentComponent() {
    return {
      title: this.title,
    };
  }

  // ---------------------------- ACTIONS ----------------------------

  getProgressOverview = async (careerPlan: string) => {
    try {
      const params = new URLSearchParams();
      params.append('careerPlan', careerPlan);

      const subjectRows = await request.getWithParams<SubjectRow[]>(endpoints.dashboard.progress, params);

      runInAction(() => {
        this.selectedRow = null;
        this.subjectRows = subjectRows;
        this.title = `Progress Overview`;
      });
    } catch (error) {
      console.error('Error fetching progress overview:', error);
    }
  };

  refresh: RefreshAction = {
    visible: true,
    text: 'Refresh',
    disabled: false,
    tooltip: 'Refresh the data',
    onClick: () => refresh(this),
  };
}

export default ProgressStore;

// ---------------------------- CONTEXT ----------------------------

export const ProgressContext = createContext<ProgressStore | null>(null);

export function useProgressStore() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('Could not find <ProgressContext> in the tree. Wrap your component under it!');
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
