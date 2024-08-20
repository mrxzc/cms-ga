export default function IconMasterData({ width = 18, height = 18, ...props }: Readonly<React.SVGProps<SVGSVGElement>>) {
  return (
    <svg width={width} height={height} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M16.5 4.125V14.25C16.5 15.4927 13.1422 16.5 9 16.5C4.85775 16.5 1.5 15.4927 1.5 14.25V4.125"
        stroke="black"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 10.875C16.5 12.1177 13.1422 13.125 9 13.125C4.85775 13.125 1.5 12.1177 1.5 10.875M16.5 7.5C16.5 8.74275 13.1422 9.75 9 9.75C4.85775 9.75 1.5 8.74275 1.5 7.5"
        stroke="black"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 6C13.1421 6 16.5 4.99264 16.5 3.75C16.5 2.50736 13.1421 1.5 9 1.5C4.85786 1.5 1.5 2.50736 1.5 3.75C1.5 4.99264 4.85786 6 9 6Z"
        stroke="black"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
