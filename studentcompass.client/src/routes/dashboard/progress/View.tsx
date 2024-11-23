import Content from './components/Content';
import ProgressStore, { ProgressContext } from './store/manager';

const Progress = () => {
  const store = new ProgressStore();
  return (
    <ProgressContext.Provider value={store}>
      <Content />
    </ProgressContext.Provider>
  );
};

export default Progress;
