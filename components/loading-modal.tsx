import { motion, AnimatePresence } from "framer-motion";
import Spinner from "./icon/spinner";

interface IProps {
  isLoading: boolean;
}

const LoadingModal = ({ isLoading }: IProps) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute w-full h-screen bg-[#00000080] z-10 flex items-center justify-center"
        >
          <div className="-translate-y-1/2 p-6 bg-soft-white rounded-lg border-primary-green border-2">
            <Spinner />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default LoadingModal;
