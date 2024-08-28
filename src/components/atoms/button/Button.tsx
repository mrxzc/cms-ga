import { joinClass } from '@utils/common'
interface Props extends React.ComponentPropsWithRef<'button'> {
  color?: 'primary' | 'error' | 'warning' | 'secondary' | 'info'
  children?: React.ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg'
  loader?: boolean
  textColor?: string
}

const Button: React.FC<Props> = ({ children, className, color, size, loader, textColor = 'text-white', ...props }) => {
  return (
    <button
      className={joinClass(
        `btn px-4 py-1 rounded-lg disabled:bg-gray-100 disabled:text-gray-300 ${textColor}`,
        color ? `btn-${color}` : 'btn-primary',
        size ? `btn-${size}` : 'btn-sm',
        className
      )}
      {...props}
      disabled={props.disabled || loader}
    >
      {loader ? (
        <>
          <span className="loading loading-spinner"></span> Loading
        </>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
