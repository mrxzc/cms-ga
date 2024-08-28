export default function IconAlertButtonUpload({
  width = 16,
  height = 15,
  color = '#E0CF55',
  ...props
}: Readonly<React.SVGProps<SVGSVGElement>>) {
  return (
    <svg width={width} height={height} viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6.87411 1.57971L0.60653 12.0429C0.343574 12.4983 0.342004 13.059 0.602406 13.5159C0.862807 13.9727 1.34607 14.2571 1.87188 14.2629H14.407C14.9329 14.2571 15.4161 13.9727 15.6765 13.5159C15.9369 13.059 15.9353 12.4983 15.6724 12.0429L9.40482 1.57971C9.13653 1.13742 8.65677 0.86731 8.13946 0.86731C7.62216 0.86731 7.14239 1.13742 6.87411 1.57971Z"
        fill={color}
      />
    </svg>
  )
}
