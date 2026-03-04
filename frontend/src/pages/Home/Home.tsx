import GradientDivider from '../../features/landing/components/GradientDivider';
import { CountUpStats } from '../../layouts/PublicLayout/components/CountUpStats';
import { DarkGridHero } from '../../layouts/PublicLayout/components/DarkGridHero';
import ShuffleCards from '../../layouts/PublicLayout/components/ShuffleCards';
import PublicLayout from '../../layouts/PublicLayout/PublicLayout';

const Home = () => {
  return (
    <>
      <PublicLayout>
        <DarkGridHero />
        <CountUpStats />
        <GradientDivider />
        <ShuffleCards />
      </PublicLayout>
    </>
  );
};

export default Home;
