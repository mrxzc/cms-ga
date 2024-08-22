export default function IconPencil({
  width = 12,
  height = 13,
  color = '#0089CF',
  ...props
}: Readonly<React.SVGProps<SVGSVGElement>>) {
  return (
    <svg width={width} height={height} viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#clip0_2659_13408)">
        <path d="M7.302 3.34375L0 10.6453V12.5002H1.855L9.1565 5.19825L7.302 3.34375Z" fill="#0089CF" />
        <path
          d="M11.6157 0.884052C11.3697 0.638141 11.0361 0.5 10.6882 0.5C10.3404 0.5 10.0068 0.638141 9.76074 0.884052L8.01074 2.63655L9.86524 4.49105L11.6152 2.74105C11.7373 2.61923 11.8342 2.47452 11.9003 2.31522C11.9664 2.15591 12.0005 1.98513 12.0005 1.81266C12.0006 1.64018 11.9666 1.46938 11.9006 1.31004C11.8346 1.1507 11.7378 1.00594 11.6157 0.884052Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_2659_13408">
          <rect width={width} height={height} fill="white" transform="translate(0 0.5)" />
        </clipPath>
      </defs>
    </svg>
  )
}
