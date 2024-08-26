import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function Title({
  title,
  className,
  onClick,
}: {
  title: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={cn(
        "w-fit text-4xl font-black text-white/0 bg-gradient-to-r from-white via-white to-secondary bg-clip-text",
        className
      )}
      onClick={onClick}
    >
      {title}
    </div>
  );
}

export default Title;
