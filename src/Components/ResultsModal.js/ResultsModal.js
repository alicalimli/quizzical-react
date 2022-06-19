import { motion } from "framer-motion";

import Modal from "../Modal/Modal";

import "./ResultsModal.css";

const ResultsModal = ({
  setIsModalOpen,
  quizScore,
  categoryName,
  difficulty,
  questions,
  playAgainHandler,
}) => {
  return (
    <Modal setIsModalOpen={setIsModalOpen}>
      <motion.div
        animate={{ scale: 1 }}
        initial={{ scale: 0.8 }}
        transition={{ type: "spring", duration: 0.3 }}
        className="play-again-modal"
      >
        <button
          className="modal-back back-btn btn-hv btn-outline"
          onClick={() => setIsModalOpen(false)}
        >
          Back
        </button>
        <h2>
          {quizScore > 2 ? "Congratulations! 👏‍" : "Better luck next time! 🫂"}
        </h2>
        <p>{`You Scored ${quizScore} / ${questions.length} correct answers.`}</p>
        <p>Category: {categoryName}</p>
        <p>Difficulty: {difficulty}</p>
        <div className="modal-btns">
          <button className="btn btn-hv" onClick={playAgainHandler}>
            Play Again!
          </button>
          <a
            className="btn btn-hv twitter-share-button"
            href={`https://twitter.com/intent/tweet?text=I scored ${quizScore} out of ${questions.length} correct answers in the ${categoryName} category with ${difficulty} difficulty on Quizzical, Come and try it out: https://quizzical-ali.netlify.app/`}
            data-size="large"
          >
            Share on twitter
          </a>
        </div>
      </motion.div>
    </Modal>
  );
};

export default ResultsModal;
