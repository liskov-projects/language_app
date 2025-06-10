export default function Loader() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <svg
        viewBox="0 0 900 500"
        width="1200"
        height="200"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible">
        <path
          d="M0 222L21.5 203C43 184 86 146 128.8 124.7C171.7 103.3 214.3 98.7 257.2 115C300 131.3 343 168.7 385.8 175.7C428.7 182.7 471.3 159.3 514.2 159C557 158.7 600 181.3 642.8 183.7C685.7 186 728.3 168 771.2 162.7C814 157.3 857 164.7 878.5 168.3L900 172"
          fill="none"
          stroke="#ef8e00"
          strokeWidth="20"
          strokeLinecap="round"
          strokeLinejoin="miter"
          style={{
            strokeDasharray: 1500,
            strokeDashoffset: 1500,
            animation: "dashMove 2s linear infinite"
          }}
        />
      </svg>
      <svg
        viewBox="0 0 900 500"
        width="1200"
        height="200"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible">
        <path
          d="M0 222L21.5 203C43 184 86 146 128.8 124.7C171.7 103.3 214.3 98.7 257.2 115C300 131.3 343 168.7 385.8 175.7C428.7 182.7 471.3 159.3 514.2 159C557 158.7 600 181.3 642.8 183.7C685.7 186 728.3 168 771.2 162.7C814 157.3 857 164.7 878.5 168.3L900 172"
          fill="none"
          stroke="#ef8e00"
          strokeWidth="20"
          strokeLinecap="round"
          strokeLinejoin="miter"
          style={{
            strokeDasharray: 1500,
            strokeDashoffset: 1500,
            animation: "dashMove 2s linear infinite"
          }}
        />
      </svg>
      <svg
        viewBox="0 0 900 500"
        width="1200"
        height="200"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible">
        <path
          d="M0 222L21.5 203C43 184 86 146 128.8 124.7C171.7 103.3 214.3 98.7 257.2 115C300 131.3 343 168.7 385.8 175.7C428.7 182.7 471.3 159.3 514.2 159C557 158.7 600 181.3 642.8 183.7C685.7 186 728.3 168 771.2 162.7C814 157.3 857 164.7 878.5 168.3L900 172"
          fill="none"
          stroke="#ef8e00"
          strokeWidth="20"
          strokeLinecap="round"
          strokeLinejoin="miter"
          style={{
            strokeDasharray: 1500,
            strokeDashoffset: 1500,
            animation: "dashMove 2s linear infinite"
          }}
        />
      </svg>
      <style>{`
          @keyframes dashMove {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}</style>
    </div>
  );
}
