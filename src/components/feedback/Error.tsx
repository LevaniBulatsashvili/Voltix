import { useNavigate } from "react-router-dom";
import { PAGE } from "../../pages/pageConfig";
import { useEffect } from "react";

interface IError {
  message: string;
}

const Error = ({ message }: IError) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (message.includes("404")) navigate(PAGE.NOT_FOUND);
  }, [message, navigate]);

  return (
    <div className="flex flex-col bg-red-100 text-red-700 rounded-2xl h-full w-full justify-center items-center text-center">
      <div className="mb-6 font-medium text-3xl max-w-md">{message}</div>
      <button>Home</button>
    </div>
  );
};

export default Error;
