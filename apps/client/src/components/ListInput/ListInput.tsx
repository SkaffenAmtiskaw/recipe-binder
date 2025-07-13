import {
  CrossIcon,
  IconButton,
  majorScale,
  Pane,
  PlusIcon,
  TextareaField,
  TextInputField,
} from 'evergreen-ui';
import { useCallback, useEffect } from 'react';

import type { FormEvent, FunctionComponent } from 'react';

import replace from '@utils/replace';

type Props = {
  label: string;
  textarea?: boolean;
  value: string[];
  onChange: (value: string[]) => void;
};

const ListInput: FunctionComponent<Props> = ({
  label,
  textarea,
  value,
  onChange,
}) => {
  useEffect(() => {
    // If the array is empty, initialize the list with an empty text input, so it's not confusing to the user.
    if (!value.length) {
      onChange(['']);
    }
  }, []);

  const handleChange = useCallback(
    (index: number) =>
      (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(replace(value, e.currentTarget.value, index));
      },
    [onChange],
  );

  return (
    <Pane marginBottom={majorScale(2)}>
      {value.map((line, idx) => (
        <Pane
          alignItems="flex-end"
          display="flex"
          key={idx}
          marginBottom={majorScale(1)}
          width="100%"
        >
          {textarea ? (
            <TextareaField
              flex={1}
              label={idx === 0 ? label : ''}
              marginBottom={0}
              value={value[idx]}
              onChange={handleChange(idx)}
            />
          ) : (
            <TextInputField
              flex={1}
              label={idx === 0 ? label : ''}
              marginBottom={0}
              value={value[idx]}
              onChange={handleChange(idx)}
            />
          )}

          <IconButton
            appearance="minimal"
            icon={CrossIcon}
            marginLeft={majorScale(1)}
            onClick={() => {
              onChange([
                ...value.slice(0, idx),
                ...value.slice(idx + 1, value.length),
              ]);
            }}
          />
        </Pane>
      ))}
      <IconButton
        appearance="minimal"
        icon={PlusIcon}
        onClick={() => {
          onChange([...value, '']);
        }}
      />
    </Pane>
  );
};

export default ListInput;
