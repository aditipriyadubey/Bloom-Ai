import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface BloomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

export default function BloomButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  type = 'button',
}: BloomButtonProps) {
  const variants = {
    primary: 'bg-leaf-dark text-white hover:bg-sage shadow-sm',
    secondary: 'bg-coral text-white hover:bg-coral/90 shadow-sm',
    outline: 'border-2 border-leaf-dark text-leaf-dark hover:bg-leaf-dark hover:text-white',
    ghost: 'text-leaf-dark hover:bg-pastel-green/10',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={cn(
        'font-semibold rounded-full transition-colors duration-200 inline-flex items-center justify-center gap-2',
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </motion.button>
  );
}
