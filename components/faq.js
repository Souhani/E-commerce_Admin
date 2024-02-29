import { useState } from "react";
import { HiMinus, HiPlus } from 'react-icons/hi';
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import Spinner from "./Spinner";

export default function Faq(props) {
  const [questions, setQuestions] = useState(props.data[0].faq);
  const [isLoading, setIsLoading] = useState(false);
  const toggleQuestion = (questionId) => {
    setQuestions((prev) => prev.map((q) => (q._id === questionId) ? {...q, active: !q.active} : q))
};

async function saveFaq() {
  setIsLoading(true)
    await axios.put("/api/faq", {faq:questions, _id:props.data[0]._id});
    setIsLoading(false)
}

const addFAQ = () => {
  setQuestions((prev) => {
     const newQuestions = [...prev, {
      question:"",
      answer:""
    }];
    return newQuestions;
  })
};
function removeFAQ(indexToRemove) {
  setQuestions((prev) => {
    const newQuestion = [...prev];
    newQuestion.splice(indexToRemove, 1);
    return newQuestion;
  });
}


const handleQuestionChange = (index, value) => {
   setQuestions((prev) => {
    const newQuestion = [...prev];
     newQuestion[index].question = value;
     return newQuestion;
   })
};

const handleAnswerChange = (index, value) => {
  setQuestions((prev) => {
   const newQuestion = [...prev];
    newQuestion[index].answer = value;
    return newQuestion;
  })
}
  return (
    <div className='w-full'>
        <div className=''>
           <dl className='space-y-8'>
          
              {questions.map((q, index) => (
                 <div
                      key={q._id}
                      className={
                        `${
                            q._id !== questions[0]?._id && "border-t"
                        } border-primary pt-6 cursor-pointer font-Poppins`
                      }>
                    <dt className='text-lg'>
                        <div className='flex items-start text-blue-950 font-semibold justify-between w-full text-left focus:outline-none'>
                              <input value={q.question} className={` border-none bg-[unset] placeholder-[#0000006c]`}  placeholder="Question here" onChange={(e) => handleQuestionChange(index, e.target.value)} />
                                 <span className="ml-6 cursor-pointer text-primary" onClick={(e) => {toggleQuestion(q._id)}}>
                                   {q.active ? (
                                    <HiMinus className="h-6 w-6" />
                                   ) : (
                                    <HiPlus className="h-6 w-6" />
                                   )}
                                 </span>
                                 <div className="mx-6 cursor-pointer text-primary" onClick={() => removeFAQ(index)}>
                                   <AiOutlineDelete className="h-6 w-6"/>
                                 </div>
                        </div>
                    </dt>
                    {!q.active && (
                        <dd className="mt-2 pr-12 text-blue-950 ">
                           <input value={q.answer} className={` border-none ml-7 bg-[unset] placeholder-[#00000065]`} placeholder="Answer here"  onChange={(e) => handleAnswerChange(index, e.target.value)} />
                        </dd>
                    )}
                 </div>
              ))}
           </dl>
           <div className="my-8">
           <button
          className="btn-default w-[180px] text-sm mb-2"
          type="button"
          onClick={addFAQ}
        >
          Add new FAQ
        </button>
           </div>
        </div>
        {
          isLoading ? <div className=""> <Spinner /></div> : <button className="btn-primary" onClick={saveFaq}>
          Save
        </button>
        }
    </div>
  )
}
