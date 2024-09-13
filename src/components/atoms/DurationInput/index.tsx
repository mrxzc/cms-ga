import React, { useRef, useCallback, useState, useEffect } from 'react'
import { Control, Controller, useFormContext } from 'react-hook-form'

interface DurationInputProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  control: Control<any>
}

interface DurationValue {
  days: number
  hours: number
  minutes: number
}

const DurationInput: React.FC<DurationInputProps> = ({ name, control, ...props }) => {
  const {
    formState: { errors },
  } = useFormContext()

  const daysRef = useRef<HTMLInputElement>(null)
  const hoursRef = useRef<HTMLInputElement>(null)
  const minutesRef = useRef<HTMLInputElement>(null)

  const [lastTyped, setLastTyped] = useState<keyof DurationValue | null>(null)

  const handleInputChange = useCallback(
    (
      field: { onChange: (value: DurationValue) => void; value: DurationValue },
      key: keyof DurationValue,
      max?: number
    ) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value
        let newValue = inputValue === '' ? 0 : parseInt(inputValue, 10)

        if (isNaN(newValue)) {
          newValue = 0
        }

        if (max !== undefined) {
          newValue = Math.min(max, Math.max(0, newValue))
        } else {
          newValue = Math.max(0, newValue)
        }

        field.onChange({ ...field.value, [key]: newValue })
        setLastTyped(key)
      },
    []
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      if (lastTyped === 'days' && hoursRef.current) {
        hoursRef.current.focus()
      } else if (lastTyped === 'hours' && minutesRef.current) {
        minutesRef.current.focus()
      }
      setLastTyped(null)
    }, 500)

    return () => clearTimeout(timer)
  }, [lastTyped])

  return (
    <div {...props}>
      <Controller
        name={name}
        control={control}
        defaultValue={{ days: 0, hours: 0, minutes: 0 }}
        render={({ field }) => (
          <>
            <div className="flex flex-row gap-1">
              {/* Input untuk Days */}
              <div className="flex flex-row mr-2 items-center">
                <input
                  type="number"
                  id={`${name}-days`}
                  className="border-l border-t border-b rounded-l h-[40px] pl-2 w-[145px]"
                  value={field.value.days || ''}
                  onChange={handleInputChange(field, 'days')}
                  onBlur={field.onBlur}
                  ref={daysRef}
                />
                <p className="border-r border-t border-b border-l rounded-r bg-[#f6f8fa] h-[40px] px-2 items-center flex">
                  Day
                </p>
              </div>

              {/* Input untuk Hours */}
              <div className="flex flex-row mr-2 items-center">
                <input
                  type="number"
                  id={`${name}-hours`}
                  className="border-l border-t border-b rounded-l h-[40px] pl-2 w-[145px]"
                  value={field.value.hours || ''}
                  onChange={handleInputChange(field, 'hours', 23)}
                  onBlur={field.onBlur}
                  ref={hoursRef}
                />
                <p className="border-r border-t border-b rounded-r border-l bg-[#f6f8fa] h-[40px] px-2 items-center flex">
                  Hour
                </p>
              </div>

              {/* Input untuk Minutes */}
              <div className="flex flex-row mr-2 items-center">
                <input
                  type="number"
                  id={`${name}-minutes`}
                  className="border-l border-t border-b rounded-l h-[40px] pl-2 w-[145px]"
                  value={field.value.minutes || ''}
                  onChange={handleInputChange(field, 'minutes', 59)}
                  onBlur={field.onBlur}
                  ref={minutesRef}
                />
                <p className="border-r border-t border-b border-l rounded-r bg-[#f6f8fa] h-[40px] px-2 items-center flex">
                  Minute
                </p>
              </div>
            </div>
            {/* Menampilkan pesan error jika ada */}
            {errors[name] && <p className="text-red-500 text-sm mt-1">{String(errors[name]?.message)}</p>}
          </>
        )}
      />
    </div>
  )
}

export default DurationInput
