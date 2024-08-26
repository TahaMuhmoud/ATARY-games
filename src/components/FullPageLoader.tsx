import { RiseLoader } from "react-spinners";

function FullPageLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <RiseLoader color="white" />
    </div>
  );
}

export default FullPageLoader;
