import { runInAction } from 'mobx';
import { endpoints, request } from '../../../../utils/endpoints';
import ProgressStore, { SubjectRow } from './manager';

export const refresh = (progressStore: ProgressStore) => {
  console.log('Refreshing data...');
  progressStore.refresh.disabled = true;
  setTimeout(() => {
    progressStore.refresh.disabled = false;
  }, 3000);
};

export const getProgressOverview = async (progressStore: ProgressStore) => {
  const subjectRows = await request.get<SubjectRow[]>(endpoints.dashboard.progress);

  runInAction(() => {
    progressStore.selectedRow = null;
    progressStore.subjectRows = subjectRows;
    progressStore.title = 'Progress Overview';
  });
};
