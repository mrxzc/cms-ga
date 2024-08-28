import { Button } from '@components/atoms/button'
import { IconFailed, IconSuccess } from '../Icon'

interface ModalsProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
  icon?: {
    name: string
    width: number
    height: number
  }
  action?: {
    label: string
    onClick: () => void
    className?: string
  }
}

export default function Modals({ isOpen, onClose, title, content, icon, action }: ModalsProps) {
  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <div className="flex flex-col items-center">
          {icon &&
            ((icon.name === 'Failed' &&
              IconFailed({
                height: icon.height,
                width: icon.width,
              })) ||
              (icon.name === 'Success' &&
                IconSuccess({
                  height: icon.height,
                  width: icon.width,
                })))}
          <p className="text-2xl font-semibold">{title}</p>
          <p className="text-sm">{content}</p>
        </div>

        {action && (
          <div className="modal-action">
            <Button
              className={action.className}
              onClick={() => {
                action.onClick()
                onClose()
              }}
            >
              {action.label}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
