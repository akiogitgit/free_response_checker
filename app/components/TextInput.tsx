import { css } from '@/styled-system/css'
import { ChangeEvent, ComponentProps, FC, HTMLInputTypeAttribute } from 'react'

type Props = {
  label: string
  errorMessage: string
} & Omit<ComponentProps<'input'>, 'type'>

export const TextInput: FC<Props> = ({ label, errorMessage, ...props }) => {
  return (
    <div>
      <label>
        <span
          className={css({
            display: 'block',
          })}
        >
          {label}
        </span>
        <input
          type='text'
          {...props}
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
