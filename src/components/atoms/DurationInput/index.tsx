import React from 'react'
import { Control, Controller, useFormContext } from 'react-hook-form'

interface DurationInputProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  control: Control<any>
}

const DurationInput: React.FC<DurationInputProps> = ({ name, control, ...props }) => {
  const {
    formState: { errors },
  } = useFormContext()

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
                  {...field}
                  value={field.value.days}
                  onChange={e => {
                    const newValue = parseInt(e.target.value) || 0
                    // Memastikan nilai tidak minus
                    const finalValue = Math.max(0, newValue)
                    field.onChange({ ...field.value, days: finalValue })
                  }}
                  onBlur={field.onBlur}
                  ref={field.ref}
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
                  {...field}
                  value={field.value.hours}
                  onChange={e => {
                    const newValue = parseInt(e.target.value) || 0
                    const finalValue = Math.max(0, newValue)
                    field.onChange({ ...field.value, hours: finalValue })
                  }}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  max={23}
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
                  {...field}
                  value={field.value.minutes}
                  onChange={e => {
                    const newValue = parseInt(e.target.value) || 0
                    const finalValue = Math.max(0, newValue)
                    field.onChange({ ...field.value, minutes: finalValue })
                  }}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  max={59}
                />
                <p className="border-r border-t border-b border-l rounded-r bg-[#f6f8fa] h-[40px] px-2 items-center flex">
                  Minute
                </p>
              </div>
            </div>
            {/* Menampilkan pesan error jika ada */}
            {errors[name] && (
              <p className="text-red-500 text-sm mt-1">{String(errors[name]?.message)}</p> // Melakukan konversi ke string
            )}
          </>
        )}
      />
    </div>
  )
}

export default DurationInput
