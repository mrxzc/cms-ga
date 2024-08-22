export default function IconTrash({
  width = 12,
  height = 13,
  color = '#FF4040',
  ...props
}: Readonly<React.SVGProps<SVGSVGElement>>) {
  return (
    <svg width={width} height={height} viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#clip0_2659_13410)">
        <path
          d="M8.5 2.5V1.5C8.5 1.23478 8.39464 0.98043 8.20711 0.792893C8.01957 0.605357 7.76522 0.5 7.5 0.5H4.5C4.23478 0.5 3.98043 0.605357 3.79289 0.792893C3.60536 0.98043 3.5 1.23478 3.5 1.5V2.5H1V3.5H2V11C2 11.3978 2.15804 11.7794 2.43934 12.0607C2.72064 12.342 3.10218 12.5 3.5 12.5H8.5C8.89782 12.5 9.27936 12.342 9.56066 12.0607C9.84196 11.7794 10 11.3978 10 11V3.5H11V2.5H8.5ZM5.5 9H4.5V6H5.5V9ZM7.5 9H6.5V6H7.5V9ZM7.5 2.5H4.5V1.5H7.5V2.5Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_2659_13410">
          <rect width={width} height={height} fill="white" transform="translate(0 0.5)" />
        </clipPath>
      </defs>
    </svg>
  )
}
