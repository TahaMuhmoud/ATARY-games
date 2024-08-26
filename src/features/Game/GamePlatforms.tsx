import { useState } from "react";
import Title from "../../components/Title";
import { Platform, RequirementsEnum } from "../../types/types";

const GamePlatforms = ({
  gamePlatforms,
}: {
  gamePlatforms: {
    platform: Platform;
    released_at: string | null;
    requirements: { minimum: string; recommended: string } | null;
  }[];
}) => {
  const [showRequirements, setShowRequirements] = useState<{
    index: number;
    isShow: boolean;
    type: RequirementsEnum;
  }>({
    index: 0,
    isShow: true,
    type: RequirementsEnum.recommended,
  });

  return (
    <div className="grid gap-5">
      <Title title="Platforms" />
      <div className="grid gap-3">
        {gamePlatforms?.map((platform, index: number) => (
          <div
            key={platform.platform.id}
            className="border-b-[1px] border-third md:px-4 py-2"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-2xl font-black">
                <div
                  className="w-7"
                  dangerouslySetInnerHTML={{
                    __html: platform.platform.logo || "",
                  }}
                ></div>
                <span>{platform.platform.name}</span>
              </div>
              <div className="flex justify-center gap-5">
                {platform.requirements?.minimum && (
                  <button
                    type="button"
                    title="requirements"
                    className={`underline ${
                      showRequirements.isShow &&
                      showRequirements.type === RequirementsEnum.minimum
                        ? "text-white"
                        : "text-white/50"
                    }`}
                    onClick={() => {
                      setShowRequirements({
                        index,
                        isShow: true,
                        type: RequirementsEnum.minimum,
                      });
                    }}
                  >
                    requirements?
                  </button>
                )}
                {platform.requirements?.recommended && (
                  <button
                    type="button"
                    title="recommended"
                    className={`underline ${
                      showRequirements.isShow &&
                      showRequirements.type === RequirementsEnum.recommended
                        ? "text-white"
                        : "text-white/50"
                    }`}
                    onClick={() => {
                      setShowRequirements({
                        index,
                        isShow: true,
                        type: RequirementsEnum.recommended,
                      });
                    }}
                  >
                    recommended requirements?
                  </button>
                )}
              </div>
            </div>
            {platform.requirements &&
              Object.keys(platform.requirements).length > 0 &&
              index === showRequirements.index && (
                <div className="lg:text-xl">
                  {platform.requirements[`${showRequirements.type}`]}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamePlatforms;
