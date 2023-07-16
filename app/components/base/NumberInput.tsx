import { css } from '@/styled-system/css'
import { ChangeEvent, ComponentProps, FC, HTMLInputTypeAttribute } from 'react'

type Props = {
  label: string
  errorMessage: string
  onChange: (v: number | string) => void
} & Omit<ComponentProps<'input'>, 'onChange' | 'type'>

export const NumberInput: FC<Props> = ({ label, errorMessage, ...props }) => {
  const { onChange, ...rest } = props
  return (
    <div>
      <label>
        <span
          className={css({
            display: 'block',
            fontSize: 'sm',
          })}
        >
          {label}
        </span>
        <input
          type='number'
          onChange={e => {
            const value = e.target.value
            // valueが""なら""
            if (!value) {
              onChange?.('')
              return
            }
            // numは0以上
            const num = Math.max(Number(value), 0)
            onChange?.(num)
            return
          }}
          {...rest}
          aria-required='true'
          aria-invalid={!!errorMessage}
          className={css({
            outline: '2px solid transparent',
            outlineOffset: '2px',
            px: '2',
            py: '1',
            w: 'full',
            rounded: '8px',
            transitionDuration: '300ms',
            border: '1px solid gray',
            _hover: {
              border: '1px solid black',
            },
            _focus: {
              border: '1px solid black',
            },
          })}
        />
      </label>
      {errorMessage && (
        <p role='alert' className={css({ color: 'red', fontSize: 'sm' })}>
          {errorMessage}
        </p>
      )}
    </div>
  )
}
