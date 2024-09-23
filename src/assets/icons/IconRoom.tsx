export default function IconRoom({
  width = 45,
  height = 45,
  color = 'white',
  enableBackground = '#235696',
  ...props
}: Readonly<React.SVGProps<SVGSVGElement>>) {
  return (
    //tes
    <svg width={width} height={height} viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="0.5" y="0.5" width="44" height="44" rx="5.5" fill={enableBackground.toString()} />
      <rect x="0.5" y="0.5" width="44" height="44" rx="5.5" stroke="#F7F7F7" />
      <path
        d="M32.6667 32.3333H31.3333V13.6667C31.3333 12.9333 30.7333 12.3333 30 12.3333H24.6667C24.6667 11.6 24.0667 11 23.3333 11H14C13.2667 11 12.6667 11.6 12.6667 12.3333V32.3333H11.3333C10.6 32.3333 10 32.9333 10 33.6667C10 34.4 10.6 35 11.3333 35H23.3333C24.0667 35 24.6667 34.4 24.6667 33.6667V15H28.6667V33.6667C28.6667 34.4 29.2667 35 30 35H32.6667C33.4 35 34 34.4 34 33.6667C34 32.9333 33.4 32.3333 32.6667 32.3333ZM20.6667 24.3333C19.9333 24.3333 19.3333 23.7333 19.3333 23C19.3333 22.2667 19.9333 21.6667 20.6667 21.6667C21.4 21.6667 22 22.2667 22 23C22 23.7333 21.4 24.3333 20.6667 24.3333Z"
        fill={color.toString()}
      />
    </svg>
  )
}
