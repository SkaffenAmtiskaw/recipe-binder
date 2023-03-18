import { ArrowLeftIcon, Button } from 'evergreen-ui';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (<Button iconBefore={ArrowLeftIcon} onClick={() => navigate(-1)}>Back</Button>);
};

export default BackButton;