import ProgressStore from './manager';

export const refresh = (progressStore: ProgressStore) => {
  console.log('Refreshing data...');
  progressStore.refresh.disabled = true;
  setTimeout(() => {
    progressStore.refresh.disabled = false;
  }, 3000);
};
