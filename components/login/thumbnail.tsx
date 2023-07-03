import {
  GREY_3,
  LOGIN_DELAY_INTERVAL,
  LOGIN_INITIAL_DELAY,
  PRIMARY_GREEN,
} from "@/constants";
import { motion } from "framer-motion";
import Book from "../icon/book";

const BlockerWithMotion = ({
  delay = LOGIN_INITIAL_DELAY,
}: {
  delay?: number;
}) => {
  return (
    <motion.div
      className="absolute w-full h-full bg-soft-white z-10 right-0"
      animate={{
        scaleX: [1, 0],
        originX: [1, 1],
      }}
      transition={{ duration: 1, delay: delay }}
    />
  );
};
const TextWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute w-64 h-16 text-lg font-semibold">{children}</div>
  );
};
const LetterWithMotion = ({
  text,
  delay = LOGIN_INITIAL_DELAY,
}: {
  text: string;
  delay?: number;
}) => {
  return (
    <motion.span
      animate={{ color: [GREY_3, PRIMARY_GREEN] }}
      transition={{ duration: 1, delay: delay }}
    >
      {text}
    </motion.span>
  );
};

export default function Thumbnail() {
  return (
    <>
      <div className="w-fit mb-6">
        <div className="text-5xl font-bold text-grey-3 flex items-center">
          <LetterWithMotion text="공" />
          <LetterWithMotion
            text="책"
            delay={LOGIN_INITIAL_DELAY + LOGIN_DELAY_INTERVAL}
          />
          <motion.div
            animate={{ opacity: [0, 1] }}
            transition={{
              duration: 1,
              delay: LOGIN_INITIAL_DELAY + 2 * LOGIN_DELAY_INTERVAL,
            }}
          >
            <Book width={3} color={PRIMARY_GREEN} strokeWidth={2.5} />
          </motion.div>
        </div>
        <motion.div
          className="h-1.5 mt-1 bg-primary-green"
          animate={{ scaleX: [0, 1], originX: 0 }}
          transition={{
            duration: 1,
            delay: LOGIN_INITIAL_DELAY + 2 * LOGIN_DELAY_INTERVAL,
          }}
        />
      </div>
      <div className="relative w-36 h-7 ml-4">
        <BlockerWithMotion />
        <TextWrapper>
          <span className="font-bold text-primary-green">공</span>유하며
          길러보는
        </TextWrapper>
      </div>
      <div className="relative w-36 h-7 ml-4">
        <BlockerWithMotion delay={LOGIN_INITIAL_DELAY + LOGIN_DELAY_INTERVAL} />
        <TextWrapper>
          <span className="font-bold text-primary-green">책</span> 읽기 습관
        </TextWrapper>
      </div>
    </>
  );
}
