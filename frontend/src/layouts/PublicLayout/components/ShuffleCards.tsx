import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import anaImg from '../../../assets/images/landing/ana.jpg';
import carlosImg from '../../../assets/images/landing/carlos.jpg';
import mariaImg from '../../../assets/images/landing/maria.jpg';

type ListOrderItem = 'front' | 'middle' | 'back';

const ShuffleCards = () => {
  const { t } = useTranslation();
  const [order, setOrder] = useState<ListOrderItem[]>(['front', 'middle', 'back']);

  const handleShuffle = () => {
    const orderCopy = [...order];
    orderCopy.unshift(orderCopy.pop() as ListOrderItem);
    setOrder(orderCopy);
  };

  return (
    <div
      className='grid place-content-center overflow-hidden px-8 py-24'
      style={{
        backgroundColor: 'var(--color-background-primary)',
        color: 'var(--color-text-primary)',
      }}
    >
      <div className='relative -ml-25 h-112.5 w-87.5 md:-ml-43.75'>
        <Card
          imgUrl={anaImg}
          testimonial={t('landing.testimonials.ana')}
          author={t('landing.testimonials.anaAuthor')}
          handleShuffle={handleShuffle}
          position={order[0]}
        />
        <Card
          imgUrl={carlosImg}
          testimonial={t('landing.testimonials.carlos')}
          author={t('landing.testimonials.carlosAuthor')}
          handleShuffle={handleShuffle}
          position={order[1]}
        />
        <Card
          imgUrl={mariaImg}
          testimonial={t('landing.testimonials.maria')}
          author={t('landing.testimonials.mariaAuthor')}
          handleShuffle={handleShuffle}
          position={order[2]}
        />
      </div>
    </div>
  );
};

interface CardProps {
  handleShuffle: Function;
  testimonial: string;
  position: ListOrderItem;
  imgUrl: string;
  author: string;
}

const Card = ({ handleShuffle, testimonial, position, imgUrl, author }: CardProps) => {
  const mousePosRef = useRef(0);

  const onDragStart = (e: MouseEvent) => { mousePosRef.current = e.clientX; };

  const onDragEnd = (e: MouseEvent) => {
    const diff = mousePosRef.current - e.clientX;
    if (diff > 150) handleShuffle();
    mousePosRef.current = 0;
  };

  const x = position === 'front' ? '0%' : position === 'middle' ? '33%' : '66%';
  const rotateZ = position === 'front' ? '-6deg' : position === 'middle' ? '0deg' : '6deg';
  const zIndex = position === 'front' ? '2' : position === 'middle' ? '1' : '0';
  const draggable = position === 'front';

  return (
    <motion.div
      style={{
        zIndex,
        borderColor: 'rgba(32, 224, 150, 0.2)',
        backgroundColor: 'rgba(20, 31, 31, 0.5)',
      }}
      animate={{ rotate: rotateZ, x }}
      drag
      dragElastic={0.35}
      dragListener={draggable}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      transition={{ duration: 0.35 }}
      className={`absolute left-0 top-0 grid h-112.5 w-87.5 select-none place-content-center space-y-6 rounded-2xl border-2 p-6 shadow-xl backdrop-blur-md ${
        draggable ? 'cursor-grab active:cursor-grabbing' : ''
      }`}
    >
      <img
        src={imgUrl}
        alt={`Image of ${author}`}
        className='pointer-events-none mx-auto h-32 w-32 rounded-full border-2 object-cover'
        style={{
          borderColor: 'rgba(32, 224, 150, 0.3)',
          backgroundColor: 'var(--color-background-card)',
        }}
      />
      <span
        className='text-center text-lg italic'
        style={{ color: 'var(--color-text-secondary)' }}
      >
        "{testimonial}"
      </span>
      <span
        className='text-center text-sm font-medium'
        style={{ color: 'var(--color-primary)' }}
      >
        {author}
      </span>
    </motion.div>
  );
};

export default ShuffleCards;
