import { useParams } from 'react-router-dom';
import Content from './components/Content';
import ProgressStore, { ProgressContext } from './store/manager';

const Progress = () => {
  const { careerPlan } = useParams<{ careerPlan: string }>();
  const store = new ProgressStore(careerPlan);
  return (
    <ProgressContext.Provider value={store}>
      <Content />
    </ProgressContext.Provider>
  );
};

export default Progress;
