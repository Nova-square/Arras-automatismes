import { motion } from 'framer-motion';
import { spinnerVariants } from '../utils/animations';

export default function LoadingSpinner() {
  return (
    <motion.div
      className="w-8 h-8 border-4 border-[#ff6600] border-t-transparent rounded-full"
      variants={spinnerVariants}
      animate="animate"
    />
  );
}