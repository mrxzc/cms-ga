export default function IconUserManagement({
  width = 19,
  height = 14,
  color = '#235696',
  ...props
}: Readonly<React.SVGProps<SVGSVGElement>>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 19 14" fill="none" {...props}>
      <path
        d="M10.4531 1.83571C10.4531 1.80938 10.4641 1.77591 10.4972 1.74513C10.5316 1.7132 10.5857 1.68945 10.6491 1.68945H18.3048C18.3682 1.68945 18.4223 1.7132 18.4567 1.74513C18.4898 1.77591 18.5007 1.80938 18.5007 1.83571C18.5007 1.86204 18.4898 1.89551 18.4567 1.92629C18.4223 1.95823 18.3682 1.98197 18.3048 1.98197H10.6491C10.5857 1.98197 10.5316 1.95823 10.4972 1.92629C10.4641 1.89551 10.4531 1.86204 10.4531 1.83571ZM10.6491 5.567H18.3048C18.3682 5.567 18.4223 5.59075 18.4567 5.62269C18.4898 5.65346 18.5007 5.68693 18.5007 5.71326C18.5007 5.73959 18.4898 5.77306 18.4567 5.80384C18.4223 5.83578 18.3682 5.85952 18.3048 5.85952H10.6491C10.5857 5.85952 10.5316 5.83578 10.4972 5.80384C10.4641 5.77307 10.4531 5.73959 10.4531 5.71326C10.4531 5.68693 10.4641 5.65346 10.4972 5.62269C10.5316 5.59075 10.5857 5.567 10.6491 5.567ZM12.737 9.44456H18.3048C18.3682 9.44456 18.4223 9.4683 18.4567 9.50024C18.4898 9.53101 18.5007 9.56448 18.5007 9.59081C18.5007 9.61714 18.4898 9.65062 18.4567 9.68139C18.4223 9.71333 18.3682 9.73707 18.3048 9.73707H12.737C12.6736 9.73707 12.6195 9.71333 12.5851 9.68139C12.552 9.65062 12.541 9.61715 12.541 9.59081C12.541 9.56448 12.552 9.53101 12.5851 9.50024C12.6195 9.4683 12.6736 9.44456 12.737 9.44456Z"
        fill="black"
        stroke={color}
      />
      <path
        d="M0.65 12.5714C0.65 9.8534 2.8534 7.65 5.57143 7.65C8.28946 7.65 10.4929 9.8534 10.4929 12.5714V13.2071H0.65V12.5714Z"
        stroke={color}
        strokeWidth="1.3"
      />
      <path
        d="M8.77913 3.99972C8.77913 5.77098 7.34324 7.20686 5.57199 7.20686C3.80073 7.20686 2.36484 5.77098 2.36484 3.99972C2.36484 2.22846 3.80073 0.792578 5.57199 0.792578C7.34324 0.792578 8.77913 2.22846 8.77913 3.99972Z"
        fill="white"
        stroke={color}
        strokeWidth="1.3"
      />
    </svg>
  )
}
