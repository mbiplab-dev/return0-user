// PhoneFrame.tsx
import React from "react";

interface PhoneFrameProps {
  children: React.ReactNode;
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div
  className="
    w-[360px] 
    max-h-[700px] sm:h-[700px] md:h-[750px] lg:h-[800px] 
    bg-white rounded-[2.5rem] shadow-xl border-4 border-gray-300 
    relative overflow-hidden
  "
>
  <div className="h-full overflow-y-auto no-scrollbar">{children}</div>
</div>

    </div>
  );
};

export default PhoneFrame;
