export default function IconChevronBottom({
  width = 16,
  height = 16,
  color = '#252525',
  ...props
}: Readonly<React.SVGProps<SVGSVGElement>>) {
  return (
    <svg width={width} height={height} fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7.99965 10.3333C7.82458 10.3336 7.65117 10.2993 7.4894 10.2324C7.32762 10.1655 7.18067 10.0672 7.05699 9.94331L3.52832 6.41398L4.47099 5.47131L7.99965 8.99998L11.5283 5.47131L12.471 6.41398L8.94232 9.94265C8.81869 10.0667 8.67176 10.165 8.50999 10.2321C8.34821 10.2991 8.17477 10.3335 7.99965 10.3333Z"
        fill={color}
      />
    </svg>
  )
}
