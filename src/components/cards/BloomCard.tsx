import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface BloomCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  onClick?: () => void;
}

export default function BloomCard({ children, className, hover = true, delay = 0, onClick }: BloomCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      whileHover={hover ? { y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' } : undefined}
      onClick={onClick}
      className={cn(
        'bg-warm-white rounded-2xl shadow-card p-6 transition-all duration-300',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
