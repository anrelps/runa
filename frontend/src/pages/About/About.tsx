import { Example } from '../../features/about/components/BlockInTextCard';
import { RevealBento } from '../../features/about/components/RevealBento';
import PublicLayout from '../../layouts/PublicLayout/PublicLayout';

const About = () => {
  return (
    <PublicLayout>
      <RevealBento />
      <Example />
    </PublicLayout>
  );
};

export default About;
