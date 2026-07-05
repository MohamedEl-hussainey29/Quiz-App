import Image from "next/image";
import noDataImg from "../../../images/noData.avif";

interface NoDataProps {
  item?: string;
}

export default function NoData({ item = "Data" }: NoDataProps) {
  return (
    <div className="flex min-h-62.5 flex-col items-center justify-center px-6 py-8 text-center">
      <Image
        src={noDataImg}
        alt="No Data"
        className="w-35 max-w-[60%] object-contain"
      />

      <h2 className="mt-6 text-[clamp(20px,4vw,28px)] font-bold text-[#494949]">
        No {item}!
      </h2>

      <p className="mt-2 max-w-[320px] text-[clamp(14px,2vw,16px)] text-[rgba(73,73,73,0.6)]">
        There are no {item} to show here!
      </p>
    </div>
  );
}