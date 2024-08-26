import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError() as {
    message?: string;
    response: { status: number };
  };

  return (
    <div className="w-screen h-screen bg-red-700 flex flex-col items-center justify-center gap-5 ">
      <div className="text-7xl sm:text-8xl font-black">
        {error.response.status}😥
      </div>
      <div className="">{error?.message}</div>
    </div>
  );
}

export default ErrorPage;
