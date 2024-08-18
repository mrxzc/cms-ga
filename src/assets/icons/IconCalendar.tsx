export default function IconCalendar({
  width = 16,
  height = 18,
  color = '#0c0c0c',
  ...props
}: Readonly<React.SVGProps<SVGSVGElement>>) {
  return (
    <svg width={width} height={height} viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M10.75 8.75H7V12.5H10.75V8.75ZM10 0.5V2H4V0.5H2.5V2H0.2575L0.25 15.5H13.75V2H11.5V0.5H10ZM12.25 14H1.75V5.75H12.25V14Z"
        fill={color}
      />
    </svg>
  )
}
