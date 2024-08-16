export default function IconPlus({
  width = 16,
  height = 16,
  color = '#0089CF',
  ...props
}: Readonly<React.SVGProps<SVGSVGElement>>) {
  return (
    <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.00001 3C9.00001 2.44772 8.55229 2 8.00001 2C7.44772 2 7.00001 2.44772 7.00001 3V7.00002H3C2.44772 7.00002 2 7.44773 2 8.00002C2 8.5523 2.44772 9.00002 3 9.00002H7.00001V13C7.00001 13.5523 7.44772 14 8.00001 14C8.55229 14 9.00001 13.5523 9.00001 13V9.00002H13C13.5523 9.00002 14 8.5523 14 8.00002C14 7.44773 13.5523 7.00002 13 7.00002H9.00001V3Z"
        fill={color}
      />
    </svg>
  )
}
